import type { RuleCategory } from "@/lib/text-audit";

const CATEGORY_LABELS: Record<RuleCategory, string> = {
  characters: "نویسه‌ها",
  digits: "اعداد",
  punctuation: "نشانه‌گذاری",
  spacing: "فاصله‌گذاری",
  spelling: "املا",
  style: "سبک نگارش",
};

type TextAuditFiltersProps = {
  categories: RuleCategory[];
  selectedCategories: RuleCategory[];
  onToggleCategory: (category: RuleCategory) => void;
};

export function TextAuditFilters({
  categories,
  selectedCategories,
  onToggleCategory,
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
    </fieldset>
  );
}
