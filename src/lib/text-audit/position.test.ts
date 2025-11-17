import { describe, expect, it } from "vitest";

import { locateTextOffset } from "./position";

describe("locateTextOffset", () => {
  it("maps a UTF-16 offset to one-based line and column", () => {
    expect(locateTextOffset("سطر اول\nسطر دوم", 9)).toEqual({ line: 2, column: 2 });
  });

  it("clamps offsets outside the text range", () => {
    expect(locateTextOffset("متن", 99)).toEqual({ line: 1, column: 4 });
  });
});
