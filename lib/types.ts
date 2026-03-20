export type SkillType = "calculator" | "checklist" | "template" | "reference" | "advisor";

export interface SkillInput {
  name: string;
  type: string;
  label: string;
}

export interface SkillOutput {
  name: string;
  label: string;
}

export interface SkillVariable {
  name: string;
  label: string;
}

export interface CalculatorSpec {
  name: string;
  one_liner: string;
  inputs: SkillInput[];
  outputs: SkillOutput[];
  formula_hint: string;
  rates: Record<string, number | string>;
}

export interface ChecklistSpec {
  name: string;
  one_liner: string;
  steps: string[];
  warnings: string[];
  regulatory_refs: string[];
}

export interface TemplateSpec {
  name: string;
  one_liner: string;
  doc_name: string;
  variables: SkillVariable[];
  structure_hint: string;
}

export interface ReferenceSpec {
  name: string;
  one_liner: string;
  data_domain: string;
  lookup_keys: string[];
  data_hints: Record<string, unknown>;
}

export interface AdvisorSpec {
  name: string;
  one_liner: string;
  expertise_area: string;
  decision_criteria: string[];
  context_needed: string[];
}

export type SkillSpec = CalculatorSpec | ChecklistSpec | TemplateSpec | ReferenceSpec | AdvisorSpec;

export interface Pain {
  id: string;
  title: string;
  problem: string;
  who: string;
  frequency: string;
  time_waste_h: number;
  money_risk_kzt: number;
  source: string;
  skill_type: SkillType;
  skill_spec: SkillSpec;
  example_queries: string[];
}

export interface Profession {
  id: string;
  name: string;
  slug: string;
  country: string;
  skills_count: number;
  active: boolean;
}

export const SKILL_TYPE_LABELS: Record<SkillType, string> = {
  calculator: "Калькулятор",
  checklist: "Чеклист",
  template: "Документ",
  reference: "Справочник",
  advisor: "Советник",
};

export const SKILL_TYPE_ICONS: Record<SkillType, string> = {
  calculator: "🧮",
  checklist: "✅",
  template: "📄",
  reference: "📚",
  advisor: "💡",
};

export const COLLECTION_NAMES: Record<SkillType, string> = {
  calculator: "Калькуляторы",
  checklist: "Чеклисты",
  template: "Документы за минуту",
  reference: "Справочники",
  advisor: "AI-советник",
};

export const FREQUENCY_LABELS: Record<string, string> = {
  daily: "ежедневно",
  weekly: "еженедельно",
  monthly: "ежемесячно",
  quarterly: "ежеквартально",
  yearly: "ежегодно",
  event: "по событию",
};
