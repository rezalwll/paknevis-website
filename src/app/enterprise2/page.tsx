// app/pricing/page.tsx
import React from "react";

type Feature = { label: string; ok: boolean };
type Plan = {
  id: string;
  name: string;
  price: string; // "19"
  cents: string; // "99"
  topGrad: string; // tailwind classes
  bottomGrad: string; // tailwind classes
  accentText: string; // tailwind classes
  featured?: boolean;
  features: Feature[];
};

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="10" className="fill-emerald-500/15" />
      <path
        d="M7.5 12.5l2.8 2.9 6.2-6.6"
        className="stroke-emerald-600"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="10" className="stroke-emerald-600/25" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="10" className="fill-rose-500/10" />
      <path
        d="M8.2 8.2l7.6 7.6M15.8 8.2l-7.6 7.6"
        className="stroke-rose-600"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="10" className="stroke-rose-600/25" />
    </svg>
  );
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "19",
    cents: "99",
    topGrad: "bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-700",
    bottomGrad: "bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-500",
    accentText: "text-sky-600",
    features: [
      { label: "Lorem ipsum dolor amet.", ok: true },
      { label: "Consectetur adipisicing elit.", ok: false },
      { label: "Sed diam nonummy euism.", ok: false },
      { label: "Tincint laoreet iam dolore.", ok: true },
      { label: "Magna aliquam eratn.", ok: false },
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: "27",
    cents: "99",
    topGrad: "bg-gradient-to-r from-fuchsia-500 via-pink-600 to-rose-600",
    bottomGrad: "bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-500",
    accentText: "text-pink-600",
    featured: true,
    features: [
      { label: "Lorem ipsum dolor amet.", ok: true },
      { label: "Consectetur adipisicing elit.", ok: true },
      { label: "Sed diam nonummy euism.", ok: false },
      { label: "Tincint laoreet iam dolore.", ok: true },
      { label: "Magna aliquam eratn.", ok: true },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "49",
    cents: "99",
    topGrad: "bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-700",
    bottomGrad: "bg-gradient-to-r from-slate-700 via-teal-600 to-emerald-600",
    accentText: "text-emerald-600",
    features: [
      { label: "Lorem ipsum dolor amet.", ok: true },
      { label: "Consectetur adipisicing elit.", ok: true },
      { label: "Sed diam nonummy euism.", ok: true },
      { label: "Tincint laoreet iam dolore.", ok: true },
      { label: "Magna aliquam eratn.", ok: true },
    ],
  },
];

function PricingCard({ plan }: { plan: Plan }) {
  const topClip: React.CSSProperties = {
    clipPath: "polygon(0 0, 100% 0, 100% 86%, 0 72%)", // مورّب مثل عکس
  };

  const sheetClip: React.CSSProperties = {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 90%)", // مورّب پایین سفید
  };

  return (
    <div
      className={[
        "relative w-full max-w-[270px] overflow-hidden rounded-[28px]",
        "shadow-[0_24px_60px_rgba(15,23,42,0.22)]",
        plan.featured ? "md:-mt-4" : "",
      ].join(" ")}
    >
      {/* پس‌زمینه کلی */}
      <div className="absolute inset-0 bg-white" />

      {/* TOP shadow thickness */}
      <div
        className="absolute left-0 top-0 h-[150px] w-full translate-x-[10px] translate-y-[10px] rounded-[28px] bg-black/35"
        style={topClip}
      />

      {/* TOP gradient */}
      <div className={["relative h-[150px] w-full", plan.topGrad].join(" ")} style={topClip}>
        {/* bubbles */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/12" />
        <div className="absolute right-10 top-10 h-28 w-28 rounded-full bg-white/10" />
        <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-white/10" />

        <div className="relative flex h-full flex-col items-center justify-center text-white">
          <div className="text-[15px] font-semibold tracking-wide opacity-95">{plan.name}</div>

          <div className="mt-1 flex items-start">
            <span className="text-[54px] font-extrabold leading-none drop-shadow-sm">
              ${plan.price}
            </span>
            <span className="ml-1 mt-2 text-[16px] font-bold opacity-95">{plan.cents}</span>
          </div>
        </div>
      </div>

      {/* White sheet */}
      <div className="relative -mt-7 px-5">
        <div
          className={[
            "rounded-[22px] bg-white",
            "shadow-[0_10px_24px_rgba(15,23,42,0.10)]",
          ].join(" ")}
          style={sheetClip}
        >
          <ul className="divide-y divide-slate-100 px-5 py-6 text-[12px] text-slate-500">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 py-3">
                {f.ok ? (
                  <CheckIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                ) : (
                  <XIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                )}
                <span className={f.ok ? "text-slate-600" : "text-slate-400"}>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom gradient area */}
      <div className={["relative mt-[-10px] h-[92px] w-full", plan.bottomGrad].join(" ")}>
        <div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_20%_20%,rgba(255,255,255,.35),transparent_55%)]" />
        <div className="flex h-full items-center justify-center">
          <button
            className={[
              "rounded-full bg-white/95 px-10 py-2 text-[12px] font-semibold",
              "shadow-[0_10px_18px_rgba(15,23,42,0.18)]",
              "transition hover:translate-y-[-1px] active:translate-y-[0px]",
              plan.accentText,
            ].join(" ")}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen w-full bg-slate-200/70 py-12">
      <section className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center gap-8">
          <div className="grid w-full grid-cols-1 place-items-center gap-8 md:grid-cols-3">
            {plans.map((p) => (
              <PricingCard key={p.id} plan={p} />
            ))}
          </div>

          {/* سایه زیر کارت‌ها مثل تصویر */}
          <div className="mt-2 h-10 w-full max-w-5xl opacity-30 blur-[2px] [background:radial-gradient(ellipse_at_center,rgba(15,23,42,.45),transparent_65%)]" />
        </div>
      </section>
    </main>
  );
}
