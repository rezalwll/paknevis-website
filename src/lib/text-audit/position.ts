export function locateTextOffset(text: string, index: number): { line: number; column: number } {
  const safeIndex = Math.max(0, Math.min(index, text.length));
  const before = text.slice(0, safeIndex);
  const lines = before.split("\n");

  return {
    line: lines.length,
    column: (lines.at(-1)?.length ?? 0) + 1,
  };
}
