"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";

import { NAV_ITEMS } from "@/config/navigation";
import { DesktopNav } from "@/components/layout/header/DesktopNav";
import { MobileNav } from "@/components/layout/header/MobileNav";

const headerStyle: CSSProperties = {
  "--header-bg": "var(--pn-hf-bg)",
  "--header-text": "var(--pn-hf-text)",
  "--header-link-hover": "var(--pn-hf-link-hover)",
  "--header-cta-bg": "var(--pn-hf-button-bg)",
  "--header-cta-hover-bg": "var(--pn-hf-button-hover-bg)",
  "--header-cta-text": "var(--pn-hf-button-text)",
  "--header-mobile-bg": "var(--pn-hf-mobile-bg)",
} as CSSProperties;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
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
      style={headerStyle}
      className="sticky top-0 z-50 bg-[var(--header-bg)] text-[var(--header-text)] shadow-sm"
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 md:px-0 lg:px-10">
        <button
          onClick={openMenu}
          className="flex cursor-pointer items-center rounded border border-[var(--header-text)] px-3 py-2 text-[var(--header-text)] transition-colors hover:border-[var(--header-link-hover)] hover:text-[var(--header-link-hover)] sm:hidden"
          aria-label="باز کردن منو"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex space-x-6">
          <Link
            href="/"
            className="text-xl font-medium text-[var(--header-text)] transition-colors hover:text-[var(--header-link-hover)]"
          >
            <span className="flex items-center font-bold">
              <Image src="/mainlogo.png" alt="پاک‌نویس" width={32} height={32} className="mr-2 h-8 w-8" />
              پاک‌نویس
            </span>
          </Link>

          <DesktopNav items={NAV_ITEMS} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
        </div>
      </nav>

      <MobileNav
        isOpen={isOpen}
        items={NAV_ITEMS}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        closeMenu={closeMenu}
      />
    </header>
  );
}



