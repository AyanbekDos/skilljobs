import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSkillsByProfession, getSkillById } from "@/lib/skills-data";
import {
  SKILL_TYPE_LABELS,
  SKILL_TYPE_ICONS,
  FREQUENCY_LABELS,
} from "@/lib/types";
import { SkillChat } from "@/components/skill-chat";

interface SkillPageProps {
  params: Promise<{ skillId: string }>;
}

export async function generateStaticParams() {
  const skills = getSkillsByProfession("bukhgalter");
  return skills.map((skill) => ({ skillId: skill.id }));
}

export async function generateMetadata({
  params,
}: SkillPageProps): Promise<Metadata> {
  const { skillId } = await params;
  const skill = getSkillById(skillId);
  if (!skill) {
    return { title: "Скилл не найден | SkillJobs" };
  }
  return {
    title: `${skill.skill_spec.one_liner} | SkillJobs`,
    description: skill.problem,
  };
}

export default async function SkillPage({ params }: SkillPageProps) {
  const { skillId } = await params;
  const skill = getSkillById(skillId);

  if (!skill) {
    notFound();
  }

  const typeLabel = SKILL_TYPE_LABELS[skill.skill_type];
  const typeIcon = SKILL_TYPE_ICONS[skill.skill_type];
  const freq = FREQUENCY_LABELS[skill.frequency] || skill.frequency;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="animate-fade-in mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/"
          className="transition-colors hover:text-foreground"
        >
          Главная
        </Link>
        <span className="text-border">/</span>
        <Link
          href="/kz/bukhgalter"
          className="transition-colors hover:text-foreground"
        >
          Бухгалтер
        </Link>
        <span className="text-border">/</span>
        <span className="truncate text-foreground">{skill.title}</span>
      </nav>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* LEFT COLUMN - Info */}
        <div className="lg:col-span-3">
          {/* Type Badge */}
          <div className="animate-fade-up mb-4">
            <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-foreground">
              <span role="img" aria-label={typeLabel}>
                {typeIcon}
              </span>
              {typeLabel}
            </span>
          </div>

          {/* Title */}
          <div className="animate-fade-up [animation-delay:80ms]">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {skill.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
              {skill.skill_spec.one_liner}
            </p>
          </div>

          {/* Metrics cards */}
          <div className="animate-fade-up mt-8 flex flex-wrap gap-3 [animation-delay:160ms]">
            {skill.time_waste_h > 0 && (
              <div className="glow-card glass flex items-center gap-3 rounded-xl px-5 py-4">
                <span className="text-2xl">&#9201;</span>
                <div>
                  <div className="text-base font-semibold text-foreground">
                    ~{skill.time_waste_h}ч / {freq}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Экономит времени
                  </div>
                </div>
              </div>
            )}

            {skill.money_risk_kzt > 0 && (
              <div className="glow-card flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-5 py-4">
                <span className="text-2xl">&#9888;&#65039;</span>
                <div>
                  <div className="text-base font-semibold text-destructive">
                    {skill.money_risk_kzt.toLocaleString("ru-KZ")} &#8376;
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Риск при ошибке
                  </div>
                </div>
              </div>
            )}

            <div className="glow-card flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4">
              <span className="text-2xl">&#9889;</span>
              <div>
                <span className="text-base font-bold text-emerald-400">
                  Бесплатно
                </span>
                <div className="text-xs text-muted-foreground">
                  Используйте без ограничений
                </div>
              </div>
            </div>
          </div>

          {/* Problem section */}
          <div className="animate-fade-up mt-10 [animation-delay:240ms]">
            <h2 className="font-heading mb-3 text-xl font-semibold text-foreground sm:text-2xl">
              Какую проблему решает
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {skill.problem}
            </p>
          </div>

          {/* Who needs it */}
          <div className="animate-fade-up mt-8 [animation-delay:320ms]">
            <h2 className="font-heading mb-3 text-xl font-semibold text-foreground sm:text-2xl">
              Кому нужен
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {skill.who}
            </p>
          </div>

          {/* Example queries */}
          {skill.example_queries.length > 0 && (
            <div className="animate-fade-up mt-8 [animation-delay:400ms]">
              <h2 className="font-heading mb-4 text-xl font-semibold text-foreground sm:text-2xl">
                Примеры запросов
              </h2>
              <div className="flex flex-wrap gap-2">
                {skill.example_queries.map((query, index) => (
                  <span
                    key={index}
                    className="glass inline-block rounded-full px-4 py-2 text-sm text-foreground transition-all hover:scale-[1.02] hover:border-primary/30"
                  >
                    {query}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN - Chat */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-20">
            <SkillChat skill={skill} />
          </div>
        </div>
      </div>
    </div>
  );
}
