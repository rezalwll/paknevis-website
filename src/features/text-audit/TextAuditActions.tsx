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

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={copyReport}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-800 transition hover:border-cyan-600 hover:text-cyan-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-100"
      >
        کپی گزارش
      </button>
      <p className="text-xs text-slate-500" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
