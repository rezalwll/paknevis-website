"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Stat = { value: string; label: string; desc: string; };

const stats: Stat[] = [
  { value: "165000", label: "تعداد کل کاربران", desc: "کاربر، پاک‌نویس را برای درست‌نویسی انتخاب کرده‌اند؛ جامعه‌ای روبه‌رشد" },
  { value: "2000", label: "کاربر فعال روزانه", desc: "نفر هر روز از پاک‌نویس استفاده می‌کنند؛ تو هم به جمعشان بپیوند" },
  { value: "12000", label: "تعداد کل متون بررسی‌شده", desc: "جمله، کلمه و متن تا امروز از نگاه تیزبین پاک‌نویس گذشته‌اند" },
  { value: "4000", label: "تعداد خطاهای اصلاح‌شده", desc: "خطای اصلاح‌شده تا امروز و یک نتیجه؛ نوشتاری روان و بی‌نقص" },
];

function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit & { once?: boolean } = { threshold: 0.3, once: true }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const obs = new IntersectionObserver((entries) => {
      const intersecting = entries.some((e) => e.isIntersecting);
      if (intersecting) {
        setInView(true);
        if (options.once) obs.disconnect();
      } else if (!options.once) {
        setInView(false);
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options.root, options.rootMargin, options.threshold, options.once]);

  return { ref, inView } as const;
}

const Counter: React.FC<{ end: number; run: boolean; duration?: number }> = ({
  end,
  run,
  duration = 1200,
}) => {
  const [val, setVal] = useState(0);
  const startTs = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  const formatter = useMemo(
    () => new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 }),
    []
  );

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!run) return;

    if (prefersReduced || duration <= 0) {
      setVal(end);
      return;
    }

    const animate = (ts: number) => {
      if (startTs.current === null) startTs.current = ts;
      const elapsed = ts - (startTs.current ?? 0);
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * end));

      if (progress < 1) rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      startTs.current = null;
    };
  }, [run, end, duration, prefersReduced]);

  return <>{formatter.format(val)}</>;
};

function StatIcon({ i }: { i: number }) {
  const cls = "h-6 w-6";
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const icons = [
    <svg key="users" viewBox="0 0 24 24" className={cls} {...common}>
      <path d="M16 11a3 3 0 1 0-6 0" />
      <path d="M8 11a3 3 0 1 1 6 0" />
      <path d="M4 20c0-3 4-5 8-5s8 2 8 5" />
    </svg>,
    <svg key="activity" viewBox="0 0 24 24" className={cls} {...common}>
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </svg>,
    <svg key="doc" viewBox="0 0 24 24" className={cls} {...common}>
      <path d="M7 3h7l3 3v15H7z" />
      <path d="M14 3v3h3" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </svg>,
    <svg key="check" viewBox="0 0 24 24" className={cls} {...common}>
      <path d="M20 6l-11 11-5-5" />
    </svg>,
  ];

  return <>{icons[i % icons.length]}</>;
}

const StatsSection: React.FC = () => {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({
    threshold: 0.35,
    rootMargin: "0px 0px -10% 0px",
    once: true,
  });

  return (
    <section id="usage-stats" ref={sectionRef} dir="rtl" className="relative bg-[color:var(--pn-bg)]">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
        <ul className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {stats.map((stat, index) => {
            const end = Number(stat.value.replace(/[^\d.-]/g, "")) || 0;

            return (
              <li
                key={index}
                className={[
                  "flex flex-col items-center text-center",
                  "px-4 sm:px-6 lg:px-8",
                  index !== 0 ? "lg:border-s lg:border-[color:var(--pn-border)]" : "",
                ].join(" ")}
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--pn-border)] bg-[color:var(--pn-bg)] text-[color:var(--pn-text)] shadow-sm">
                  <StatIcon i={index} />
                </div>

                <div className="text-4xl font-extrabold tracking-tight text-[color:var(--pn-accent-2)] tabular-nums">
                  <Counter end={end} run={inView} duration={1200} />
                </div>

                <div className="mt-2 max-w-[34ch]">
                  <p className="mt-1 text-sm leading-6 text-[color:var(--pn-muted)] ">
                    {stat.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default StatsSection;
