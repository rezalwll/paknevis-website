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
  const cls = "h-7 w-7 md:h-8 md:w-8";
  const palette = [
    "text-[color:var(--pn-accent)]",
    "text-[color:var(--pn-accent)]",
    "text-[color:var(--pn-accent)]",
    "text-[color:var(--pn-accent)]",
  ];
  const colorClass = palette[i % palette.length];
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const icons = [
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${cls} ${colorClass} lucide lucide-user-check-icon lucide-user-check lucide-chart-no-axes-combined`}><path d="m16 11 2 2 4-4"/><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${cls} ${colorClass} lucide lucide-chart-no-axes-combined-icon lucide-chart-no-axes-combined`}><path d="M12 16v5"/><path d="M16 14v7"/><path d="M20 10v11"/><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/><path d="M4 18v3"/><path d="M8 14v7"/></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${cls} ${colorClass} lucide lucide-file-chart-column-increasing-icon lucide-file-chart-column-increasing`}><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M8 18v-2" /><path d="M12 18v-4" /><path d="M16 18v-6" /></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${cls} ${colorClass} lucide lucide-book-check-icon lucide-book-check`}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /><path d="m9 9.5 2 2 4-4" /></svg>,
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
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-[color:var(--pn-border)] bg-[color:var(--pn-surface-2)] shadow-sm">
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
