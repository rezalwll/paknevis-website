import { calculateTextMetrics } from "./metrics";
import { normalizePersianText } from "./normalize";
import { locateTextOffset } from "./position";
import { TEXT_AUDIT_RULES } from "./rules";
import { calculateAuditSummary } from "./score";
import type {
  AnalyzeTextOptions,
  RuleSeverity,
  TextAuditIssue,
  TextAuditReport,
  TextAuditRule,
} from "./types";

const SEVERITY_RANK: Record<RuleSeverity, number> = {
  info: 0,
  warning: 1,
  error: 2,
};

function compileRule(rule: TextAuditRule): RegExp {
  const flags = [...new Set(`${rule.flags}gu`.split(""))].join("");
  return new RegExp(rule.pattern, flags);
}

export function analyzePersianText(text: string, options: AnalyzeTextOptions = {}): TextAuditReport {
  const normalizedText = normalizePersianText(text);
  const minimumSeverity = options.minimumSeverity ?? "info";
  const maxIssues = Math.max(1, Math.min(options.maxIssues ?? 200, 500));
  const enabledCategories = options.categories ? new Set(options.categories) : null;
  const rules = options.rules ?? TEXT_AUDIT_RULES;
  const issues: TextAuditIssue[] = [];

  for (const rule of rules) {
    if (enabledCategories && !enabledCategories.has(rule.category)) continue;
    if (SEVERITY_RANK[rule.severity] < SEVERITY_RANK[minimumSeverity]) continue;

    for (const match of normalizedText.matchAll(compileRule(rule))) {
      if (issues.length >= maxIssues) break;
      const index = match.index ?? 0;
      const location = locateTextOffset(normalizedText, index);

      issues.push({
        id: `${rule.id}:${index}`,
        ruleId: rule.id,
        category: rule.category,
        severity: rule.severity,
        message: rule.message,
        suggestion: rule.suggestion,
        matchedText: match[0],
        index,
        length: match[0].length,
        ...location,
      });
    }

    if (issues.length >= maxIssues) break;
  }

  issues.sort((left, right) => left.index - right.index || left.ruleId.localeCompare(right.ruleId));

  return {
    version: "1.0",
    normalizedText,
    metrics: calculateTextMetrics(normalizedText),
    issues,
    summary: calculateAuditSummary(issues.map((issue) => issue.severity)),
  };
}
