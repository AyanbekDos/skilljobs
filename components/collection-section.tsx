import {
  type SkillType,
  type Pain,
  COLLECTION_NAMES,
  SKILL_TYPE_ICONS,
} from "@/lib/types";
import { SkillCard } from "./skill-card";

interface CollectionSectionProps {
  type: SkillType;
  skills: Pain[];
  professionSlug: string;
}

export function CollectionSection({
  type,
  skills,
  professionSlug,
}: CollectionSectionProps) {
  if (skills.length === 0) return null;

  const icon = SKILL_TYPE_ICONS[type];
  const name = COLLECTION_NAMES[type];

  return (
    <section className="border-t border-border/50 pt-8">
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">
        <span className="mr-2">{icon}</span>
        {name}
      </h2>

      <div className="stagger-children grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            href={`/kz/${professionSlug}/${skill.id}`}
          />
        ))}
      </div>
    </section>
  );
}
