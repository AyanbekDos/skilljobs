import { NextRequest, NextResponse } from "next/server";
import { getSkillById } from "@/lib/skills-data";
import { generateSystemPrompt } from "@/lib/generate-system-prompt";

export const runtime = "edge";

// IP rate limiting: max 30 requests per 10 minutes per IP
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 30;
const ipCounts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    ipCounts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > MAX_REQUESTS) {
    return true;
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Слишком много запросов. Подождите несколько минут." },
        { status: 429 }
      );
    }

    const { messages, skillId } = await req.json();

    if (!messages || !Array.isArray(messages) || !skillId) {
      return NextResponse.json(
        { error: "Missing required fields: messages (array) and skillId (string)" },
        { status: 400 }
      );
    }

    const skill = getSkillById(skillId);
    if (!skill) {
      return NextResponse.json(
        { error: `Skill not found: ${skillId}` },
        { status: 404 }
      );
    }

    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "PERPLEXITY_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const systemPrompt = generateSystemPrompt(skill);

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "sonar-pro",
        stream: true,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Perplexity API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : "Stream error";
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ error: message })}\n\n`)
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
