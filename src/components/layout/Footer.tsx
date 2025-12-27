"use client";

import { useMemo, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTelegramPlane, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { resolveFooterTheme } from "@/config/footerTheme";
type SubNavItem = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: SubNavItem[] };

const FOOTER_ITEMS: NavItem[] = [
  {
    label: "دانلود",
    children: [
      { label: "افزونهٔ وُرد", href: "/download/word" },
      { label: "افزونهٔ مرورگر", href: "/download/chrome" },
      { label: "کیبورد اندروید", href: "/download/keyboard" },
      { label: "ویرایشگر برخط", href: "/editor" },
    ],
  },
  {
    label: "پشتیبانی",
    children: [
      { label: "راهنما", href: "/support/guide" },
      { label: "پرسش‌های متداول", href: "/support/faq" },
      { label: "ارتباط با ما", href: "/support/contact" },
    ],
  },
  {
    label: "سایر",
    children: [
      { label: "دربارۀ ما", href: "/about" },
      { label: "بلاگ", href: "/blog" },
      { label: "حریم خصوصی", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname() || "/";
  const theme = useMemo(() => resolveFooterTheme(pathname), [pathname]);

  const footerStyle = {
    ["--footer-bg" as any]: theme.background,
    ["--footer-text" as any]: theme.text,
    ["--footer-muted" as any]: theme.muted,
    ["--footer-heading" as any]: theme.heading,
    ["--footer-link" as any]: theme.link,
    "--footer-link-hover": theme.linkHover,
    "--footer-border": theme.border,
    "--footer-heading-border": theme.headingBorder,
    "--footer-icon": theme.icon,
    "--footer-icon-hover": theme.iconHover,
  };

  return (
    <footer
      dir="rtl"
      style={footerStyle as React.CSSProperties}
      className="bg-[var(--footer-bg)] text-[var(--footer-text)] pt-10 border-t border-[var(--footer-heading-border)]"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-9 gap-15 px-6 py-7">
        <div className="md:col-span-2 flex flex-col items-start">
          <div className="flex items-center mb-3">
            <img src="/mainlogo.png" alt="لوگو" className="w-10 h-10 ml-2" />
            <span className="text-lg font-semibold text-[var(--footer-heading)]">
              پاک‌نویس
            </span>
          </div>
          <p className="  text-[var(--footer-muted)] ">
           ویرایشگری هوشمند برای نوشته‌های فارسی شما
          </p>
        </div>

        {}
        <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8 ">
          {FOOTER_ITEMS.map((section) => (
            <div key={section.label}>
              <h4 className="font-semibold text-[var(--footer-heading)] mb-3 border-b border-[var(--footer-heading-border)] pb-1">
                {section.label}
              </h4>
              <ul className="space-y-2">
                {section.children?.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href || "#"}
                      className="text-[15px] transition-colors text-[var(--footer-link)] hover:text-[var(--footer-link-hover)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {}
        <div className="md:col-span-2 flex flex-col items-start">
          <h4 className="font-semibold text-[var(--footer-heading)] mb-3 border-b border-[var(--footer-heading-border)] pb-1">
            شبکه‌های اجتماعی
          </h4>
          <div className="flex space-x-4">
            <a
              href="https://t.me/paknevisaan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--footer-icon)] hover:text-[var(--footer-icon-hover)] transition-colors"
            >
              <FaTelegramPlane size={20} />
            </a>
            <a
              href="https://www.instagram.com/paknevis.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--footer-icon)] hover:text-[var(--footer-icon-hover)] transition-colors"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/paknevis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--footer-icon)] hover:text-[var(--footer-icon-hover)] transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {}
      <div className="border-t border-[var(--footer-border)] mt-8 py-6 text-sm text-[var(--footer-muted)] flex flex-col items-center justify-center px-4 text-center">
        <Link
          href="https://www.noorsoft.org/"
          target="_blank"
          className="flex flex-col items-center gap-2 font-bold text-[var(--footer-heading)] hover:text-[var(--footer-link-hover)] transition-colors group"
        >
          <Image
            src="/images/Noor.png"
            alt="مرکز تحقیقات کامپیوتری علوم اسلامی"
            width={82}
            height={75}
            className="mb-4"
          />
        </Link>

        {}
        <p className="leading-6 max-w-3xl">
          حقوق مادی و معنوی اين پايگاه متعلق به{" "}
          <Link
            href="https://www.noorsoft.org/"
            target="_blank"
            className="font-bold text-[var(--footer-heading)] hover:text-[var(--footer-link-hover)] transition-colors"
          >
            مرکز تحقیقات کامپیوتری علوم اسلامی
          </Link>{" "}
          است و نشر غیرمجاز محتوای آن پیگرد قانونی دارد.
        </p>
      </div>
    </footer>
  );
}
