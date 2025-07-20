"use client";

import Link from "next/link";
import { FaTelegramPlane, FaInstagram, FaGithub } from "react-icons/fa";
import Image from "next/image";
type SubNavItem = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: SubNavItem[] };

const FOOTER_ITEMS: NavItem[] = [
  {
    label: "دانلود",
    children: [
      { label: "افزونه ورد", href: "/download/word" },
      { label: "افزونه کروم", href: "/download/chrome" },
      { label: "کیبورد", href: "/download/keyboard" },
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
      { label: "درباره ما", href: "/about" },
      { label: "بلاگ", href: "/blog" },
      { label: "حریم خصوصی", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer dir="rtl" className="bg-primary-100 text-highlight-800 pt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 px-6 md:px-12 py-7">
        {}
        <div className="md:col-span-1 flex flex-col items-start">
          <div className="flex items-center mb-3">
            <img
              src="https://paknevis.ir/static/web_client/favicon.ico"
              alt="لوگو"
              className="w-10 h-10 ml-2"
            />
            <span className="text-lg font-semibold text-primary-900">
              پاک‌نویس
            </span>
          </div>
          <p className=" leading-6 text-highlight-700 pr-3">
            پاک‌نویس، ویرایشگری هوشمند برای نوشته‌های فارسی شما
          </p>
        </div>

        {}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8 ">
          {FOOTER_ITEMS.map((section) => (
            <div key={section.label}>
              <h4 className="font-semibold text-primary-900 mb-3 border-b border-primary-300 pb-1">
                {section.label}
              </h4>
              <ul className="space-y-2">
                {section.children?.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href || "#"}
                      className="hover:text-primary-700 transition-colors"
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
        <div className="md:col-span-1 flex flex-col items-start">
          <h4 className="font-semibold text-primary-900 mb-3 border-b border-primary-300 pb-1">
            شبکه‌های اجتماعی
          </h4>
          <div className="flex space-x-4 space-x-reverse">
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-800 hover:text-primary-600 transition-colors"
            >
              <FaTelegramPlane size={20} />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-800 hover:text-primary-600 transition-colors"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-800 hover:text-primary-600 transition-colors"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>

      {}
      <div className="border-t border-primary-200 mt-8 py-6 text-sm text-highlight-600 flex flex-col items-center justify-center px-4 text-center">
        <Link
          href="https://www.noorsoft.org/"
          target="_blank"
          className="flex flex-col items-center gap-2 font-bold text-primary-900 hover:text-primary-700 transition-colors group"
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
            className="font-bold text-primary-900 hover:text-primary-700 transition-colors"
          >
            مرکز تحقیقات کامپیوتری علوم اسلامی
          </Link>{" "}
          است و نشر غیرمجاز محتوای آن پیگرد قانونی دارد.
        </p>
      </div>
    </footer>
  );
}
