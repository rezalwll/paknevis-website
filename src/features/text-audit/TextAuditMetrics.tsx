import type { TextAuditReport } from "@/lib/text-audit";

type TextAuditMetricsProps = {
  report: TextAuditReport;
};

export function TextAuditMetrics({ report }: TextAuditMetricsProps) {
  const cards = [
    { label: "امتیاز نگارش", value: report.summary.score },
    { label: "پیشنهادها", value: report.summary.total },
    { label: "واژه‌ها", value: report.metrics.words },
    { label: "زمان مطالعه", value: report.metrics.readingMinutes, suffix: " دقیقه" },
  ];

  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="خلاصهٔ ممیزی">
      {cards.map((card) => (
        <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <dt className="text-xs font-medium text-slate-500">{card.label}</dt>
          <dd className="mt-2 text-2xl font-black tabular-nums text-slate-900">
            {card.value.toLocaleString("fa-IR")}
            {card.suffix ? <span className="text-xs font-medium text-slate-500">{card.suffix}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
