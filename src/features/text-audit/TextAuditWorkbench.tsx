"use client";

import { useCallback, useDeferredValue, useMemo, useRef, useState } from "react";

import { analyzePersianText } from "@/lib/text-audit";
import type { RuleCategory } from "@/lib/text-audit";

import { TextAuditEditor } from "./TextAuditEditor";
import { TextAuditFilters } from "./TextAuditFilters";
import { TextAuditIssues } from "./TextAuditIssues";
import { TextAuditMetrics } from "./TextAuditMetrics";
import { useAuditShortcut } from "./useAuditShortcut";

const MAX_TEXT_LENGTH = 20_000;
const SAMPLE_TEXT = "اين  متن برای معرفی ابزار ممیزی نوشته شده است،اما فاصله‌ها باید دقیق باشند.";
const ALL_CATEGORIES: RuleCategory[] = [
  "characters",
  "digits",
  "punctuation",
  "spacing",
  "spelling",
  "style",
];

export function TextAuditWorkbench() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [committedText, setCommittedText] = useState(SAMPLE_TEXT);
  const [selectedCategories, setSelectedCategories] = useState<RuleCategory[]>(ALL_CATEGORIES);
  const deferredText = useDeferredValue(committedText);
  const resultsRef = useRef<HTMLDivElement>(null);
  const report = useMemo(
    () => analyzePersianText(deferredText, { categories: selectedCategories }),
    [deferredText, selectedCategories],
  );

  const analyze = useCallback(() => {
    setCommittedText(text);
    requestAnimationFrame(() => resultsRef.current?.focus());
  }, [text]);

  useAuditShortcut(analyze);

  const toggleCategory = useCallback((category: RuleCategory) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)]">
      <div className="space-y-4">
        <TextAuditEditor value={text} maxLength={MAX_TEXT_LENGTH} onChange={setText} onAnalyze={analyze} />
        <TextAuditFilters
          categories={ALL_CATEGORIES}
          selectedCategories={selectedCategories}
          onToggleCategory={toggleCategory}
        />
      </div>
      <div ref={resultsRef} tabIndex={-1} className="space-y-6 outline-none">
        <TextAuditMetrics report={report} />
        <TextAuditIssues issues={report.issues} />
      </div>
    </div>
  );
}
