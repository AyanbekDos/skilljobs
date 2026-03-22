import type { Metadata } from "next";
import Link from "next/link";
import { getSkillsByProfession, getSkillCollections } from "@/lib/skills-data";
import { CollectionSection } from "@/components/collection-section";

export const metadata: Metadata = {
  title: "Бухгалтер — AI-скиллы | SkillJobs",
  description:
    "AI-скиллы для бухгалтеров Казахстана: калькуляторы налогов, шаблоны документов, чеклисты, справочники ставок",
};

export default function BukhgalterPage() {
  const allSkills = getSkillsByProfession("bukhgalter");
  const collections = getSkillCollections("bukhgalter");

  const stats = [
    { label: "калькуляторов", count: collections.find((c) => c.type === "calculator")?.skills.length ?? 0, icon: "🧮" },
    { label: "документов", count: collections.find((c) => c.type === "template")?.skills.length ?? 0, icon: "📄" },
    { label: "чеклистов", count: collections.find((c) => c.type === "checklist")?.skills.length ?? 0, icon: "✅" },
    { label: "справочник", count: collections.find((c) => c.type === "reference")?.skills.length ?? 0, icon: "📚" },
    { label: "советник", count: collections.find((c) => c.type === "advisor")?.skills.length ?? 0, icon: "💡" },
  ].filter((s) => s.count > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-primary">
          Главная
        </Link>
        <span className="mx-2 text-border">&rarr;</span>
        <span className="font-medium text-foreground">Бухгалтер</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Бухгалтер
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {allSkills.length} AI-инструментов для бухгалтерской практики
        </p>

        {/* Quick stats */}
        <div className="mt-5 flex flex-wrap gap-2">
          {stats.map((stat) => (
            <span
              key={stat.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/50 px-3 py-1 text-xs text-muted-foreground"
            >
              <span>{stat.icon}</span>
              {stat.count} {stat.label}
            </span>
          ))}
        </div>
      </div>

      {/* Collections */}
      <div className="space-y-12">
        {collections.map((collection) => (
          <CollectionSection
            key={collection.type}
            type={collection.type}
            skills={collection.skills}
            professionSlug="bukhgalter"
          />
        ))}
      </div>
    </div>
  );
}
