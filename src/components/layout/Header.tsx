"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "خانه", href: "/" },
  { label: "درباره ما", href: "/about" },
  { label: "بلاگ", href: "/blog" },
  { label: "تماس با ما", href: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // باز و بسته کردن منو
  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  // وقتی از موبایل به دسکتاپ می‌رویم، منو را ببند
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
    <header className="bg-highlight-100 text-highlight-700 shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4 sm:px-6 md:px-0 lg:px-20">
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
        {/* لوگو */}
        <div className="flex space-x-6">
          <Link
            href="/"
            className="text-xl font-medium text-primary-800 transition-colors"
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
          {/* دکمه همبرگر (موبایل) */}

          {/* منوی دسکتاپ */}
          <div className="hidden sm:flex items-center space-x-4">
            {NAV_ITEMS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-primary-900 transition-colors "
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Link
            href="/download"
            target="_blank"
            className="bg-secondary-400 text-white px-4 py-1 rounded hover:bg-secondary-600 transition-colors"
          >
            دانلود
          </Link>
        </div>
      </nav>

      {/* منوی موبایل (Slide-in از چپ) */}
      <div
        className={`fixed inset-0 bg-highlight-100  shadow-lg z-50 transform transition-transform duration-400 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center  justify-between px-4 py-3">
          <Link
            href="/"
            className="text-xl font-medium text-primary-800 transition-colors"
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

        <nav className="flex flex-col px-4 py-4 space-y-4">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="hover:text-primary-900 transition-colors border-b border-gray-300"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
