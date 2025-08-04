"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { PublicEnterprisePlan } from "@/lib/admin-types";

type EnterprisePricingCarouselProps = {
  plans: PublicEnterprisePlan[];
};

function formatPlanNumber(value: number): string {
  return new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

function usePerView() {
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const calc = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        return 4;
      }

      if (width >= 768) {
        return 3;
      }

      if (width >= 640) {
        return 2;
      }

      return 1;
    };

    const onResize = () => setPerView(calc());

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return perView;
}

function buildStarts(itemCount: number, perView: number) {
  if (itemCount <= 0) {
    return [0];
  }

  if (itemCount <= perView) {
    return [0];
  }

  const starts: number[] = [0];

  for (let index = perView; index < itemCount; index += perView) {
    const remaining = itemCount - index;

    if (remaining < perView) {
      const lastStart = Math.max(0, itemCount - perView);

      if (lastStart !== starts[starts.length - 1]) {
        starts.push(lastStart);
      }

      return starts;
    }

    starts.push(index);
  }

  return starts;
}

export default function EnterprisePricingCarousel({
  plans,
}: EnterprisePricingCarouselProps) {
  const perViewRaw = usePerView();
  const perView = Math.min(perViewRaw, Math.max(1, plans.length));

  const starts = useMemo(() => buildStarts(plans.length, perView), [plans.length, perView]);
  const pages = useMemo(
    () => starts.map((start) => plans.slice(start, start + perView)),
    [plans, starts, perView],
  );
  const totalPages = Math.max(1, pages.length);
  const defaultSelectedIndex = useMemo(() => {
    const popularIndex = plans.findIndex((plan) => plan.isPopular);
    return popularIndex >= 0 ? popularIndex : 0;
  }, [plans]);

  const [page, setPage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, totalPages - 1));
  }, [totalPages]);

  useEffect(() => {
    setSelectedIndex(defaultSelectedIndex);
  }, [defaultSelectedIndex]);

  const cardBase =
    "relative rounded-[18px] bg-[var(--pn-bg)] border border-[var(--pn-border)] " +
    "transition-[transform,box-shadow,border-color] duration-200 ease-out";
  const cardSelected = "border-[3px] !border-[var(--pn-accent)]";
  const pillPopular =
    "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#e9f4f3] px-4 py-1 " +
    "text-[11px] font-extrabold text-slate-800 z-10 border border-[var(--pn-border)] shadow-sm";
  const titleText = "text-xl font-black text-slate-800";
  const priceText = "text-5xl font-black text-slate-900";
  const perText = "mt-3 text-[13px] font-semibold text-slate-500";
  const lineTop = "mx-auto mt-2 h-[3px] w-10 rounded-full bg-[var(--pn-accent)]";
  const lineMid = "mx-auto my-5 h-[3px] w-12 rounded-full bg-[var(--pn-accent)]";
  const descText = "mx-auto mt-6 max-w-[240px] text-[12px] leading-7 text-slate-600";
  const btnOutline =
    "inline-flex h-10 items-center justify-center rounded-lg border-2 border-[var(--pn-accent)] " +
    "bg-[var(--pn-bg)] px-8 text-xs font-extrabold tracking-wider text-slate-900 " +
    "shadow-[0_10px_18px_rgba(15,23,42,0.06)] transition hover:bg-[var(--pn-surface)]";

  return (
    <section dir="rtl" className="w-full">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl bg-[var(--pn-bg)] pt-3 sm:pt-4">
            <div
              className="flex transform-gpu will-change-transform transition-transform duration-1200 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translate3d(${page * 100}%, 0, 0)` }}
            >
              {pages.map((pageItems, pageIndex) => (
                <div key={starts[pageIndex]} className="w-full flex-none p-3 sm:p-4">
                  <div
                    dir="rtl"
                    className="grid gap-3 sm:gap-4"
                    style={{ gridTemplateColumns: `repeat(${perView}, minmax(0, 1fr))` }}
                  >
                    {pageItems.map((plan, index) => {
                      const globalIndex = starts[pageIndex] + index;
                      const isSelected = globalIndex === selectedIndex;

                      return (
                        <div
                          key={plan.id}
                          className="relative h-full"
                          onClick={() => setSelectedIndex(globalIndex)}
                        >
                          {plan.isPopular ? <div className={pillPopular}>محبوب</div> : null}

                          <article
                            dir="rtl"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                setSelectedIndex(globalIndex);
                              }
                            }}
                            className={[
                              cardBase,
                              "h-full px-8 pt-10 pb-8 text-center flex flex-col items-center gap-6",
                              isSelected || plan.isPopular ? cardSelected : "",
                            ].join(" ")}
                          >
                            <div className="flex flex-col items-center gap-4">
                              <h3 className={titleText}>{plan.title}</h3>
                              <div className={lineTop} />

                              <div className="mt-4">
                                <div className={priceText}>{formatPlanNumber(plan.priceMillion)}</div>
                                <div className="mt-1 text-sm font-bold text-slate-700">میلیون تومان</div>
                                <div className={perText}>
                                  {formatPlanNumber(plan.userCount)} کاربر
                                </div>
                              </div>

                              <p className={descText}>{plan.description}</p>
                            </div>

                            <div className="flex-1" />

                            <div className="flex w-full flex-col items-center gap-4">
                              <div className={lineMid} />

                              <Link
                                href="/support/contact"
                                className={btnOutline}
                                onClick={(event) => event.stopPropagation()}
                              >
                                شروع کنید
                              </Link>
                            </div>
                          </article>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setPage((currentPage) => Math.min(totalPages - 1, currentPage + 1))}
            disabled={page >= totalPages - 1}
            aria-label="بعدی"
            className="absolute -left-10 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--pn-border)] bg-[var(--pn-bg)] p-3 shadow-md backdrop-blur disabled:opacity-40"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={() => setPage((currentPage) => Math.max(0, currentPage - 1))}
            disabled={page <= 0}
            aria-label="قبلی"
            className="absolute -right-10 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--pn-border)] bg-[var(--pn-bg)] p-3 shadow-md backdrop-blur disabled:opacity-40"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
