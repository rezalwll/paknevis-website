"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Stat = {
  value: string;
  label: string;
  desc: string;
};

const stats: Stat[] = [
  {
    value: "165000",
    label: "تعداد کل کاربران",
    desc: "۱۶۵۰۰۰ کاربر، پاک‌نویس را برای درست‌نویسی انتخاب کرده‌اند؛ جامعه‌ای روبه‌رشد",
  },
  {
    value: "2000",
    label: "کاربر فعال روزانه",
    desc: "۲۰۰۰ نفر هر روز از پاک‌نویس استفاده می‌کنند؛ توهم به جمعشان بپیوند",
  },
  {
    value: "12000",
    label: "تعداد کل متون بررسی شده",
    desc: "۱۲۰۰۰ جمله، کلمه و متن تا امروز از نگاه تیزبین پاک‌نویس گذشته‌اند؛ هر کلمه‌ای ارزش دیده‌شدن دارد",
  },
  {
    value: "4000",
    label: "تعداد خطاهای اصلاح شده",
    desc: "۴۰۰۰ خطای اصلاح شده تا امروز و یک نتیجه؛ نوشتاری روان و بی‌نقص",
  },
];

function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit & { once?: boolean } = {
    threshold: 0.3,
    once: true,
  }
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
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
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

const StatsSection: React.FC = () => {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({
    threshold: 0.35,
    rootMargin: "0px 0px -10% 0px",
    once: true,
  });

  return (
    <section
      id="usage-stats"
      ref={sectionRef}
      className="relative bg-white min-h-130 overflow-hidden flex justify-center items-center"
      dir="rtl"
    >
      <div
        className="absolute inset-y-0 w-full 
          [background:radial-gradient(circle_at_center,#e5f4f6,transparent_70%)] 
          blur-3xl -translate-x-1/4
          [mask-image:linear-gradient(to_right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)] 
          [mask-repeat:no-repeat] [mask-size:100%_100%]
          [mask-composite:intersect]
          [-webkit-mask-image:linear-gradient(to_right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 w-120 h-120 
          [background:radial-gradient(circle_at_center,rgba(255,165,0,0.3),transparent_70%)] 
          blur-3xl -translate-x-1/3 -translate-y-1/3 z-0"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-stretch gap-4 text-center">
          {stats.map((stat, index) => {
            const end = Number(stat.value.replace(/[^\d.-]/g, "")) || 0;
            return (
              <div
                key={index}
                className="stat-box p-6 rounded-lg shadow-lg bg-white/80 backdrop-blur
                 transition-all hover:shadow-lg
                 w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(19%-0.5rem)]
                 bg-gradient-to-b from-transparent to-purple-100/30
                 flex"
              >
                <div className="grid grid-rows-[64px_40px_minmax(100px,auto)] md:grid-rows-[64px_40px_minmax(120px,auto)] gap-2 justify-items-center items-center w-full h-full">
                  <div className="flex items-center justify-center h-full">
                    <h3 className="text-3xl md:text-4xl font-bold text-primary-600 tabular-nums">
                      <Counter end={end} run={inView} duration={1200} />
                    </h3>
                  </div>

                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-700 font-medium text-center">
                      {stat.label}
                    </p>
                  </div>

                  <div className="h-full flex items-start justify-center text-center">
                    <p className="text-sm leading-6 text-gray-500 px-1">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
