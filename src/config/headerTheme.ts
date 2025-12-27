export type HeaderTheme = {
  background: string;
  text: string;
  linkHover: string;
  buttonBg: string;
  buttonHoverBg: string;
  buttonText: string;
  mobileBackground: string;
};

type HeaderThemeRule = {
  match: RegExp | ((pathname: string) => boolean);
  theme: Partial<HeaderTheme>;
};

const DEFAULT_HEADER_THEME: HeaderTheme = {
  background: "var(--color-primary-100)",
  text: "var(--color-highlight-700)",
  linkHover: "var(--color-primary-900)",
  buttonBg: "var(--color-primary-400)",
  buttonHoverBg: "var(--color-primary-500)",
  buttonText: "var(--color-highlight-800)",
  mobileBackground: "var(--color-highlight-100)",
};

const HEADER_THEME_RULES: HeaderThemeRule[] = [
  // ✅ HOME: header آبی ملایم با vars (با تغییر CSS همه‌چی عوض میشه)
  {
    match: /^\/$/,
    theme: {
      background: "var(--pn-hf-bg)",
      mobileBackground: "var(--pn-hf-mobile-bg)",
      text: "var(--pn-hf-text)",
      linkHover: "var(--pn-hf-link-hover)",
      buttonBg: "var(--pn-hf-button-bg)",
      buttonHoverBg: "var(--pn-hf-button-hover-bg)",
      buttonText: "var(--pn-hf-button-text)",
    },
  },

  {
    match: /^\/support\/contact\/?$/,
    theme: {
      background: "#e7f0ff",
      mobileBackground: "#f3f6ff",
      text: "#1f2937",
      linkHover: "#0f3d91",
      buttonBg: "#2563eb",
      buttonHoverBg: "#1d4ed8",
      buttonText: "#ffffff",
    },
  },
  {
    match: /^\/downloads/,
    theme: { background: "var(--color-primary-50)" },
  },
  {
    match: /^\/blog/,
    theme: { background: "var(--color-secondary-50)" },
  },
];

export const resolveHeaderTheme = (pathname: string): HeaderTheme => {
  const rule = HEADER_THEME_RULES.find((item) =>
    typeof item.match === "function" ? item.match(pathname) : item.match.test(pathname)
  );

  return { ...DEFAULT_HEADER_THEME, ...rule?.theme };
};

export { DEFAULT_HEADER_THEME, HEADER_THEME_RULES };
