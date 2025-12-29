"use client";

import { useCallback, useDeferredValue, useMemo, useRef, useState } from "react";

import { analyzePersianText } from "@/lib/text-audit";

import { TextAuditEditor } from "./TextAuditEditor";
import { TextAuditIssues } from "./TextAuditIssues";
import { TextAuditMetrics } from "./TextAuditMetrics";
import { useAuditShortcut } from "./useAuditShortcut";

const MAX_TEXT_LENGTH = 20_000;
const SAMPLE_TEXT = "اين  متن برای معرفی ابزار ممیزی نوشته شده است،اما فاصله‌ها باید دقیق باشند.";

export function TextAuditWorkbench() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [committedText, setCommittedText] = useState(SAMPLE_TEXT);
  const deferredText = useDeferredValue(committedText);
  const resultsRef = useRef<HTMLDivElement>(null);
  const report = useMemo(() => analyzePersianText(deferredText), [deferredText]);

  const analyze = useCallback(() => {
    setCommittedText(text);
    requestAnimationFrame(() => resultsRef.current?.focus());
  }, [text]);

  useAuditShortcut(analyze);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)]">
      <TextAuditEditor value={text} maxLength={MAX_TEXT_LENGTH} onChange={setText} onAnalyze={analyze} />
      <div ref={resultsRef} tabIndex={-1} className="space-y-6 outline-none">
        <TextAuditMetrics report={report} />
        <TextAuditIssues issues={report.issues} />
      </div>
    </div>
  );
}
