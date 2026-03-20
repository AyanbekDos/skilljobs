import Link from "next/link";
import type { Profession } from "@/lib/types";

interface ProfessionCardProps {
  profession: Profession;
}

export function ProfessionCard({ profession }: ProfessionCardProps) {
  const skillLabel = pluralSkills(profession.skills_count);

  /* ── Inactive card ── */
  if (!profession.active) {
    return (
      <div className="relative rounded-2xl border border-border/40 bg-card/30 px-6 py-6 opacity-45 grayscale">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground/60">
            {profession.name}
          </span>
          <span className="rounded-full bg-muted px-3 py-0.5 text-xs font-medium text-muted-foreground">
            Скоро
          </span>
        </div>
        {profession.skills_count > 0 && (
          <p className="mt-2 text-sm text-muted-foreground/60">
            {profession.skills_count} {skillLabel}
          </p>
        )}
      </div>
    );
  }

  /* ── Active card ── */
  return (
    <Link href={`/kz/${profession.slug}`} className="group/card block">
      <div className="glow-card glass relative overflow-hidden rounded-2xl border-l-[3px] border-l-primary px-6 py-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
        {/* Content */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover/card:text-primary">
            {profession.name}
          </span>

          {/* Arrow — slides in from left on hover */}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 opacity-0 transition-all duration-300 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0">
            <svg
              className="h-4 w-4 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          {profession.skills_count} {skillLabel}
        </p>

        {/* Subtle bottom gradient accent on hover */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
      </div>
    </Link>
  );
}

function pluralSkills(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 19) return "инструментов";
  if (mod10 === 1) return "инструмент";
  if (mod10 >= 2 && mod10 <= 4) return "инструмента";
  return "инструментов";
}
