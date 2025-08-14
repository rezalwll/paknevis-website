import Link from "next/link";
import Image from "next/image";

import type { NavItem } from "@/config/navigation";
import { cn } from "@/lib/cn";

type MobileNavProps = {
  isOpen: boolean;
  items: NavItem[];
  openDropdown: string | null;
  setOpenDropdown: (value: string | null) => void;
  closeMenu: () => void;
};

export function MobileNav({ isOpen, items, openDropdown, setOpenDropdown, closeMenu }: MobileNavProps) {
  return (
    <div
      id="mobile-drawer"
      dir="rtl"
      aria-hidden={!isOpen}
      className={cn("fixed inset-0 z-50 sm:hidden", isOpen ? "pointer-events-auto" : "pointer-events-none")}
    >
      <button
        type="button"
        aria-label="بستن منو"
        onClick={closeMenu}
        className={cn(
          "absolute inset-0 h-full w-full bg-slate-900/5 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed right-0 top-0 bottom-0 z-10 flex h-full w-[88vw] max-w-[22rem] flex-col bg-[var(--header-mobile-bg)] text-right text-[var(--header-text)] shadow-[0_10px_30px_rgba(15,23,42,0.28)] backdrop-blur-[9px] transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-[var(--header-text)]/15 px-4 py-3.5">
          <Link
            href="/"
            className="text-xl font-medium text-[var(--header-text)] transition-colors hover:text-[var(--header-link-hover)]"
            onClick={closeMenu}
          >
            <span className="flex items-center font-bold">
              <Image src="/mainlogo.png" alt="پاک‌نویس" width={32} height={32} className="ml-2 h-8 w-8" />
              پاک‌نویس
            </span>
          </Link>

          <button
            onClick={closeMenu}
            aria-label="بستن منو"
            className="cursor-pointer rounded-xl border border-[var(--header-text)]/25 p-2 text-[var(--header-text)] transition-colors hover:text-[var(--header-link-hover)]"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-4 py-2 text-right">
          {items.map((item) => (
            <div key={item.label} className="border-b border-[var(--header-text)]/15 py-2.5 last:border-b-0">
              {item.children ? (
                <>
                  <button
                    type="button"
                    aria-expanded={openDropdown === item.label}
                    aria-controls={`mobile-submenu-${item.label}`}
                    className="flex w-full cursor-pointer items-center justify-between gap-3 py-1.5 text-right text-[var(--header-text)] transition-colors hover:text-[var(--header-link-hover)]"
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  >
                    <span>{item.label}</span>
                    <svg
                      className={cn("h-4 w-4 transition-transform duration-300", openDropdown === item.label ? "rotate-180" : "")}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div
                    id={`mobile-submenu-${item.label}`}
                    className={cn(
                      "overflow-hidden text-sm transition-all duration-300",
                      openDropdown === item.label ? "mt-2 max-h-96 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="space-y-1">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={closeMenu}
                          className="block !cursor-pointer py-1 transition-colors hover:text-[var(--header-link-hover)]"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block py-1 transition-colors hover:text-[var(--header-link-hover)]"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
}
