"use client";

import { useState } from "react";

import type { TextAuditReport } from "@/lib/text-audit";

export function formatTextAuditReport(report: TextAuditReport): string {
  const header = [
    `امتیاز نگارش: ${report.summary.score.toLocaleString("fa-IR")}`,
    `تعداد پیشنهادها: ${report.summary.total.toLocaleString("fa-IR")}`,
    `تعداد واژه‌ها: ${report.metrics.words.toLocaleString("fa-IR")}`,
  ];
  const findings = report.issues.map(
    (issue, index) =>
      `${(index + 1).toLocaleString("fa-IR")}. خط ${issue.line.toLocaleString("fa-IR")}: ${issue.message} — ${issue.suggestion}`,
  );

  return [...header, "", ...findings].join("\n").trim();
}

type TextAuditActionsProps = {
  report: TextAuditReport;
};

export function TextAuditActions({ report }: TextAuditActionsProps) {
  const [status, setStatus] = useState("");

  const copyReport = async () => {
    try {
      await navigator.clipboard.writeText(formatTextAuditReport(report));
      setStatus("گزارش در حافظهٔ موقت کپی شد.");
    } catch {
      setStatus("مرورگر اجازهٔ کپی‌کردن گزارش را نداد.");
    }
  };

  const exportReport = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `paknevis-text-audit-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("نسخهٔ JSON گزارش آماده شد.");
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={copyReport}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-800 transition hover:border-cyan-600 hover:text-cyan-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-100"
      >
        کپی گزارش
      </button>
      <button
        type="button"
        onClick={exportReport}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-800 transition hover:border-cyan-600 hover:text-cyan-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-100"
      >
        دریافت JSON
      </button>
      <p className="text-xs text-slate-500" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
