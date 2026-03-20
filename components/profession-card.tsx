import Link from "next/link";

import type { Profession } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfessionCardProps {
  profession: Profession;
}

export function ProfessionCard({ profession }: ProfessionCardProps) {
  if (!profession.active) {
    return (
      <Card className="relative opacity-50 grayscale">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{profession.name}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              Скоро
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {profession.skills_count}{" "}
            {pluralSkills(profession.skills_count)}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link href={`/kz/${profession.slug}`} className="group/link block">
      <Card className="h-full transition-all duration-200 hover:ring-2 hover:ring-primary/40 hover:shadow-md">
        <CardHeader>
          <CardTitle className="transition-colors group-hover/link:text-primary">
            {profession.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {profession.skills_count}{" "}
            {pluralSkills(profession.skills_count)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

function pluralSkills(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 19) return "навыков";
  if (mod10 === 1) return "навык";
  if (mod10 >= 2 && mod10 <= 4) return "навыка";
  return "навыков";
}
