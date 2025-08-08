import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import type { NavItem } from "@/config/navigation";
import { cn } from "@/lib/cn";

type DesktopNavProps = {
  items: NavItem[];
  openDropdown: string | null;
  setOpenDropdown: (value: string | null) => void;
};

export function DesktopNav({ items, openDropdown, setOpenDropdown }: DesktopNavProps) {
  return (
    <ul className="hidden items-center space-x-3 sm:flex sm:text-sm md:space-x-6 md:text-base">
      {items.map((item) => {
        const isDropdownOpen = openDropdown === item.label;

        return (
          <li
            key={item.label}
            className="relative group"
            onMouseEnter={() => setOpenDropdown(item.label)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            {item.children ? (
              <button
                type="button"
                onClick={() => setOpenDropdown(isDropdownOpen ? null : item.label)}
                aria-expanded={isDropdownOpen}
                className="flex items-center gap-1 bg-transparent p-0 text-[var(--header-text)] transition-colors hover:text-[var(--header-link-hover)]"
              >
                <span>{item.label}</span>
                <ChevronDownIcon
                  className={cn(
                    "mr-1 h-4 w-4 transition-transform duration-200",
                    isDropdownOpen ? "rotate-180" : "group-hover:rotate-180",
                  )}
                />
              </button>
            ) : (
              <Link
                href={item.href}
                className="transition-colors text-[var(--header-text)] hover:text-[var(--header-link-hover)]"
              >
                {item.label}
              </Link>
            )}

            {item.children ? (
              <ul
                className={cn(
                  "absolute right-0 top-7 origin-top overflow-hidden rounded bg-white shadow transition-all duration-300",
                  isDropdownOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
                )}
              >
                {item.children.map((sub) => (
                  <li key={sub.label}>
                    <Link
                      href={sub.href}
                      className="block whitespace-nowrap px-4 py-2 text-sm transition-colors hover:text-[var(--header-link-hover)]"
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

