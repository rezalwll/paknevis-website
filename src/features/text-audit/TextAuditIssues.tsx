import type { TextAuditIssue } from "@/lib/text-audit";

const SEVERITY_STYLES = {
  error: "border-rose-200 bg-rose-50 text-rose-900",
  warning: "border-amber-200 bg-amber-50 text-amber-950",
  info: "border-sky-200 bg-sky-50 text-sky-950",
} as const;

type TextAuditIssuesProps = {
  issues: TextAuditIssue[];
};

export function TextAuditIssues({ issues }: TextAuditIssuesProps) {
  return (
    <section aria-labelledby="text-audit-results-title" aria-live="polite">
      <div className="flex items-center justify-between gap-3">
        <h2 id="text-audit-results-title" className="text-xl font-black text-slate-900">
          پیشنهادهای ویرایشی
        </h2>
        <span className="text-sm text-slate-500">{issues.length.toLocaleString("fa-IR")} مورد</span>
      </div>

      {issues.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-emerald-950">
          در قواعد فعال، موردی برای اصلاح پیدا نشد.
        </p>
      ) : (
        <ol className="mt-4 space-y-3">
          {issues.map((issue) => (
            <li key={issue.id} className={`rounded-2xl border p-4 ${SEVERITY_STYLES[issue.severity]}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="text-sm">{issue.message}</strong>
                <span className="text-xs tabular-nums">
                  خط {issue.line.toLocaleString("fa-IR")}، ستون {issue.column.toLocaleString("fa-IR")}
                </span>
              </div>
              <p className="mt-2 text-sm leading-7">{issue.suggestion}</p>
              <code dir="auto" className="mt-2 inline-block rounded-lg bg-white/70 px-2 py-1 text-xs">
                {issue.matchedText}
              </code>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
