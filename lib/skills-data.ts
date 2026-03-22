import advokatPains from "@/data/kz-advokat.json";
import bukhgalterPains from "@/data/kz-bukhgalter.json";
import { Pain, Profession, SkillType } from "./types";

const allPains = [...(advokatPains as Pain[]), ...(bukhgalterPains as Pain[])];

const painsByProfession: Record<string, Pain[]> = {
  advokat: advokatPains as Pain[],
  bukhgalter: bukhgalterPains as Pain[],
};

export function getAllSkills(): Pain[] {
  return allPains;
}

export function getSkillsByProfession(slug: string): Pain[] {
  return painsByProfession[slug] ?? [];
}

export function getSkillById(id: string): Pain | undefined {
  return allPains.find((p) => p.id === id);
}

export function getSkillsByType(type: SkillType, professionSlug?: string): Pain[] {
  const source = professionSlug ? getSkillsByProfession(professionSlug) : allPains;
  return source.filter((p) => p.skill_type === type);
}

export function getSkillCollections(professionSlug?: string): { type: SkillType; skills: Pain[] }[] {
  const order: SkillType[] = ["calculator", "template", "checklist", "reference", "advisor"];
  return order
    .map((type) => ({ type, skills: getSkillsByType(type, professionSlug) }))
    .filter((c) => c.skills.length > 0);
}

export function getProfessions(): Profession[] {
  return [
    { id: "kz-advokat", name: "Адвокат", slug: "advokat", country: "kz", skills_count: (advokatPains as Pain[]).length, active: true },
    { id: "kz-bukhgalter", name: "Бухгалтер", slug: "bukhgalter", country: "kz", skills_count: (bukhgalterPains as Pain[]).length, active: true },
    { id: "kz-auditor", name: "Аудитор", slug: "auditor", country: "kz", skills_count: 0, active: false },
    { id: "kz-agronom", name: "Агроном", slug: "agronom", country: "kz", skills_count: 0, active: false },
    { id: "kz-vrach", name: "Врач", slug: "vrach", country: "kz", skills_count: 0, active: false },
    { id: "kz-inzhener", name: "Инженер", slug: "inzhener", country: "kz", skills_count: 0, active: false },
    { id: "kz-uchitel", name: "Учитель", slug: "uchitel", country: "kz", skills_count: 0, active: false },
    { id: "kz-farmatsevt", name: "Фармацевт", slug: "farmatsevt", country: "kz", skills_count: 0, active: false },
    { id: "kz-programmist", name: "Программист", slug: "programmist", country: "kz", skills_count: 0, active: false },
  ];
}
