import { getProfessions } from "@/lib/skills-data";
import { ProfessionCard } from "@/components/profession-card";

export default function HomePage() {
  const professions = getProfessions();

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative bg-mesh py-24 sm:py-32 lg:py-40">
        {/* Subtle top-to-bottom fade overlay for depth */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          {/* Badge */}
          <div className="animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Бесплатный тестовый период
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up font-heading text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl [animation-delay:80ms]">
            AI-инструменты
            <br />
            <span className="text-primary">для профессионалов</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl [animation-delay:160ms]">
            Калькуляторы, генераторы документов, чеклисты и справочники
            &mdash;&nbsp;всё работает прямо в чате за{" "}
            <span className="font-semibold text-gold">200&#8376;</span>
          </p>

          {/* CTA hint */}
          <div className="animate-fade-up mt-10 [animation-delay:240ms]">
            <span className="text-sm text-muted-foreground/70">
              Выберите профессию ниже, чтобы начать
            </span>
            <div className="mx-auto mt-3 flex justify-center">
              <svg
                className="h-5 w-5 animate-float text-primary/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section className="relative z-10 mx-auto -mt-12 max-w-4xl px-6 sm:-mt-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Stat 1 */}
          <div className="glass animate-fade-up rounded-2xl px-6 py-5 text-center">
            <div className="mb-1 flex items-center justify-center gap-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <span className="text-2xl font-bold text-foreground">13+</span>
            </div>
            <p className="text-sm text-muted-foreground">скиллов</p>
          </div>

          {/* Stat 2 */}
          <div className="glass animate-fade-up rounded-2xl px-6 py-5 text-center [animation-delay:80ms]">
            <div className="mb-1 flex items-center justify-center gap-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-9.75 5.25-9.75-5.25 4.179-2.25" />
              </svg>
              <span className="text-2xl font-bold text-foreground">5</span>
            </div>
            <p className="text-sm text-muted-foreground">типов инструментов</p>
          </div>

          {/* Stat 3 */}
          <div className="glass animate-fade-up rounded-2xl px-6 py-5 text-center [animation-delay:160ms]">
            <div className="mb-1 flex items-center justify-center gap-2">
              <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-2xl font-bold text-gold">200&#8376;</span>
            </div>
            <p className="text-sm text-muted-foreground">за скилл</p>
          </div>
        </div>
      </section>

      {/* ── Professions Grid ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-20 sm:pt-24">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Выберите профессию
          </h2>
          <p className="mt-3 text-muted-foreground">
            Каждая профессия содержит набор AI-инструментов, заточенных под ваши задачи
          </p>
        </div>

        <div className="stagger-children grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {professions.map((profession) => (
            <ProfessionCard key={profession.id} profession={profession} />
          ))}
        </div>
      </section>
    </div>
  );
}
