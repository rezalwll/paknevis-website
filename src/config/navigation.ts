export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "ویرایشگر برخط",
    href: "#",
    children: [
      { label: "ویرایشگر برخط", href: "https://editor.paknevis.ir" },
      { label: "پیشنهاد علائم نگارشی", href: "https://ai.paknevis.ir" },
    ],
  },
  {
    label: "دانلود",
    href: "",
    children: [
      { label: "افزونه ورد", href: "/downloads/word" },
      { label: "افزونه مرورگر", href: "/downloads/extensions" },
      { label: "کیبورد", href: "/downloads/keyboard" },
    ],
  },
  { label: "نسخه سازمانی", href: "/pricing" },
  { label: "ممیزی متن", href: "/tools/text-audit" },
  {
    label: "پشتیبانی",
    href: "#",
    children: [
      { label: "راهنما", href: "/help" },
      { label: "ارتباط با ما", href: "/contact" },
    ],
  },
  { label: "بلاگ", href: "/blog" },
];

