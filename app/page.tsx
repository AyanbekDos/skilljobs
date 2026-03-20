import { getProfessions } from "@/lib/skills-data";
import { ProfessionCard } from "@/components/profession-card";

export default function HomePage() {
  const professions = getProfessions();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Hero */}
      <section className="mb-16 text-center">
        <div className="mb-6 inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
          Бесплатно на тестировании
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          AI-скиллы для профессионалов
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Калькуляторы, документы, чеклисты — всё что нужно в одном чате.{" "}
          <span className="text-foreground font-medium">200&#8376; за скилл.</span>
        </p>
      </section>

      {/* Professions grid */}
      <section>
        <h2 className="mb-6 text-xl font-semibold text-foreground">
          Выберите профессию
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {professions.map((profession) => (
            <ProfessionCard key={profession.id} profession={profession} />
          ))}
        </div>
      </section>
    </div>
  );
}
