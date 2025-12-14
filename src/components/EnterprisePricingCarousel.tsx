"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Plan = {
    title: string;
    price: string;
    per: string;
    desc: string;
    popular?: boolean;
};

export default function EnterprisePricingCarousel() {
    // ===== Data (7 cards)
    const plans: Plan[] = useMemo(
        () => [
            { title: "طرح اول", price: "۷۷m", per: "۲۰ کاربر", desc: "متن نمونه برای توضیح کوتاه پلن. مناسب شروع کار." },
            { title: "طرح دوم", price: "۱۲۷m", per: "۶۰ کاربر", desc: "متن نمونه برای توضیح کوتاه پلن. امکانات بیشتر." , popular: true},
            { title: "طرح سوم", price: "۲۲۵m", per: "۱۳۰ کاربر", desc: "متن نمونه برای توضیح کوتاه پلن. بهترین انتخاب." },
            { title: "طرح چهارم", price: "۵۳۰m", per: "۴۰۰ کاربر", desc: "متن نمونه برای توضیح کوتاه پلن. مناسب مقیاس بزرگ." },
            { title: "طرح پنجم", price: "۵۶m", per: "۵۰۰ خطا در روز", desc: "متن نمونه برای توضیح کوتاه پلن. مناسب تیم‌ها." },
            { title: "طرح ششم", price: "۱۱۰m", per: "۲۰۰۰ خطا در روز", desc: "متن نمونه برای توضیح کوتاه پلن. مناسب سازمان‌ها." },
            { title: "طرح طلایی", price: "تماس بگیرید", per: "۵۰۰ کاربر به بالا", desc: "سفارشی‌سازی کامل بر اساس نیاز شما." },
        ],
        []
    );

    // ✅ نمایش RTL: Basic سمت راست، با رفتن "بعدی" به چپ برسیم به Custom
    const displayPlans = useMemo(() => [...plans].reverse(), [plans]);

    // ===== Selected card (default: popular if exists)
    const defaultSelected = useMemo(() => {
        const idx = displayPlans.findIndex((p) => p.popular);
        return idx >= 0 ? idx : 0;
    }, [displayPlans]);

    const [selectedIndex, setSelectedIndex] = useState(defaultSelected);

    useEffect(() => {
        setSelectedIndex(defaultSelected);
    }, [defaultSelected]);

    // ===== Exact fit (4 cards only on lg)
    const scrollerStyle = useMemo(() => ({ ["--gap" as any]: "24px" }), []);
    const cardWidth =
        "flex-[0_0_100%] " +
        "sm:flex-[0_0_calc((100%-var(--gap))/2)] " +
        "md:flex-[0_0_calc((100%-(var(--gap)+var(--gap)))/3)] " +
        "lg:flex-[0_0_calc((105%-(var(--gap)+var(--gap)+var(--gap)))/4)]";

    // ===== Card styles (match screenshot)
    const cardBase =
        "relative rounded-[18px] bg-white " +
        "border border-slate-200 " +
        "transition-[transform,box-shadow,border-color] duration-200 ease-out " +
        "hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(15,23,42,0.14)]";

    const cardPopular = "border-[3px] border-blue-500 shadow-[0_22px_52px_rgba(15,23,42,0.14)]";

    const cardSelected = "border-[3px] !border-blue-500";

    const pillPopular =
        "absolute -top-3 left-1/2 -translate-x-1/2 " +
        "rounded-full bg-emerald-100 px-4 py-1 " +
        "text-[11px] font-extrabold text-emerald-700 " +
        "border border-emerald-200 shadow-sm";

    const titleText = "text-xl font-black text-slate-700";
    const priceText = "text-5xl font-black text-pink-500";
    const perText = "mt-1 text-[11px] font-semibold text-slate-400";

    const blueLineTop = "mx-auto mt-2 h-[3px] w-10 rounded-full bg-sky-400";
    const blueLineMid = "mx-auto my-5 h-[3px] w-12 rounded-full bg-sky-400";

    const descText = "mx-auto mt-6 max-w-[240px] text-[12px] leading-7 text-slate-400";

    const btnOutline =
        "inline-flex h-10 items-center justify-center rounded-lg " +
        "border-2 border-pink-300 bg-white px-8 " +
        "text-xs font-extrabold tracking-wider text-pink-500 " +
        "shadow-[0_10px_18px_rgba(15,23,42,0.06)] " +
        "transition hover:-translate-y-0.5 hover:bg-pink-50";

    // ===== Scroller ref + edges
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    // ✅ شروع = راست (scrollLeft = max)، پایان = چپ (scrollLeft = 0)
    const [atStart, setAtStart] = useState(true); // rightmost
    const [atEnd, setAtEnd] = useState(false); // leftmost

    const updateEdges = useCallback(() => {
        const el = scrollerRef.current;
        if (!el) return;

        const max = el.scrollWidth - el.clientWidth;
        if (max <= 1) {
            setAtStart(true);
            setAtEnd(true);
            return;
        }
        const x = el.scrollLeft;

        // ✅ start = max (راست) ، end = 0 (چپ)
        setAtStart(x >= max - 1);
        setAtEnd(x <= 1);
    }, []);

    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;

        const onScroll = () => updateEdges();
        el.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            el.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [updateEdges]);

    // ✅ اسکرول اولیه: برو سمت راست (شروع RTL)
    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;

        requestAnimationFrame(() => {
            el.scrollLeft = el.scrollWidth - el.clientWidth; // rightmost
            updateEdges();
        });
    }, [updateEdges]);

    // ===== One-by-one scroll step
    const getStep = () => {
        const el = scrollerRef.current;
        if (!el) return 320;

        const first = el.querySelector<HTMLElement>("[data-card]");
        const gapStr = getComputedStyle(el).gap || getComputedStyle(el).columnGap || "24px";
        const gap = Number.parseFloat(gapStr) || 24;
        const w = first?.getBoundingClientRect().width ?? 280;

        return Math.round(w + gap);
    };

    // ✅ "next" باید بره به چپ => scrollLeft کم بشه
    const scrollOne = (dir: "prev" | "next") => {
        const el = scrollerRef.current;
        if (!el) return;

        const step = getStep();
        el.scrollBy({ left: dir === "next" ? -step : step, behavior: "smooth" });
    };

    // ===== Drag to scroll (mouse)
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const startScrollLeftRef = useRef(0);
    const movedRef = useRef(0);
    const preventClickRef = useRef(false);
    const [dragging, setDragging] = useState(false);

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "mouse") return;
        const el = scrollerRef.current;
        if (!el) return;

        isDraggingRef.current = true;
        setDragging(true);

        movedRef.current = 0;
        preventClickRef.current = false;

        el.setPointerCapture(e.pointerId);
        startXRef.current = e.clientX;
        startScrollLeftRef.current = el.scrollLeft;
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "mouse") return;
        const el = scrollerRef.current;
        if (!el || !isDraggingRef.current) return;

        const dx = e.clientX - startXRef.current;
        movedRef.current = Math.max(movedRef.current, Math.abs(dx));
        if (movedRef.current > 6) preventClickRef.current = true;

        e.preventDefault();

        // ✅ درست: کشیدن به چپ => کارت‌ها به چپ میرن
        el.scrollLeft = startScrollLeftRef.current - dx;
    };


    const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "mouse") return;

        isDraggingRef.current = false;
        setDragging(false);
        requestAnimationFrame(updateEdges);

        setTimeout(() => {
            preventClickRef.current = false;
            movedRef.current = 0;
        }, 0);
    };

    const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
        if (preventClickRef.current) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    // ===== Nav buttons
    const navBtnBase =
        "z-10 grid h-10 w-10 place-items-center rounded-full " +
        "border border-slate-200 bg-white/95 shadow-sm backdrop-blur transition hover:bg-white " +
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300";
    const navBtnLeft = "absolute -left-10 top-1/2 -translate-y-1/2";
    const navBtnRight = "absolute -right-3 top-1/2 -translate-y-1/2";
    const navBtnDisabled = "opacity-40 pointer-events-none";

    return (
        <div className="relative -mx-4 px-4">
            {/* ✅ next (به چپ) */}
            <button
                type="button"
                aria-label="بعدی"
                onClick={() => scrollOne("next")}
                className={`${navBtnBase} ${navBtnLeft} ${atEnd ? navBtnDisabled : ""}`}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M14.5 5.5L8.5 12l6 6.5"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/* ✅ prev (به راست) */}
            <button
                type="button"
                aria-label="قبلی"
                onClick={() => scrollOne("prev")}
                className={`${navBtnBase} ${navBtnRight} ${atStart ? navBtnDisabled : ""}`}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M9.5 5.5l6 6.5-6 6.5"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/* Scroller */}
            <div
                ref={scrollerRef}
                style={scrollerStyle}
                dir="ltr"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onPointerLeave={endDrag}
                onClickCapture={onClickCapture}
                className={[
                    "no-scrollbar",
                    "flex overflow-x-auto overflow-y-visible px-14 py-15 pl-18",
                    "gap-[var(--gap)] scroll-px-14",
                    dragging ? "snap-none" : "snap-x snap-mandatory scroll-smooth",
                    "select-none",
                    dragging ? "cursor-grabbing" : "cursor-grab",
                    "bg-transparent border-0 outline-none ring-0",
                    "[-webkit-overflow-scrolling:touch]",
                ].join(" ")}
            >
                {displayPlans.map((plan, i) => {
                    const isSelected = i === selectedIndex;

                    return (
                        <article
                            key={plan.title}
                            data-card
                            dir="rtl"
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedIndex(i)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedIndex(i);
                                }
                            }}
                            className={[
                                cardBase,
                                cardWidth,
                                "snap-end text-center px-8 pt-10 pb-8", // ✅ snap-end برای راست‌چین بهتر
                                isSelected ? cardSelected : plan.popular ? cardPopular : "",
                            ].join(" ")}
                        >
                            {plan.popular ? <div className={pillPopular}>محبوب</div> : null}

                            <h3 className={titleText}>{plan.title}</h3>
                            <div className={blueLineTop} />

                            <div className="mt-8">
                                <div className={priceText}>{plan.price}</div>
                                <div className={perText}>{plan.per}</div>
                            </div>

                            <p className={descText}>{plan.desc}</p>

                            <div className={blueLineMid} />

                            <a className={btnOutline} href="#">
                                شروع کنید
                            </a>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
