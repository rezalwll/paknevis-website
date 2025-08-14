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
  "--header-mobile-bg": "rgba(120, 185, 181, 0.18)",
} as CSSProperties;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [desktopOpenDropdown, setDesktopOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);

  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setMobileOpenDropdown(null);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) {
        closeMenu();
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [closeMenu]);

  return (
    <header
      dir="rtl"
      style={headerStyle}
      className="sticky top-0 z-50 bg-[var(--header-bg)] text-[var(--header-text)] shadow-sm"
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 md:px-0 lg:px-10">
        <button
          type="button"
          onClick={openMenu}
          aria-label="باز کردن منو"
          aria-expanded={isOpen}
          aria-controls="mobile-drawer"
          className="flex cursor-pointer items-center rounded border border-[var(--header-text)] px-3 py-2 text-[var(--header-text)] transition-colors hover:border-[var(--header-link-hover)] hover:text-[var(--header-link-hover)] sm:hidden"
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

          <DesktopNav
            items={NAV_ITEMS}
            openDropdown={desktopOpenDropdown}
            setOpenDropdown={setDesktopOpenDropdown}
          />
        </div>
      </nav>

      <MobileNav
        isOpen={isOpen}
        items={NAV_ITEMS}
        openDropdown={mobileOpenDropdown}
        setOpenDropdown={setMobileOpenDropdown}
        closeMenu={closeMenu}
      />
    </header>
  );
}
