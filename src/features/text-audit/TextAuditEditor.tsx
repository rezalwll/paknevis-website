"use client";

type TextAuditEditorProps = {
  value: string;
  maxLength: number;
  onChange: (value: string) => void;
  onAnalyze: () => void;
};

export function TextAuditEditor({ value, maxLength, onChange, onAnalyze }: TextAuditEditorProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <label htmlFor="text-audit-input" className="text-base font-bold text-slate-900">
          متن برای بررسی
        </label>
        <span className="text-xs tabular-nums text-slate-500" aria-live="polite">
          {value.length.toLocaleString("fa-IR")} از {maxLength.toLocaleString("fa-IR")} نویسه
        </span>
      </div>
      <textarea
        id="text-audit-input"
        value={value}
        maxLength={maxLength}
        rows={14}
        onChange={(event) => onChange(event.target.value)}
        placeholder="متن فارسی خود را اینجا بنویسید یا بچسبانید…"
        aria-describedby="text-audit-hint"
        className="mt-3 w-full resize-y rounded-2xl border border-slate-300 bg-slate-50 p-4 text-base leading-8 text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
      />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p id="text-audit-hint" className="text-xs leading-6 text-slate-500">
          برای اجرای فوری ممیزی، کلیدهای کنترل و اینتر را بزنید.
        </p>
        <button
          type="button"
          onClick={onAnalyze}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200"
        >
          بررسی متن
        </button>
      </div>
    </div>
  );
}
