import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  css: {
    postcss: {
      plugins: [],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["e2e/**", "node_modules/**", ".next/**"],
    clearMocks: true,
    css: false,
    coverage: {
      provider: "v8",
      include: [
        "src/app/api/contact/route.ts",
        "src/app/api/analytics/page-view/route.ts",
        "src/features/contact/useContactForm.ts",
        "src/lib/text-audit/**/*.ts",
        "src/app/api/text-audit/route.ts",
      ],
      lines: 70,
      functions: 70,
      statements: 70,
      branches: 60,
    },
  },
});
