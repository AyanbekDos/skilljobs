import advokatPains from "@/data/kz-advokat.json";
import { Pain, Profession, SkillType } from "./types";

const pains = advokatPains as Pain[];

export function getAllSkills(): Pain[] {
  return pains;
}

export function getSkillById(id: string): Pain | undefined {
  return pains.find((p) => p.id === id);
}

export function getSkillsByType(type: SkillType): Pain[] {
  return pains.filter((p) => p.skill_type === type);
}

export function getSkillCollections(): { type: SkillType; skills: Pain[] }[] {
  const order: SkillType[] = ["calculator", "template", "checklist", "reference", "advisor"];
  return order
    .map((type) => ({ type, skills: getSkillsByType(type) }))
    .filter((c) => c.skills.length > 0);
}

export function getProfessions(): Profession[] {
  return [
    { id: "kz-advokat", name: "Адвокат", slug: "advokat", country: "kz", skills_count: pains.length, active: true },
    { id: "kz-bukhgalter", name: "Бухгалтер", slug: "bukhgalter", country: "kz", skills_count: 13, active: false },
    { id: "kz-auditor", name: "Аудитор", slug: "auditor", country: "kz", skills_count: 12, active: false },
    { id: "kz-agronom", name: "Агроном", slug: "agronom", country: "kz", skills_count: 12, active: false },
    { id: "kz-vrach", name: "Врач", slug: "vrach", country: "kz", skills_count: 0, active: false },
    { id: "kz-inzhener", name: "Инженер", slug: "inzhener", country: "kz", skills_count: 0, active: false },
    { id: "kz-uchitel", name: "Учитель", slug: "uchitel", country: "kz", skills_count: 0, active: false },
    { id: "kz-farmatsevt", name: "Фармацевт", slug: "farmatsevt", country: "kz", skills_count: 0, active: false },
    { id: "kz-programmist", name: "Программист", slug: "programmist", country: "kz", skills_count: 0, active: false },
  ];
}
