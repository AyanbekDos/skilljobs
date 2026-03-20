import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSkills, getSkillById } from "@/lib/skills-data";
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
  const skills = getAllSkills();
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
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/kz/advokat"
          className="hover:text-foreground transition-colors"
        >
          Адвокат
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{skill.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
          >
            <span role="img" aria-label={typeLabel}>
              {typeIcon}
            </span>
            {typeLabel}
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {skill.title}
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          {skill.skill_spec.one_liner}
        </p>
      </div>

      {/* Metrics row */}
      <div className="mb-8 flex flex-wrap gap-4">
        {skill.time_waste_h > 0 && (
          <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-card px-4 py-2.5">
            <span className="text-lg">&#9201;</span>
            <div>
              <div className="text-sm font-medium text-card-foreground">
                ~{skill.time_waste_h}ч / {freq}
              </div>
              <div className="text-xs text-muted-foreground">Экономит времени</div>
            </div>
          </div>
        )}
        {skill.money_risk_kzt > 0 && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-2.5">
            <span className="text-lg">&#9888;&#65039;</span>
            <div>
              <div className="text-sm font-medium text-destructive">
                {skill.money_risk_kzt.toLocaleString("ru-KZ")} &#8376;
              </div>
              <div className="text-xs text-muted-foreground">Риск ошибки</div>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5">
          <span className="text-lg">&#128176;</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground line-through">200 &#8376;</span>
              <span className="text-sm font-semibold text-emerald-400">Бесплатно</span>
            </div>
            <div className="text-xs text-muted-foreground">Тестовый период</div>
          </div>
        </div>
      </div>

      {/* Problem description */}
      <div className="mb-8 rounded-xl border border-border/50 bg-card p-5">
        <h2 className="mb-2 text-sm font-semibold text-card-foreground uppercase tracking-wider">
          Проблема
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {skill.problem}
        </p>
      </div>

      {/* Chat widget */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Попробовать скилл
        </h2>
        <SkillChat skill={skill} />
      </div>
    </div>
  );
}
