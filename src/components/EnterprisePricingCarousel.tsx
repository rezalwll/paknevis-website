"use client";

import React, { useEffect, useMemo, useState } from "react";

type Plan = {
    title: string;
    price: string;
    per: string;
    desc: string;
    popular?: boolean;
};

function usePerView() {
    const [perView, setPerView] = useState(1);

    useEffect(() => {
        const calc = () => {
            const w = window.innerWidth;
            if (w >= 1024) return 4; // lg
            if (w >= 768) return 3; // md
            if (w >= 640) return 2; // sm
            return 1;
        };
        const onResize = () => setPerView(calc());
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return perView;
}

/** Start indexes that avoid a "lonely last page" */
function buildStarts(n: number, perView: number) {
    if (n <= 0) return [0];
    if (n <= perView) return [0];

    const starts: number[] = [0];

    for (let i = perView; i < n; i += perView) {
        const remaining = n - i;

        if (remaining < perView) {
            const lastStart = Math.max(0, n - perView);
            if (lastStart !== starts[starts.length - 1]) starts.push(lastStart);
            return starts;
        }

        starts.push(i);
    }

    return starts;
}

export default function EnterprisePricingCarousel() {
    const plans: Plan[] = useMemo(
        () => [
            { title: "طرح ۱", price: "۷۷", per: "۲۰ کاربر", desc: "توضیح کوتاه پلن. مناسب شروع کار." },
            { title: "طرح ۲", price: "۱۲۷", per: "۶۰ کاربر", desc: "امکانات بیشتر برای تیم‌های متوسط.", popular: true },
            { title: "طرح ۳", price: "۲۲۵", per: "۱۳۰ کاربر", desc: "مناسب سازمان‌های رو به رشد." },
            { title: "طرح ۴", price: "۳۲۰", per: "۲۰۰ کاربر", desc: "پشتیبانی و امکانات کامل‌تر." },
            { title: "طرح ۵", price: "۴۸۰", per: "۳۵۰ کاربر", desc: "برای واحدهای بزرگ سازمانی." },
            { title: "طرح ۶", price: "۶۵۰", per: "۵۰۰ کاربر", desc: "پیکربندی اختصاصی و SLA." },
            { title: "طرح ۷", price: "۹۰۰", per: "۸۰۰ کاربر", desc: "بالاترین سطح خدمات و سفارشی‌سازی." },
        ],
        []
    );

    const perViewRaw = usePerView();
    const perView = Math.min(perViewRaw, Math.max(1, plans.length));

    const starts = useMemo(() => buildStarts(plans.length, perView), [plans.length, perView]);
    const pages = useMemo(() => starts.map((s) => plans.slice(s, s + perView)), [starts, plans, perView]);

    const totalPages = Math.max(1, pages.length);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setPage((p) => Math.min(p, totalPages - 1));
    }, [totalPages]);

    const canPrev = page > 0;
    const canNext = page < totalPages - 1;

    const prev = () => setPage((p) => Math.max(0, p - 1));
    const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

    const cardBase =
        "relative rounded-[18px] bg-[var(--pn-bg)] " +
        "border border-[var(--pn-border)] " +
        "transition-[transform,box-shadow,border-color] duration-200 ease-out ";

    const cardPopular =
        "border-[3px] border-[var(--pn-accent)] ";

    const cardSelected =
        "border-[3px] !border-[var(--pn-accent)] ";

    const pillPopular =
        "absolute -top-3 left-1/2 -translate-x-1/2 " +
        "rounded-full bg-[var(--pn-surface)] px-4 py-1 " +
        "text-[11px] font-extrabold text-slate-800 " +
        "border border-[var(--pn-border)] shadow-sm z-10";

    const titleText = "text-xl font-black text-slate-800";
    const priceText = "text-5xl font-black text-slate-900";
    const perText = "mt-3 text-[13px] font-semibold text-slate-500";

    const lineTop = "mx-auto mt-2 h-[3px] w-10 rounded-full bg-[var(--pn-accent)]";
    const lineMid = "mx-auto my-5 h-[3px] w-12 rounded-full bg-[var(--pn-accent)]";

    const descText = "mx-auto mt-6 max-w-[240px] text-[12px] leading-7 text-slate-600";

    const btnOutline =
        "inline-flex h-10 items-center justify-center rounded-lg " +
        "border-2 border-[var(--pn-accent)] bg-[var(--pn-bg)] px-8 " +
        "text-xs font-extrabold tracking-wider text-slate-900 " +
        "shadow-[0_10px_18px_rgba(15,23,42,0.06)] " +
        "transition hover:bg-[var(--pn-surface)]";

    const defaultSelected = useMemo(() => {
        const idx = plans.findIndex((p) => p.popular);
        return idx >= 0 ? idx : 0;
    }, [plans]);

    const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
    useEffect(() => setSelectedIndex(defaultSelected), [defaultSelected]);

    return (
        <section dir="rtl" className="w-full">
            <div className="mx-auto max-w-6xl px-4">
                <div className="relative">
                    <div className="overflow-hidden rounded-2xl bg-[var(--pn-bg)]">
                        <div
                            className="flex will-change-transform transform-gpu transition-transform duration-1200 ease-[cubic-bezier(0.22,1,0.36,1)]"
                            style={{ transform: `translate3d(${page * 100}%,0,0)` }}
                        >
                            {pages.map((items, pi) => (
                                <div key={starts[pi]} className="w-full flex-none p-3 sm:p-4">
                                    <div
                                        dir="rtl"
                                        className="grid gap-3 sm:gap-4"
                                        style={{ gridTemplateColumns: `repeat(${perView}, minmax(0, 1fr))` }}
                                    >
                                        {items.map((plan, i) => {
                                            const globalIndex = starts[pi] + i;
                                            const isSelected = globalIndex === selectedIndex;

                                            return (
                                                <article
                                                    key={`${starts[pi]}-${i}-${plan.title}`}
                                                    dir="rtl"
                                                    role="button"
                                                    tabIndex={0}
                                                    onClick={() => setSelectedIndex(globalIndex)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" || e.key === " ") {
                                                            e.preventDefault();
                                                            setSelectedIndex(globalIndex);
                                                        }
                                                    }}
                                                    className={[
                                                        cardBase,
                                                        "h-full text-center px-8 pt-10 pb-8",
                                                        plan.popular ? cardSelected : "",
                                                    ].join(" ")}
                                                >
                                                    {plan.popular ? <div className={pillPopular}>محبوب</div> : null}

                                                    <h3 className={titleText}>{plan.title}</h3>
                                                    <div className={lineTop} />

                                                    <div className="mt-8">
                                                        <div className={priceText}>{plan.price}</div>
                                                        میلیون
                                                        <div className={perText}>{plan.per}</div>
                                                    </div>

                                                    <p className={descText}>{plan.desc}</p>

                                                    <div className={lineMid} />

                                                    <a className={btnOutline} href="#">
                                                        شروع کنید
                                                    </a>
                                                </article>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* next (به سمت چپ) */}
                    <button
                        onClick={next}
                        disabled={!canNext}
                        aria-label="بعدی"
                        className="absolute -left-10 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--pn-border)] bg-[var(--pn-bg)] p-3 shadow-md backdrop-blur disabled:opacity-40"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* prev (به سمت راست) */}
                    <button
                        onClick={prev}
                        disabled={!canPrev}
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
