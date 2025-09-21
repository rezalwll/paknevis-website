export const RULE_CATEGORIES = [
  "characters",
  "digits",
  "punctuation",
  "spacing",
  "spelling",
  "style",
] as const;

export const RULE_SEVERITIES = ["info", "warning", "error"] as const;

export type RuleCategory = (typeof RULE_CATEGORIES)[number];
export type RuleSeverity = (typeof RULE_SEVERITIES)[number];

export type TextAuditRule = {
  id: string;
  title: string;
  category: RuleCategory;
  severity: RuleSeverity;
  pattern: string;
  flags: string;
  message: string;
  suggestion: string;
  example: string;
  replacement?: string;
};

export type TextAuditIssue = {
  id: string;
  ruleId: string;
  category: RuleCategory;
  severity: RuleSeverity;
  message: string;
  suggestion: string;
  matchedText: string;
  index: number;
  length: number;
  line: number;
  column: number;
};

export type TextAuditMetrics = {
  characters: number;
  charactersWithoutSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingMinutes: number;
};

export type TextAuditSummary = {
  total: number;
  errors: number;
  warnings: number;
  info: number;
  score: number;
};

export type TextAuditReport = {
  version: "1.0";
  normalizedText: string;
  metrics: TextAuditMetrics;
  issues: TextAuditIssue[];
  summary: TextAuditSummary;
};

export type AnalyzeTextOptions = {
  categories?: RuleCategory[];
  minimumSeverity?: RuleSeverity;
  maxIssues?: number;
  rules?: TextAuditRule[];
};
