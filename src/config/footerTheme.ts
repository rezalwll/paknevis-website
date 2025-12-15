export type FooterTheme = {
  background: string;
  text: string;
  muted: string;
  heading: string;
  link: string;
  linkHover: string;
  border: string;
  headingBorder: string;
  icon: string;
  iconHover: string;
};

type FooterThemeRule = {
  match: RegExp | ((pathname: string) => boolean);
  theme: Partial<FooterTheme>;
};

const DEFAULT_FOOTER_THEME: FooterTheme = {
  background: "var(--color-primary-100)",
  text: "var(--color-highlight-800)",
  muted: "var(--color-highlight-700)",
  heading: "var(--color-primary-900)",
  link: "var(--color-highlight-800)",
  linkHover: "var(--color-primary-700)",
  border: "var(--color-primary-200)",
  headingBorder: "var(--color-primary-300)",
  icon: "var(--color-primary-800)",
  iconHover: "var(--color-primary-600)",
};

const FOOTER_THEME_RULES: FooterThemeRule[] = [
  {
    match: /^\/support\/contact\/?$/,
    theme: {
      background: "#e7f0ff",
      text: "#1f2937",
      muted: "#4b5563",
      heading: "#0f3d91",
      link: "#1f2937",
      linkHover: "#0f3d91",
      border: "#d7e5ff",
      headingBorder: "#c3d4ff",
      icon: "#0f3d91",
      iconHover: "#0b2f70",
    },
  },
  {
    match: /^\/enterprise(\/|$)/,
    theme: {
      background: "var(--pn-bg, #F9F8F6)",
      text: "#111827",
      muted: "#4B5563",
      heading: "#111827",
      link: "#111827",
      linkHover: "var(--pn-accent, #C9B59C)",
      border: "var(--pn-border, #D9CFC7)",
      headingBorder: "var(--pn-accent, #C9B59C)",
      icon: "#111827",
      iconHover: "var(--pn-accent, #C9B59C)",
    },
  },
  
  {
    match: /^\/downloads/,
    theme: {
      background: "var(--color-primary-50)",
    },
  },
  {
    match: /^\/blog/,
    theme: {
      background: "var(--color-secondary-50)",
      heading: "var(--color-secondary-800)",
      icon: "var(--color-secondary-800)",
    },
  },
];

export const resolveFooterTheme = (pathname: string): FooterTheme => {
  const rule = FOOTER_THEME_RULES.find((item) =>
    typeof item.match === "function"
      ? item.match(pathname)
      : item.match.test(pathname)
  );

  return { ...DEFAULT_FOOTER_THEME, ...rule?.theme };
};

export { DEFAULT_FOOTER_THEME, FOOTER_THEME_RULES };
