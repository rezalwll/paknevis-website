import type { RuleSeverity, TextAuditSummary } from "./types";

const WEIGHTS: Record<RuleSeverity, number> = {
  error: 8,
  warning: 4,
  info: 1,
};

export function calculateAuditSummary(severities: RuleSeverity[]): TextAuditSummary {
  const errors = severities.filter((severity) => severity === "error").length;
  const warnings = severities.filter((severity) => severity === "warning").length;
  const info = severities.filter((severity) => severity === "info").length;
  const penalty = severities.reduce((total, severity) => total + WEIGHTS[severity], 0);

  return {
    total: severities.length,
    errors,
    warnings,
    info,
    score: Math.max(0, 100 - penalty),
  };
}
