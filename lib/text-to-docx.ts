import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Packer,
} from "docx";

/**
 * Convert plain/markdown text from AI response to a DOCX blob.
 * Handles: headings (#, ##, ###), bold (**text**), italic (*text*),
 * bullet lists (- item), numbered lists (1. item), and paragraphs.
 */
export async function textToDocx(
  text: string,
  title: string
): Promise<Blob> {
  const lines = text.split("\n");
  const paragraphs: Paragraph[] = [];

  // Title
  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: 32,
          font: "Times New Roman",
        }),
      ],
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    })
  );

  // Separator line
  paragraphs.push(
    new Paragraph({
      spacing: { after: 200 },
    })
  );

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines - add spacing
    if (!trimmed) {
      paragraphs.push(new Paragraph({ spacing: { after: 100 } }));
      continue;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      paragraphs.push(
        new Paragraph({
          children: parseInlineFormatting(trimmed.slice(4)),
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
        })
      );
      continue;
    }
    if (trimmed.startsWith("## ")) {
      paragraphs.push(
        new Paragraph({
          children: parseInlineFormatting(trimmed.slice(3)),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
        })
      );
      continue;
    }
    if (trimmed.startsWith("# ")) {
      paragraphs.push(
        new Paragraph({
          children: parseInlineFormatting(trimmed.slice(2)),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 },
        })
      );
      continue;
    }

    // Bullet lists
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      paragraphs.push(
        new Paragraph({
          children: parseInlineFormatting(trimmed.slice(2)),
          bullet: { level: 0 },
          spacing: { after: 60 },
        })
      );
      continue;
    }

    // Numbered lists
    const numberedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (numberedMatch) {
      paragraphs.push(
        new Paragraph({
          children: parseInlineFormatting(numberedMatch[1]),
          numbering: { reference: "default-numbering", level: 0 },
          spacing: { after: 60 },
        })
      );
      continue;
    }

    // Regular paragraph
    paragraphs.push(
      new Paragraph({
        children: parseInlineFormatting(trimmed),
        spacing: { after: 120 },
      })
    );
  }

  const doc = new Document({
    numbering: {
      config: [
        {
          reference: "default-numbering",
          levels: [
            {
              level: 0,
              format: "decimal" as const,
              text: "%1.",
              alignment: AlignmentType.START,
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: paragraphs,
      },
    ],
  });

  return await Packer.toBlob(doc);
}

/**
 * Parse inline markdown: **bold**, *italic*, `code`
 */
function parseInlineFormatting(text: string): TextRun[] {
  const runs: TextRun[] = [];
  // Match **bold**, *italic*, `code`, or plain text
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|([^*`]+))/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match[2]) {
      // Bold
      runs.push(
        new TextRun({
          text: match[2],
          bold: true,
          font: "Times New Roman",
          size: 24,
        })
      );
    } else if (match[3]) {
      // Italic
      runs.push(
        new TextRun({
          text: match[3],
          italics: true,
          font: "Times New Roman",
          size: 24,
        })
      );
    } else if (match[4]) {
      // Code
      runs.push(
        new TextRun({
          text: match[4],
          font: "Courier New",
          size: 22,
        })
      );
    } else if (match[5]) {
      // Plain text
      runs.push(
        new TextRun({
          text: match[5],
          font: "Times New Roman",
          size: 24,
        })
      );
    }
  }

  return runs.length > 0
    ? runs
    : [new TextRun({ text, font: "Times New Roman", size: 24 })];
}
