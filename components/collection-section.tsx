import { type SkillType, type Pain, COLLECTION_NAMES } from "@/lib/types";
import { SkillCard } from "@/components/skill-card";

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

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">
        {COLLECTION_NAMES[type]}
      </h2>

      <div className="relative -mx-4 px-4">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
          {skills.map((skill) => (
            <div key={skill.id} className="w-72 shrink-0">
              <SkillCard
                skill={skill}
                href={`/kz/${professionSlug}/${skill.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
