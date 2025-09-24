"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "ویرایشگر برخط", href: "/editor" },
  {
    label: "دانلود",
    href: "",
    children: [
      { label: "افزونه ورد", href: "/download/word" },
      { label: "افزونه کروم", href: "/download/chrome" },
      { label: "کیبورد", href: "/download/keyboard" },
      { label: "ویرایشگر برخط", href: "/editor" },
    ],
  },
  { label: "نسخه سازمانی", href: "/enterprise" },
  {
    label: "پشتیبانی",
    href: "#",
    children: [
      { label: "راهنما", href: "/support/guide" },
      { label: "پرسش‌های متداول", href: "/support/faq" },
      { label: "ارتباط با ما", href: "/support/contact" },
    ],
  },
  { label: "بلاگ", href: "/blog" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 bg-primary-100/50 text-highlight-700 backdrop-blur-md shadow-sm"
    >
      <nav className="container mx-auto  flex items-center justify-between py-3 px-4 sm:px-6 md:px-0 lg:px-10">
        <button
          onClick={openMenu}
          className="sm:hidden flex items-center px-3 py-2 border rounded text-primary-800 border-primary-800 hover:text-primary-900 hover:border-primary-900 transition-colors cursor-pointer"
          aria-label="باز کردن منو"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {}
        <div className="flex space-x-6">
          <Link
            href="/"
            className="text-xl font-medium text-primary-800 transition-colors"
          >
            <div className="flex items-center">
              <img
                src="/mainlogo.png"
                alt="پاک‌نویس"
                className="w-8 h-8 mr-2"
              />
              پاک‌نویس
            </div>
          </Link>
          {}

          {}
          <ul className="hidden sm:flex items-center md:space-x-6 space-x-3 sm:text-sm md:text-base">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="flex items-center cursor-pointer hover:text-primary-900 transition-colors">
                  <Link href={item.href}>{item.label}</Link>
                  {item.children && (
                    <ChevronDownIcon className="w-4 h-4 mr-1 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </div>
                {item.children && (
                  <ul
                    className={`absolute top-full right-0 bg-white shadow rounded overflow-hidden transform transition-all duration-300 origin-top
                    ${
                      openDropdown === item.label
                        ? "opacity-100 scale-y-100"
                        : "opacity-0 scale-y-0"
                    }
                  `}
                  >
                    {item.children.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href}
                          className="block text-sm px-4 py-2 hover:text-primary-900 whitespace-nowrap"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link
            href="/download"
            target="_blank"
            className="bg-primary-400 text-highlight-800 hover:bg-primary-500 px-4.5 py-1.5 rounded transition-colors"
          >
            دانلود
          </Link>
        </div>
      </nav>
      {}
      <div
        className={`fixed inset-0 bg-highlight-100 shadow-lg z-50 transform transition-transform duration-400 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {}
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="text-xl font-medium text-primary-800 transition-colors"
            onClick={closeMenu}
          >
            <div className="flex items-center">
              <img
                src="https://paknevis.ir/static/web_client/favicon.ico"
                alt="پاک‌نویس"
                className="w-8 h-8 mr-2"
              />
              پاک‌نویس
            </div>
          </Link>
          <button
            onClick={closeMenu}
            aria-label="بستن منو"
            className="text-primary-800 hover:text-primary-900 cursor-pointer transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {}
        <nav className="flex flex-col px-4 py-4 space-y-4">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="border-b border-gray-300 pb-2">
              {item.children ? (
                <>
                  {}
                  <button
                    className="flex items-center w-full cursor-pointer text-right hover:text-primary-900 transition-colors"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`w-4 h-4 transform transition-transform duration-300 ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {}
                  {openDropdown === item.label && (
                    <div className="mt-2 space-y-1 pl-4 text-sm">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={closeMenu}
                          className="block hover:text-primary-900"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="hover:text-primary-900 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
