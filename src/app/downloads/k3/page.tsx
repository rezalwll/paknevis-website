"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Keyboard as KeyboardIcon,
  QrCode,
  Download,
  Smartphone,
  ShieldCheck,
  WandSparkles,
  ReplaceAll,
  Type as TypeIcon,
  CheckCircle2,
  Globe,
  Zap,
  Languages,
} from "lucide-react";

/**
 * نسخهٔ دوم (کاملاً متفاوت از قبل):
 * - طرح روشن و مینیمال با پس‌زمینهٔ طرح‌دار
 * - سکشن QR Code بزرگ (قابل اسکن) + سوئیچر فروشگاه‌ها که QR را هم عوض می‌کند
 * - چیدمان عمودی کارت‌ها و استپ‌های نصب افقی
 * - بدون وابستگی به Button/Card/Accordion خارجی
 * - فقط Tailwind + framer-motion + lucide-react
 */

// --- تنظیمات کلی ---
const APP = {
  name: "کیبورد اندروید پاک‌نویس",
  version: "v1.0.0",
  size: "18 MB",
  minAndroid: "Android 8.0+ (Oreo)",
  lastUpdate: "01 Nov 2025",
  apkUrl: "https://example.com/pakanavis-keyboard.apk", // TODO: لینک نهایی APK
  gpUrl: "https://play.google.com/store/apps/details?id=ir.pakanavis.keyboard", // TODO
  bazaarUrl: "https://cafebazaar.ir/app/ir.pakanavis.keyboard", // TODO
  myketUrl: "https://myket.ir/app/ir.pakanavis.keyboard", // TODO
  privacyUrl: "#privacy",
};

type StoreKey = "apk" | "play" | "bazaar" | "myket";

const STORE_META: Record<
  StoreKey,
  { label: string; urlKey: keyof typeof APP; hint: string }
> = {
  apk: { label: "دانلود مستقیم APK", urlKey: "apkUrl", hint: "دانلود مستقیم" },
  play: { label: "Google Play", urlKey: "gpUrl", hint: "فروشگاه رسمی گوگل" },
  bazaar: { label: "کافه‌بازار", urlKey: "bazaarUrl", hint: "بازار ایران" },
  myket: { label: "مایکت", urlKey: "myketUrl", hint: "مایکت ایران" },
};

// دکمهٔ کوچک داخلی
function Btn({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes =
    size === "sm"
      ? "px-3 py-1.5 text-sm"
      : size === "lg"
      ? "px-5 py-2.5 text-base"
      : "px-4 py-2 text-sm";
  const variants =
    variant === "primary"
      ? "bg-indigo-600 text-white hover:bg-indigo-700"
      : variant === "outline"
      ? "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
      : "text-gray-700 hover:bg-gray-100";
  return (
    <button
      onClick={onClick}
      className={`${sizes} ${variants} rounded-xl transition focus:outline-none focus:ring-2 focus:ring-indigo-400 ${className}`}
    >
      {children}
    </button>
  );
}

// «کارت» ساده
function SCard({
  title,
  icon,
  children,
  className = "",
}: {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}>
      {(title || icon) && (
        <div className="p-5 flex items-center gap-3">
          {icon}
          {title && <h3 className="font-bold text-gray-900">{title}</h3>}
        </div>
      )}
      <div className={`${title || icon ? "pt-0" : ""} p-5`}>{children}</div>
    </div>
  );
}

export default function PakanavisKeyboardLandingV2() {
  const [store, setStore] = useState<StoreKey>("apk");

  const currentUrl = useMemo(() => {
    const key = STORE_META[store].urlKey;
    return APP[key] as string;
  }, [store]);

  // استفاده از سرویس عمومی QR. اگر خودت نمی‌خوای بیرونی باشه، بعداً لینک QR داخلی یا فایل استاتیک SVG بذار.
  const qrSrc = useMemo(() => {
    const encoded = encodeURIComponent(currentUrl || "");
    // ابعاد را می‌توانی تغییر دهی. margin=0 برای لبه‌های تمیز.
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&data=${encoded}`;
    // جایگزین: Google Charts API
    // return `https://chart.googleapis.com/chart?cht=qr&chs=240x240&chl=${encoded}`;
  }, [currentUrl]);

  const openDownload = () => {
    if (!currentUrl || currentUrl.startsWith("#")) return;
    window.open(currentUrl, "_blank");
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen w-full bg-white text-gray-800"
    >
      {/* BG Pattern */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* شبکه نقطه‌ای لطیف */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(#000 1px, transparent 1px), radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px",
          }}
        />
        {/* لکه‌های گرادیانی */}
        <div className="absolute -top-28 -left-24 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute top-[40%] -right-24 h-72 w-72 rounded-full bg-fuchsia-300/30 blur-3xl" />
      </div>

      {/* هدر کاملاً تازه */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-100 grid place-items-center border border-indigo-200">
              <KeyboardIcon className="h-5 w-5 text-indigo-700" />
            </div>
            <div className="leading-tight">
              <div className="font-bold">{APP.name}</div>
              <div className="text-xs text-gray-500">سریع | هوشمند | تمیز</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-sm">
            <a href="#qr" className="hover:text-gray-900">دانلود با QR</a>
            <a href="#features" className="hover:text-gray-900">ویژگی‌ها</a>
            <a href="#install" className="hover:text-gray-900">مراحل نصب</a>
            <a href="#about" className="hover:text-gray-900">معرفی</a>
            <a href="#privacy" className="hover:text-gray-900">حریم خصوصی</a>
          </nav>

          <Btn size="sm" onClick={openDownload} className="hidden md:block">
            <span className="inline-flex items-center gap-2">
              <Download className="h-4 w-4" />
              دانلود مستقیم
            </span>
          </Btn>
        </div>
      </header>

      {/* Hero تازه با تمرکز روی QR */}
      <section id="qr" className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-12 items-center">
          {/* متن سمت راست (در RTL: ستون اول) */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900"
            >
              تایپ فارسیِ تمیز، بی‌دردسر
            </motion.h1>
            <p className="mt-4 text-lg leading-8 text-gray-700">
              {APP.name} با اصلاح املایی، نگارشی و نشانه‌گذاری در لحظه، نوشتار شما را
              در همهٔ اپ‌ها تمیز و حرفه‌ای می‌کند—بدون ارسال متن‌ها به سرور.
            </p>

            {/* انتخاب فروشگاه + دکمه دانلود */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex rounded-2xl border border-gray-200 bg-white p-1">
                {(Object.keys(STORE_META) as StoreKey[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setStore(k)}
                    className={`px-3 md:px-4 py-1.5 text-sm rounded-xl transition ${
                      store === k ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {STORE_META[k].label}
                  </button>
                ))}
              </div>
              <Btn size="lg" onClick={openDownload} className="shadow">
                <span className="inline-flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  نصب {APP.version}
                </span>
              </Btn>
            </div>

            {/* متادیتا */}
            <ul className="mt-5 text-sm text-gray-600 flex flex-wrap gap-x-6 gap-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                آخرین بروزرسانی: {APP.lastUpdate}
              </li>
              <li className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-indigo-600" />
                حداقل: {APP.minAndroid}
              </li>
              <li className="flex items-center gap-2">
                <Download className="h-4 w-4 text-indigo-600" />
                حجم: {APP.size}
              </li>
            </ul>
          </div>

          {/* کارت QR بزرگ (ستون دوم) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <SCard
              title={
                <span className="inline-flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-indigo-700" />
                  دانلود فوری با QR
                </span>
              }
              icon={null}
              className="relative"
            >
              <div className="grid grid-cols-[1fr_auto] items-center gap-6">
                <div className="space-y-3 text-sm text-gray-700 leading-7">
                  <div className="inline-flex items-center gap-2 text-gray-900 font-medium">
                    لینک فعلی:
                    <span className="truncate max-w-[22ch] text-indigo-700" title={currentUrl}>
                      {currentUrl || "—"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    ({STORE_META[store].hint}) — دوربین گوشی را روی QR بگیرید یا با دکمهٔ بالا دانلود کنید.
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs">No ads</span>
                    <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs">Offline core</span>
                    <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs">Privacy-first</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <div className="rounded-2xl border border-gray-200 p-3 bg-white">
                    {/* تصویر QR از سرویس عمومی */}
                    <img
                      src={qrSrc}
                      alt="QR برای دانلود کیبورد پاک‌نویس"
                      className="h-56 w-56 object-contain"
                      width={224}
                      height={224}
                    />
                  </div>
                </div>
              </div>
            </SCard>
          </motion.div>
        </div>
      </section>

      {/* ویژگی‌ها: چیدمان خطّ زمانی افقی */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">چرا پاک‌نویس؟</h2>
        <div className="overflow-x-auto">
          <ol className="flex min-w-[720px] items-stretch gap-4">
            {[
              {
                icon: <WandSparkles className="h-5 w-5 text-indigo-700" />,
                title: "اصلاح آنی",
                desc: "املا، نیم‌فاصله، نشانه‌گذاری—حین تایپ اصلاح می‌شود.",
              },
              {
                icon: <ReplaceAll className="h-5 w-5 text-indigo-700" />,
                title: "هوشمند و روان",
                desc: "پیشنهادهای دقیق بدون مزاحمت، با یادگیری از عادت‌های شما.",
              },
              {
                icon: <ShieldCheck className="h-5 w-5 text-indigo-700" />,
                title: "حریم خصوصی",
                desc: "هیچ متنی به سرور نمی‌رود مگر با رضایت صریح شما.",
              },
              {
                icon: <Globe className="h-5 w-5 text-indigo-700" />,
                title: "سازگار با همه‌جا",
                desc: "پیام‌رسان‌ها، شبکه‌های اجتماعی، مرورگرها و فرم‌های وب.",
              },
              {
                icon: <Zap className="h-5 w-5 text-indigo-700" />,
                title: "پرسرعت و سبک",
                desc: "پاسخ‌گویی سریع کلیدها و مصرف باتری پایین.",
              },
              {
                icon: <Languages className="h-5 w-5 text-indigo-700" />,
                title: "چندزبانه",
                desc: "با تمرکز ویژه روی فارسی و چینش استاندارد.",
              },
            ].map((f, i) => (
              <li key={i} className="flex-1">
                <div className="h-full rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100">
                    {f.icon}
                  </div>
                  <div className="mt-3 font-semibold text-gray-900">{f.title}</div>
                  <p className="text-sm text-gray-700 leading-7">{f.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* مراحل نصب: استپ‌های افقی با آیکون */}
      <section id="install" className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">مراحل نصب سریع</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            {
              title: "دانلود و نصب",
              desc: "از یکی از فروشگاه‌ها یا APK مستقیم.",
              icon: <Download className="h-5 w-5 text-indigo-700" />,
            },
            {
              title: "فعال‌سازی",
              desc: "Settings → System → Languages & input.",
              icon: <Smartphone className="h-5 w-5 text-indigo-700" />,
            },
            {
              title: "انتخاب پیش‌فرض",
              desc: "On-screen keyboard → Manage keyboards.",
              icon: <TypeIcon className="h-5 w-5 text-indigo-700" />,
            },
            {
              title: "آمادهٔ استفاده",
              desc: "کلید نیم‌فاصله و نشانه‌گذاری سریع را تست کن.",
              icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
            },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100">
                {s.icon}
              </div>
              <div className="mt-3 font-semibold text-gray-900">{i + 1}. {s.title}</div>
              <p className="text-sm text-gray-700 leading-7">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* معرفی محصول: متن ارسالی شما در چیدمان جدید */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-10">
        <SCard
          title={
            <span className="inline-flex items-center gap-2">
              <KeyboardIcon className="h-5 w-5 text-indigo-700" />
              معرفی کوتاه محصول
            </span>
          }
        >
          <p className="text-sm text-gray-700 leading-8">
            <strong>کیبورد اندروید پاکنویس؛ تازه و در حال پی یشفت</strong><br />
            کیبورد اندروید پاکنویس یک محصول جدید و نوآورانه در زمینه تایپ فارسی است که تجربهای
            گوسیی روان و هوشمند از نوش ر نت در و تبلت ارائه میدهد. این کیبورد هماکنون قابلیت تصحیح
            خطاهای املا یب رسیی و نگا و پیشنهاد برای یب املا کلمات را دارد، اما با توجه به فناوری درحالرشد
            آن، امکانات بیش رتی در آینده به آن اضافه خواهد شد تا تجربه کاربری بهینهتر و پی یشفتهتری
            ارائه کند. هدف ما این است که با بهروزرسا نبهای منظم، کیبورد پاکنویس را به یک ابزار کامل و حرفهای
            برای همه کاربران فارسیزبان تبدیل کنیم.
          </p>
        </SCard>
      </section>

      {/* حریم خصوصی خلاصه */}
      <section id="privacy" className="mx-auto max-w-7xl px-4 pb-20">
        <SCard
          title={
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-indigo-700" />
              حریم خصوصی (خلاصه)
            </span>
          }
        >
          <ul className="list-disc pr-5 space-y-2 text-sm text-gray-700 leading-8">
            <li>حالت آفلاین کامل برای اصلاحات پایه؛ بدون اینترنت.</li>
            <li>گزینهٔ ارسال ناشناس Crash/Telemetry فقط با رضایت شما.</li>
            <li>متن‌های تایپ‌شده به‌صورت پیش‌فرض ذخیره یا ارسال نمی‌شوند.</li>
          </ul>
          <a
            href={APP.privacyUrl}
            className="inline-flex items-center gap-2 mt-4 text-indigo-700 hover:underline"
          >
            سیاست کامل حریم خصوصی
          </a>
        </SCard>
      </section>

      {/* نوار شناور پایینی برای CTA سریع */}
      <div className="fixed bottom-4 inset-x-4 md:inset-x-6 lg:inset-x-8 z-30">
        <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white/90 backdrop-blur shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center gap-3 p-3 md:p-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-indigo-100 border border-indigo-200 grid place-items-center">
                <Download className="h-4 w-4 text-indigo-700" />
              </div>
              <div className="text-sm">
                <div className="font-semibold text-gray-900">دانلود سریع {APP.version}</div>
                <div className="text-gray-600">حجم {APP.size} — حداقل {APP.minAndroid}</div>
              </div>
            </div>
            <div className="ms-auto flex items-center gap-2">
              {(Object.keys(STORE_META) as StoreKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setStore(k)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition ${
                    store === k
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                  }`}
                  title={STORE_META[k].hint}
                >
                  {STORE_META[k].label}
                </button>
              ))}
              <Btn size="sm" onClick={openDownload} className="ms-1">
                دانلود
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
