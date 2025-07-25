'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type Plan = {
  id: string;
  title: string;
  product: string;
  setupLabel: string;
  setupValue: string;
  supportLabel: string;
  supportValue: string;
  features: string[];
  limit: string;
  popular?: boolean;
  ctaText?: string;
};

export default function OfflinePricingSection({
  contactEmail,
}: {
  contactEmail: string;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(280);

  const plans: Plan[] = useMemo(
    () => [
      {
        id: 'plan-1',
        title: 'طرح اول',
        product: 'محصولات افزونه‌ی ورد',
        setupLabel: 'هزینهٔ پیاده‌سازی',
        setupValue: '۷۷ میلیون تومان',
        supportLabel: 'هزینهٔ پشتیبانی',
        supportValue: 'به‌صورت ساعتی',
        features: ['املایی', 'نویسه', 'نشانه‌گذاری', 'پیشنهاد ویرایشی', 'اعداد', 'مصوب فرهنگستان'],
        limit: 'قابل‌استفاده تا ۲۰ کاربر',
      },
      {
        id: 'plan-2',
        title: 'طرح دوم',
        product: 'محصولات افزونه‌ی ورد',
        setupLabel: 'هزینهٔ پیاده‌سازی',
        setupValue: '۱۲۷ میلیون تومان',
        supportLabel: 'هزینهٔ پشتیبانی',
        supportValue: 'به‌صورت ساعتی',
        features: ['املایی', 'نویسه', 'نشانه‌گذاری', 'پیشنهاد ویرایشی', 'اعداد', 'مصوب فرهنگستان'],
        limit: 'قابل‌استفاده تا ۶۰ کاربر',
        popular: true,
      },
      {
        id: 'plan-3',
        title: 'طرح سوم',
        product: 'محصولات افزونه‌ی ورد',
        setupLabel: 'هزینهٔ پیاده‌سازی',
        setupValue: '۲۲۵ میلیون تومان',
        supportLabel: 'هزینهٔ پشتیبانی',
        supportValue: 'به‌صورت ساعتی',
        features: ['املایی', 'نویسه', 'نشانه‌گذاری', 'پیشنهاد ویرایشی', 'اعداد', 'مصوب فرهنگستان'],
        limit: 'قابل‌استفاده تا ۱۳۰ کاربر',
      },
      {
        id: 'plan-4',
        title: 'طرح چهارم',
        product: 'محصولات افزونه‌ی ورد',
        setupLabel: 'هزینهٔ پیاده‌سازی',
        setupValue: '۵۳۰ میلیون تومان',
        supportLabel: 'هزینهٔ پشتیبانی',
        supportValue: 'به‌صورت ساعتی',
        features: ['املایی', 'نویسه', 'نشانه‌گذاری', 'پیشنهاد ویرایشی', 'اعداد', 'مصوب فرهنگستان'],
        limit: 'قابل‌استفاده تا ۴۰۰ کاربر',
      },
      {
        id: 'plan-5',
        title: 'طرح پنجم',
        product: 'محصولات ویرایشگر تحت وب',
        setupLabel: 'هزینهٔ پیاده‌سازی',
        setupValue: '۵۶ میلیون تومان',
        supportLabel: 'هزینهٔ پشتیبانی',
        supportValue: 'به‌صورت ساعتی',
        features: ['املایی', 'نویسه', 'نشانه‌گذاری', 'پیشنهاد ویرایشی', 'اعداد', 'مصوب فرهنگستان'],
        limit: 'قابل‌استفاده تا ۵۰۰ خطا در روز',
      },
      {
        id: 'plan-6',
        title: 'طرح ششم',
        product: 'محصولات ویرایشگر تحت وب',
        setupLabel: 'هزینهٔ پیاده‌سازی',
        setupValue: '۱۱۰ میلیون تومان',
        supportLabel: 'هزینهٔ پشتیبانی',
        supportValue: 'به‌صورت ساعتی',
        features: ['املایی', 'نویسه', 'نشانه‌گذاری', 'پیشنهاد ویرایشی', 'اعداد', 'مصوب فرهنگستان'],
        limit: 'قابل‌استفاده تا ۲۰۰۰ خطا در روز',
      },
      {
        id: 'plan-gold',
        title: 'طرح طلایی',
        product: 'محصولات افزونه‌ی ورد به همراه ویرایشگر تحت وب',
        setupLabel: 'هزینهٔ پیاده‌سازی',
        setupValue: 'تماس بگیرید',
        supportLabel: 'هزینهٔ پشتیبانی',
        supportValue: 'به‌صورت ساعتی',
        features: ['املایی', 'نویسه', 'نشانه‌گذاری', 'پیشنهاد ویرایشی', 'اعداد', 'مصوب فرهنگستان'],
        limit: 'قابل‌استفاده از ۵۰۰ کاربر به بالا',
      },
    ],
    []
  );

  const makeMailto = (planTitle: string) => {
    const subject = encodeURIComponent(`درخواست مشاوره نسخه آفلاین پاک‌نویس — ${planTitle}`);
    const body = encodeURIComponent(
      `سلام\n\nبرای ${planTitle} درخواست مشاوره/اطلاعات بیشتر دارم.\n\nنام سازمان:\nتعداد کاربران/نیاز:\nشماره تماس:\n\nسپاس`
    );
    return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>('.card');
    if (!first) return;
    const computed = first.offsetWidth + 22; // card width + gap
    setStep(Math.max(220, Math.min(computed, 420)));
  }, []);

  const scrollByDir = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="enterprise-pricing" dir="rtl">
      <div className="pricing-inner">
        <div className="pricing-head">
          <h2>نسخهٔ آفلاین پاک‌نویس برای سازمان‌ها</h2>
          <p>
            طرح‌های نسخه آفلاین را ببینید و برای دریافت مشاوره روی گزینه «ارتباط با ما» در هر کارت کلیک کنید.
          </p>
        </div>

        <div className="scroll-row">
          <div className="hint">برای دیدن بقیهٔ طرح‌ها، افقی اسکرول کنید</div>
        </div>

        <div className="carousel-shell">
          <button type="button" className="edge-btn left" onClick={() => scrollByDir(-1)} aria-label="اسکرول به راست">
            ◀
          </button>
          <div className="grid" ref={scrollerRef}>
            {plans.map((p) => (
              <article key={p.id} className={`card ${p.popular ? 'featured' : ''}`}>
                {p.popular && <div className="popular-pill">محبوب</div>}

                <h3 className="title">{p.title}</h3>
                <div className="title-line" />

                <p className="price">{p.setupValue}</p>
                <div className="per">{p.setupLabel}</div>

                <p className="desc">
                  {p.product}
                  <br />
                  {p.supportLabel}: {p.supportValue}
                </p>

                <div className="divider" />

                <ul className="feature-list">
                  {p.features.map((f) => (
                    <li key={f} className="feature-item">
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="limit">{p.limit}</p>

                <a className="btn" href={makeMailto(p.title)}>
                  {p.ctaText ?? 'ارتباط با ما'}
                </a>
              </article>
            ))}
          </div>
          <button type="button" className="edge-btn right" onClick={() => scrollByDir(1)} aria-label="اسکرول به چپ">
            ▶
          </button>
        </div>
      </div>

      <style jsx>{`
        .enterprise-pricing {
          --card-radius: 18px;
          --shadow: 0 18px 40px rgba(17, 24, 39, 0.14);
          --shadow-soft: 0 12px 26px rgba(17, 24, 39, 0.1);
          --text: #111827;
          --muted: #6b7280;
          --muted-2: #9ca3af;
          --accent: #ff4d8d;
          --accent-soft: #ffd1e3;
          --line: #e5e7eb;
          --blue: #2f80ed;
          --blue-soft: rgba(47, 128, 237, 0.2);
          --popular-bg: #d1fae5;
          --popular-text: #065f46;
          background: #f3f4f6;
          padding: 64px 16px 90px;
          color: var(--text);
        }

        .pricing-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .pricing-head {
          text-align: center;
          margin-bottom: 36px;
        }

        .pricing-head h2 {
          font-size: 28px;
          font-weight: 800;
          margin: 0;
          letter-spacing: 0.1px;
        }

        .pricing-head p {
          margin: 10px auto 0;
          color: var(--muted);
          max-width: 640px;
          line-height: 1.7;
          font-size: 14px;
        }

        .scroll-row {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          margin: 12px 0 8px;
          color: var(--muted);
        }

        .hint {
          font-size: 13px;
        }

        .carousel-shell {
          position: relative;
        }

        .edge-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 2px solid var(--accent-soft);
          background: #fff;
          color: var(--accent);
          font-weight: 800;
          cursor: pointer;
          box-shadow: var(--shadow-soft);
          transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
          display: grid;
          place-items: center;
        }

        .edge-btn.left {
          right: 100%;
          margin-right: 10px;
        }

        .edge-btn.right {
          left: 100%;
          margin-left: 10px;
        }

        .edge-btn:hover {
          background: #fff0f6;
          border-color: #ff9fc2;
          transform: translateY(-50%) translateY(-1px);
        }

        .grid {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 250px;
          gap: 22px;
          align-items: stretch;
          overflow-x: auto;
          padding: 8px 4px 14px;
          scroll-snap-type: x mandatory;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .grid::-webkit-scrollbar {
          display: none;
        }

        .card {
          width: 100%;
          background: #fff;
          border-radius: var(--card-radius);
          box-shadow: var(--shadow);
          padding: 22px 22px 18px;
          position: relative;
          text-align: center;
          border: 2px solid transparent;
          transform: translateY(0);
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
          scroll-snap-align: start;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-soft);
        }

        .card.featured {
          border-color: var(--blue);
          box-shadow: 0 18px 45px rgba(47, 128, 237, 0.18), var(--shadow);
        }

        .popular-pill {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--popular-bg);
          color: var(--popular-text);
          font-size: 12px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 999px;
          box-shadow: 0 10px 22px rgba(16, 185, 129, 0.18);
          letter-spacing: 0.2px;
        }

        .title {
          font-size: 26px;
          font-weight: 800;
          margin: 6px 0 10px;
        }

        .title-line {
          width: 42px;
          height: 3px;
          background: #60a5fa;
          border-radius: 999px;
          margin: 0 auto 14px;
        }

        .price {
          font-size: 44px;
          font-weight: 900;
          color: var(--accent);
          margin: 0;
          letter-spacing: 0.2px;
        }

        .per {
          margin-top: 2px;
          font-size: 12px;
          color: var(--muted-2);
        }

        .desc {
          margin: 16px auto 14px;
          font-size: 13px;
          line-height: 1.7;
          color: var(--muted);
          max-width: 210px;
          white-space: pre-line;
        }

        .divider {
          width: 52px;
          height: 3px;
          background: #93c5fd;
          border-radius: 999px;
          margin: 0 auto 16px;
          opacity: 0.9;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0 0 12px;
          text-align: right;
          direction: rtl;
        }

        .feature-item {
          position: relative;
          padding-right: 14px;
          margin-bottom: 8px;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
        }

        .feature-item::before {
          content: '';
          position: absolute;
          right: 0;
          top: 7px;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--accent);
          box-shadow: 0 0 0 4px var(--accent-soft);
        }

        .limit {
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          margin: 6px 0 10px;
        }

        .btn {
          margin-top: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 76%;
          height: 44px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 0.6px;
          text-decoration: none;
          color: var(--accent);
          border: 2px solid var(--accent-soft);
          background: #fff;
          transition: background 0.18s ease, transform 0.18s ease, border-color 0.18s ease;
        }

        .btn:hover {
          background: #fff0f6;
          border-color: #ff9fc2;
          transform: translateY(-1px);
        }

        @media (max-width: 1020px) {
          .grid {
            grid-auto-columns: 240px;
          }
        }

        @media (max-width: 560px) {
          .enterprise-pricing {
            padding: 52px 14px 70px;
          }

          .scroll-row {
            align-items: flex-start;
            flex-direction: column;
          }

          .edge-btn.left,
          .edge-btn.right {
            display: none;
          }

          .grid {
            grid-auto-columns: min(360px, 92vw);
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
