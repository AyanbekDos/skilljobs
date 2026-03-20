import Link from "next/link";

import {
  type Pain,
  SKILL_TYPE_LABELS,
  SKILL_TYPE_ICONS,
  FREQUENCY_LABELS,
} from "@/lib/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
    <Link href={href} className="group/link block">
      <Card className="h-full transition-all duration-200 hover:ring-2 hover:ring-primary/40 hover:shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <span className="mr-0.5">{typeIcon}</span>
              {typeLabel}
            </Badge>
          </div>
          <CardTitle className="mt-1 line-clamp-2">
            <h3>{skill.title}</h3>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1">
          <CardDescription className="line-clamp-2">
            {skill.skill_spec.one_liner}
          </CardDescription>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {frequencyLabel}
          </Badge>
          <span className="text-xs font-medium text-primary transition-colors group-hover/link:underline">
            Попробовать &rarr;
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
