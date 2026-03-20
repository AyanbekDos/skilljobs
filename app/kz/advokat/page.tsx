import type { Metadata } from "next";
import Link from "next/link";
import { getAllSkills, getSkillCollections } from "@/lib/skills-data";
import { CollectionSection } from "@/components/collection-section";

export const metadata: Metadata = {
  title: "Адвокат — AI-скиллы | SkillJobs",
  description:
    "AI-скиллы для адвокатов Казахстана: калькуляторы, шаблоны документов, чеклисты, справочники",
};

export default function AdvokatPage() {
  const allSkills = getAllSkills();
  const collections = getSkillCollections();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Адвокат</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Адвокат — {allSkills.length} AI-скиллов
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
          Калькуляторы госпошлин и неустоек, генераторы исков и жалоб, чеклисты
          для судебных заседаний, справочники процессуальных сроков и штрафов.
        </p>
      </div>

      {/* Collections */}
      <div className="space-y-10">
        {collections.map((collection) => (
          <CollectionSection
            key={collection.type}
            type={collection.type}
            skills={collection.skills}
            professionSlug="advokat"
          />
        ))}
      </div>
    </div>
  );
}
