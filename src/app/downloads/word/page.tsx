import Image from "next/image";
import Hero from "../../../components/Hero";
import {
  Zap,
  Sparkles,
  ShieldCheck,
  FileText,
  Monitor,
  AppWindow,
  Wifi,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    title: "دسترسی سریع و آسان",
    desc: "پاکنویس مستقیماً از نوار ابزار Word در دسترس است و نیازی به باز کردن پنجره یا نرم‌افزار جداگانه ندارد.",
    Icon: Zap,
    grad: "from-sky-500/20 via-cyan-500/10 to-transparent",
    iconBg: "bg-sky-500/10 text-sky-600",
  },
  {
    title: "تشخیص هوشمند غلط‌ها",
    desc: "خطاهای رایج املایی و نگارشی را شناسایی کرده و بهترین پیشنهاد را برای اصلاح ارائه می‌دهد.",
    Icon: Sparkles,
    grad: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    iconBg: "bg-violet-500/10 text-violet-600",
  },
  {
    title: "استاندارد نگارش فارسی",
    desc: "تمام اصلاحات مطابق با اصول تایپ و نشانه‌گذاری استاندارد زبان فارسی انجام می‌شود.",
    Icon: ShieldCheck,
    grad: "from-emerald-500/20 via-teal-500/10 to-transparent",
    iconBg: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "مناسب برای متون حرفه‌ای",
    desc: "از پایان‌نامه‌ها تا نامه‌های رسمی و مقالات علمی — پاکنویس متن شما را کاملاً حرفه‌ای می‌سازد.",
    Icon: FileText,
    grad: "from-amber-500/20 via-orange-500/10 to-transparent",
    iconBg: "bg-amber-500/10 text-amber-700",
  },
];

function FeaturesFancy() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24" dir="rtl">
      <div className="relative mx-auto max-w-4xl md:max-w-5xl lg:max-w-6xl 2xl:max-w-[1400px] px-6 sm:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-[2.4rem] font-extrabold tracking-tight text-gray-900">
            ویژگی‌های افزونه پاکنویس
          </h2>

          <p className="mt-4 text-sm sm:text-base lg:text-lg leading-8 text-gray-600">
            همه‌چیز برای یک متنِ بی‌نقص در Word
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 md:mt-12 grid gap-6 md:grid-cols-2">
          {features.map(({ title, desc, Icon, grad, iconBg }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-5 sm:p-6 lg:p-7 shadow-sm backdrop-blur"
            >
              <div
                className={`pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-gradient-to-br ${grad}`}
              />

              <div className="relative flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl ring-1 ring-black/10 ${iconBg}`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <div className="min-w-0 flex-1 text-right">
                  <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-gray-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base leading-7 text-gray-600">
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ✅ RTL chip (icon on the RIGHT) */
function CompatRow({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {/* icon RIGHT */}
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-black/[0.02] text-sky-700">
        <Icon className="h-4 w-4" />
      </span>

      {/* inline text */}
      <div className="flex min-w-0 items-center gap-2 text-right">
        <span className="shrink-0 text-sm font-extrabold text-gray-900">
          {title}:
        </span>
        <span className="truncate text-sm text-gray-600">{desc}</span>
      </div>
    </div>
  );
}

function CompatibilityHero() {
  return (
    <section
      className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24 min-h-[65vh] lg:min-h-[75vh]"
      dir="rtl"
    >
      <div className="relative mx-auto grid max-w-4xl md:max-w-5xl lg:max-w-6xl 2xl:max-w-[1400px] items-center gap-10 lg:gap-16 px-6 sm:px-8 md:grid-cols-2">
        {/* TEXT */}
        <div className="text-right">
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold leading-tight text-gray-900">
            نصب ساده، سازگار با سیستم شما
          </h2>

          <p className="mt-4 max-w-xl text-sm sm:text-base lg:text-lg leading-8 text-gray-600">
            برای عملکرد بهینه پاکنویس، فقط این موارد را داشته باشید و باقی مسیر را
            پاکنویس با چند کلیک برایتان هموار می‌کند.
          </p>

          {/* compact stacked list */}
          <div className="mt-6 flex max-w-md flex-col gap-3">
            <CompatRow icon={Monitor} title="سیستم‌عامل" desc="ویندوز ۷ به بالا" />
            <CompatRow
              icon={AppWindow}
              title="نرم‌افزار"
              desc="Microsoft Word 2010 و نسخه‌های جدیدتر (۳۲ و ۶۴ بیتی)"
            />
            <CompatRow
              icon={Wifi}
              title="اتصال اینترنت"
              desc="برای استفاده از پاک‌نویس الزامی است"
            />
          </div>
        </div>

        {/* VISUAL HERO */}
        <div className="relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-6 top-6 h-44 w-44 rounded-full bg-sky-300/40 blur-3xl" />
            <div className="absolute left-6 bottom-6 h-44 w-44 rounded-full bg-violet-300/40 blur-3xl" />
          </div>

          <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg
          :max-w-xl rounded-3xl">
            <div className="relative overflow-hidden ">
              <img
                src="/images/Wavy_Bus-25_Single-11.jpg"
                alt="پشتیبانی از نسخه‌های مختلف Word"
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main dir="rtl">
      {/* HERO بالا */}
      <section
        className="
          bg-[#2c3038] text-center
          bg-[url('/images/bg-word-icons.svg')]
          bg-no-repeat
          bg-[length:1640px_auto]
          bg-[position:50%_22%]
          px-4 sm:px-6 lg:px-8
          py-16 sm:py-20 lg:py-24
          min-h-[65vh] sm:min-h-[75vh] lg:min-h-[80vh]
          flex items-center
        "
      >
        <div className="mx-auto w-full max-w-3xl md:max-w-4xl lg:max-w-5xl 2xl:max-w-[1200px] -mt-4 sm:-mt-6 lg:-mt-8">
          <h1
            className="
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.2rem]
              font-bold text-white
              leading-snug sm:leading-tight
            "
            dir="rtl"
          >
            پاک‌نویس برای Microsoft Word؛{" "}
            <br className="hidden sm:block" />
            <span className="opacity-85 block mt-2 sm:mt-0">
              نوشتاری بی‌نقص، با چند کلیک
            </span>
          </h1>

          <p
            className="
              mt-4 sm:mt-6
              text-base sm:text-lg md:text-xl lg:text-[1.25rem]
              text-white/85 max-w-xl sm:max-w-2xl mx-auto
            "
            dir="rtl"
          >
            اگر بیشتر وقت خود را صرف نگارش در Word می‌کنید، افزونهٔ پاک‌نویس بهترین
            همراه شماست.
          </p>

          <a
            href="#"
            className="
              inline-flex items-center justify-center
              mt-6 sm:mt-8
              px-6 sm:px-7 lg:px-8
              py-3 lg:py-3.5
              rounded-lg
              text-white font-semibold
              text-base sm:text-lg lg:text-[1.05rem]
              bg-gradient-to-r from-[#66C0FF] to-[#61adc4]
              bg-[length:200%_100%] bg-right hover:bg-left
              transition-all duration-500 shadow-md
            "
          >
            دانلود
          </a>
        </div>
      </section>

      {/* اسکرین‌شات زیر هیرو */}
      <section className="px-4 sm:px-6 lg:px-8 text-center -mt-16 sm:-mt-20 lg:-mt-24">
        <div className="mx-auto max-w-4xl md:max-w-5xl lg:max-w-6xl 2xl:max-w-[1400px]">
          <img
            src="/images/Word.png"
            alt="paknevis App Screenshot"
            className="w-full max-w-[1400px] mx-auto rounded-2xl shadow-2xl object-contain"
          />
        </div>
      </section>

      <FeaturesFancy />
      <CompatibilityHero />

      {/* Download banner – UI جدید، وسط‌چین، یک دکمه */}
      <section
        dir="rtl"
        className="
    mt-16 md:mt-20
    px-4 pb-16 md:pb-24
    bg-[color:var(--pn-bg)]
  "
      >
        <div className="mx-auto max-w-4xl md:max-w-5xl lg:max-w-6xl 2xl:max-w-7xl">
          <div
            className="
        relative
        rounded-[22px]
        border border-[color:var(--pn-border)]
        px-6 py-9
        sm:px-8 sm:py-10
        lg:px-14 lg:py-12
        text-center
        shadow-sm
        transition-[transform,box-shadow,border-color] duration-200 ease-out
        hover:border-[color:var(--pn-accent-2)]
        
      "
          >
            <h3
              className="
          text-xl sm:text-2xl md:text-[1.7rem] lg:text-[2.1rem]
          font-black
          text-[color:var(--pn-text)]
        "
            >
              نوشتن حرفه‌ای را از امروز شروع کنید
            </h3>

            <p
              className="
          mx-auto mt-3
          max-w-2xl md:max-w-3xl lg:max-w-4xl
          text-sm sm:text-base lg:text-[1.05rem]
          leading-8
          text-[color:var(--pn-muted)]
        "
            >
              با افزونهٔ پاک‌نویس برای Word، تنها با چند کلیک متن خود را از
              اشتباهات نگارشی و املایی پاک کنید؛ دیگر نیازی به بازخوانی‌های طولانی نیست.
            </p>

            <div className="mt-7 lg:mt-8 flex justify-center">
              <a
                href="/downloads/word"
                className="
            inline-flex items-center justify-center
            h-11 lg:h-12
            rounded-xl
            px-8 lg:px-10
            text-sm sm:text-base lg:text-[1.05rem]
            font-extrabold
            bg-[color:var(--pn-cta-bg)]
            text-[color:var(--pn-cta-text)]
            shadow-sm
            transition
            hover:bg-[color:var(--pn-cta-hover)]
          "
              >
                دانلود و نصب افزونه
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-blue-600 text-white text-center mb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">نوشتن حرفه‌ای را از امروز شروع کنید</h2>
          <p className="text-lg text-blue-100 leading-relaxed mb-10">
            با افزونه پاکنویس برای Word، تنها با چند کلیک متن خود را از اشتباهات نگارشی و املایی پاک کنید.
            دیگر نیازی به بازخوانی‌های طولانی نیست!
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-3 rounded-xl text-lg font-semibold transition">
            دانلود و نصب افزونه
          </button>
        </div>
      </section>

      {/* Download banner – نسخه بزرگ‌تر برای صفحات بزرگ */}
      <section
        dir="rtl"
        className="mt-16 md:mt-20 px-4 pb-16 md:pb-20 bg-[color:var(--pn-bg)]"
      >
        <div className="mx-auto max-w-4xl md:max-w-5xl lg:max-w-6xl 2xl:max-w-7xl">
          <div
            className="
        relative rounded-[20px]
        bg-[color:var(--pn-bg)]
        border border-[color:var(--pn-border)]
        px-6 py-7
        sm:px-8 sm:py-8
        lg:px-12 lg:py-10
        text-center
        transition-[transform,box-shadow,border-color] duration-200 ease-out
        hover:border-[color:var(--pn-accent-2)]
        
      "
          >
            <h3
              className="
          mt-1
          text-xl sm:text-2xl md:text-[1.6rem] lg:text-[1.9rem]
          font-black
          text-[color:var(--pn-text)]
        "
            >
              نوشتن حرفه‌ای را از امروز با پاک‌نویس شروع کنید
            </h3>

            <p
              className="
          mx-auto mt-3
          max-w-2xl md:max-w-3xl lg:max-w-4xl
          text-sm sm:text-base lg:text-[1.05rem]
          leading-8
          text-[color:var(--pn-muted)]
        "
            >
              نسخهٔ مناسب خودتان را دانلود کنید و خطاهای املایی، نگارشی و فاصله‌گذاری را
              فقط با چند کلیک اصلاح کنید.
            </p>

            <div className="mt-7 lg:mt-8 flex flex-wrap justify-center gap-3 lg:gap-4">
              <a
                href="/downloads/word"
                className="
            inline-flex h-11 lg:h-12 items-center justify-center gap-2 rounded-xl
            bg-[color:var(--pn-cta-bg)]
            px-7 lg:px-9
            text-sm sm:text-[0.95rem] lg:text-[1.02rem]
            font-extrabold
            text-[color:var(--pn-cta-text)]
            shadow-sm
            transition hover:bg-[color:var(--pn-cta-hover)]
          "
              >
                دانلود افزونهٔ Word
              </a>

              <a
                href="/downloads/chrome"
                className="
            inline-flex h-11 lg:h-12 items-center justify-center gap-2 rounded-xl
            border-2 border-[color:var(--pn-cta-bg)]
            bg-[color:var(--pn-bg)]
            px-7 lg:px-9
            text-sm sm:text-[0.95rem] lg:text-[1.02rem]
            font-extrabold
            text-[color:var(--pn-text)]
            shadow-sm
            transition hover:bg-[color:var(--pn-surface)]
          "
              >
                دانلود افزونهٔ مرورگر
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
