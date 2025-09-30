import catalog from "@/content/text-audit-rules.json";

import type { TextAuditRule } from "./types";

export const TEXT_AUDIT_RULES = catalog.rules as TextAuditRule[];
