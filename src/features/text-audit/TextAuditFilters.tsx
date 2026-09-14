import type { RuleCategory, RuleSeverity } from "@/lib/text-audit";

const CATEGORY_LABELS: Record<RuleCategory, string> = {
  characters: "نویسه‌ها",
  digits: "اعداد",
  punctuation: "نشانه‌گذاری",
  spacing: "فاصله‌گذاری",
  spelling: "املا",
  style: "سبک نگارش",
};

const SEVERITY_LABELS: Record<RuleSeverity, string> = {
  info: "همهٔ پیشنهادها",
  warning: "هشدار و خطا",
  error: "فقط خطا",
};

type TextAuditFiltersProps = {
  categories: RuleCategory[];
  selectedCategories: RuleCategory[];
  minimumSeverity: RuleSeverity;
  onToggleCategory: (category: RuleCategory) => void;
  onMinimumSeverityChange: (severity: RuleSeverity) => void;
};

export function TextAuditFilters({
  categories,
  selectedCategories,
  minimumSeverity,
  onToggleCategory,
  onMinimumSeverityChange,
}: TextAuditFiltersProps) {
  return (
    <fieldset className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <legend className="px-2 text-sm font-bold text-slate-900">دسته‌های فعال</legend>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const checked = selectedCategories.includes(category);

          return (
            <label
              key={category}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition has-[:checked]:border-cyan-600 has-[:checked]:bg-cyan-50 has-[:checked]:text-cyan-950"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleCategory(category)}
                className="h-4 w-4 accent-cyan-700"
              />
              {CATEGORY_LABELS[category]}
            </label>
          );
        })}
      </div>
      <label className="mt-5 flex max-w-xs flex-col gap-2 text-xs font-bold text-slate-700">
        حداقل شدت پیشنهاد
        <select
          value={minimumSeverity}
          onChange={(event) => onMinimumSeverityChange(event.target.value as RuleSeverity)}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
        >
          {(Object.keys(SEVERITY_LABELS) as RuleSeverity[]).map((severity) => (
            <option key={severity} value={severity}>
              {SEVERITY_LABELS[severity]}
            </option>
          ))}
        </select>
      </label>
    </fieldset>
  );
}
