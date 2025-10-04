import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const catalogUrl = new URL("../src/content/text-audit-rules.json", import.meta.url);
const catalog = JSON.parse(await readFile(fileURLToPath(catalogUrl), "utf8"));
const categories = new Set(["characters", "digits", "punctuation", "spacing", "spelling", "style"]);
const severities = new Set(["info", "warning", "error"]);
const ids = new Set();

if (catalog.version !== 1 || !Array.isArray(catalog.rules)) {
  throw new Error("Text-audit catalog must use schema version 1 with a rules array.");
}

for (const [index, rule] of catalog.rules.entries()) {
  const label = `rules[${index}]`;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(rule.id)) {
    throw new Error(`${label}.id must be a kebab-case identifier.`);
  }
  if (ids.has(rule.id)) {
    throw new Error(`${label}.id duplicates ${rule.id}.`);
  }
  ids.add(rule.id);

  if (!categories.has(rule.category) || !severities.has(rule.severity)) {
    throw new Error(`${label} has an unsupported category or severity.`);
  }

  for (const key of ["title", "pattern", "flags", "message", "suggestion", "example"]) {
    if (typeof rule[key] !== "string" || rule[key].trim().length === 0) {
      throw new Error(`${label}.${key} must be a non-empty string.`);
    }
  }

  const flags = [...new Set(`${rule.flags}gu`.split(""))].join("");
  const expression = new RegExp(rule.pattern, flags);
  if (!expression.test(rule.example)) {
    throw new Error(`${label} does not match its documented example.`);
  }
}

console.log(`Validated ${catalog.rules.length} text-audit rules.`);
