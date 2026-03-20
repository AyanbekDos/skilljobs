import Link from "next/link";

import {
  type Pain,
  SKILL_TYPE_LABELS,
  SKILL_TYPE_ICONS,
  FREQUENCY_LABELS,
} from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface SkillCardProps {
  skill: Pain;
  href: string;
}

export function SkillCard({ skill, href }: SkillCardProps) {
  const typeLabel = SKILL_TYPE_LABELS[skill.skill_type];
  const typeIcon = SKILL_TYPE_ICONS[skill.skill_type];
  const frequencyLabel = FREQUENCY_LABELS[skill.frequency] ?? skill.frequency;

  return (
    <Link href={href} className="group/card block">
      <div
        className="glow-card flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5"
      >
        {/* Type badge */}
        <Badge variant="secondary" className="mb-3 w-fit text-[11px] text-muted-foreground">
          <span className="mr-0.5">{typeIcon}</span>
          {typeLabel}
        </Badge>

        {/* Title */}
        <h3 className="mb-1.5 line-clamp-2 text-base font-medium leading-snug text-foreground">
          {skill.title}
        </h3>

        {/* One-liner */}
        <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {skill.skill_spec.one_liner}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="text-[11px] text-muted-foreground">
            {frequencyLabel}
          </Badge>
          <span className="text-xs font-medium text-primary transition-colors group-hover/card:text-gold">
            Попробовать &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
