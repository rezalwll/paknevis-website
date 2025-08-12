import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src");
const EXTENSIONS = new Set([".ts", ".tsx", ".md"]);
const BAD_PATTERN = /[ØÙÛ]|â€|ï»¿/;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, out);
      continue;
    }
    out.push(full);
  }
  return out;
}

const files = walk(ROOT).filter((file) => EXTENSIONS.has(path.extname(file)));
const badFiles = [];

for (const file of files) {
  const content = readFileSync(file, "utf8");
  if (BAD_PATTERN.test(content)) {
    badFiles.push(file);
  }
}

if (badFiles.length > 0) {
  console.error("Detected potential mojibake content:");
  for (const file of badFiles) {
    console.error(`- ${path.relative(process.cwd(), file)}`);
  }
  process.exit(1);
}

console.log("Encoding check passed.");
