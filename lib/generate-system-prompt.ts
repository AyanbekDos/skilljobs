import { Pain, SkillType } from "./types";

export function generateSystemPrompt(skill: Pain): string {
  const spec = skill.skill_spec;
  const base = `Ты — AI-ассистент для профессионалов в Казахстане (2026 год). МРП 2026 = 4 228 тенге.\n\n`;

  switch (skill.skill_type) {
    case "calculator":
      return base + generateCalculatorPrompt(spec as never);
    case "checklist":
      return base + generateChecklistPrompt(spec as never);
    case "template":
      return base + generateTemplatePrompt(spec as never);
    case "reference":
      return base + generateReferencePrompt(spec as never);
    case "advisor":
      return base + generateAdvisorPrompt(spec as never);
    default:
      return base + `Ты — ${spec.name}. ${spec.one_liner}. Отвечай на русском языке.`;
  }
}

function generateCalculatorPrompt(spec: {
  name: string;
  one_liner: string;
  inputs: { name: string; label: string }[];
  outputs: { name: string; label: string }[];
  formula_hint: string;
  rates: Record<string, number | string>;
}): string {
  const inputList = spec.inputs.map((i) => `- ${i.label}`).join("\n");
  const outputList = spec.outputs.map((o) => `- ${o.label}`).join("\n");
  const ratesStr = Object.entries(spec.rates)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ");

  return `## ${spec.name}
${spec.one_liner}

### Твоя задача
Ты — калькулятор. Пользователь даёт исходные данные, ты выполняешь расчёт и выдаёшь результат.

### Входные данные (запроси у пользователя если не указаны):
${inputList}

### Что рассчитать:
${outputList}

### Формулы и правила:
${spec.formula_hint}

### Актуальные ставки:
${ratesStr}

### Формат ответа:
1. Покажи исходные данные
2. Покажи пошаговый расчёт с формулами
3. Покажи итоговый результат крупно
4. Укажи правовое основание (статью закона)

Отвечай на русском. Если данных не хватает — вежливо запроси. Числа форматируй с разделителем тысяч (пробел).`;
}

function generateChecklistPrompt(spec: {
  name: string;
  one_liner: string;
  steps: string[];
  warnings: string[];
  regulatory_refs: string[];
}): string {
  const steps = spec.steps.map((s, i) => `${i + 1}. ${s}`).join("\n");
  const warnings = spec.warnings.map((w) => `⚠️ ${w}`).join("\n");
  const refs = spec.regulatory_refs.join(", ");

  return `## ${spec.name}
${spec.one_liner}

### Твоя задача
Ты — ассистент по чеклистам. Проведи пользователя по шагам, отмечая выполненные.

### Шаги:
${steps}

### Предупреждения:
${warnings}

### Нормативная база: ${refs}

### Формат работы:
- Представь все шаги списком
- Спроси пользователя какой шаг выполнен
- Давай подробные пояснения к каждому шагу по запросу
- Предупреждай о рисках и дедлайнах

Отвечай на русском.`;
}

function generateTemplatePrompt(spec: {
  name: string;
  one_liner: string;
  doc_name: string;
  variables: { name: string; label: string }[];
  structure_hint: string;
}): string {
  const vars = spec.variables.map((v) => `- ${v.label}`).join("\n");

  return `## ${spec.name}
${spec.one_liner}

### Твоя задача
Ты — генератор документа "${spec.doc_name}". Собери данные у пользователя и сгенерируй готовый документ.

### Необходимые данные (запроси если не указаны):
${vars}

### Структура документа:
${spec.structure_hint}

### Правила:
- Генерируй документ в формате, готовом для копирования
- Используй актуальные ссылки на законы РК
- Форматируй как официальный документ (шапка, абзацы, подпись)
- Если данных не хватает — запроси конкретно что нужно
- После генерации спроси нужны ли правки

Отвечай на русском.`;
}

function generateReferencePrompt(spec: {
  name: string;
  one_liner: string;
  data_domain: string;
  lookup_keys: string[];
  data_hints: Record<string, unknown>;
}): string {
  const keys = spec.lookup_keys.join(", ");
  const hints = JSON.stringify(spec.data_hints, null, 2);

  return `## ${spec.name}
${spec.one_liner}

### Твоя задача
Ты — справочник по теме: ${spec.data_domain}

### Поиск по ключам: ${keys}

### Данные и источники:
${hints}

### Правила:
- Давай точные ответы со ссылками на конкретные статьи законов
- Пересчитывай МРП в тенге (1 МРП = 4 228 тг в 2026)
- Если не уверен в точности — скажи об этом и рекомендуй проверить первоисточник
- Формат: краткий ответ + развёрнутое пояснение + правовое основание

Отвечай на русском.`;
}

function generateAdvisorPrompt(spec: {
  name: string;
  one_liner: string;
  expertise_area: string;
  decision_criteria: string[];
  context_needed: string[];
}): string {
  const criteria = spec.decision_criteria.map((c) => `- ${c}`).join("\n");

  return `## ${spec.name}
${spec.one_liner}

### Твоя экспертная область: ${spec.expertise_area}

### Критерии для анализа ситуации:
${criteria}

### Правила:
- Анализируй ситуацию с разных сторон
- Давай конкретные рекомендации с обоснованием
- Ссылайся на законы РК и практику
- Предупреждай о рисках
- Если ситуация требует очной консультации юриста — скажи об этом
- НЕ давай финальных юридических заключений, ты — советник, не суд

Отвечай на русском.`;
}
