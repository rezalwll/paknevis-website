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
      className={cn(
        "fixed inset-0 z-50 bg-[var(--header-mobile-bg)] shadow-lg transition-transform duration-300 sm:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-xl font-medium text-[var(--header-text)] transition-colors hover:text-[var(--header-link-hover)]"
          onClick={closeMenu}
        >
          <span className="flex items-center">
            <Image src="/mainlogo.png" alt="پاک‌نویس" width={32} height={32} className="mr-2 h-8 w-8" />
            پاک‌نویس
          </span>
        </Link>
        <button
          onClick={closeMenu}
          aria-label="بستن منو"
          className="cursor-pointer text-[var(--header-text)] transition-colors hover:text-[var(--header-link-hover)]"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-col space-y-4 px-4 py-4">
        {items.map((item) => (
          <div key={item.label} className="border-b border-gray-300 pb-2">
            {item.children ? (
              <>
                <button
                  className="flex w-full items-center text-right text-[var(--header-text)] transition-colors hover:text-[var(--header-link-hover)]"
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
                {openDropdown === item.label ? (
                  <div className="mt-2 space-y-1 pl-4 text-sm">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={closeMenu}
                        className="block transition-colors hover:text-[var(--header-link-hover)]"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <Link
                href={item.href}
                onClick={closeMenu}
                className="transition-colors hover:text-[var(--header-link-hover)]"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}



