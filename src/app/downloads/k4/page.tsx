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

/** طرح: هیرو با تصویر (چپ تصویر / راست متن)، روشن و تمیز، QR سایدبار گونه در پایین هیرو **/

// --- تنظیمات کلی ---
const APP = {
  name: "کیبورد اندروید پاک‌نویس",
  version: "v1.0.0",
  size: "18 MB",
  minAndroid: "Android 8.0+ (Oreo)",
  lastUpdate: "01 Nov 2025",
  apkUrl: "https://example.com/pakanavis-keyboard.apk", // TODO
  gpUrl: "https://play.google.com/store/apps/details?id=ir.pakanavis.keyboard", // TODO
  bazaarUrl: "https://cafebazaar.ir/app/ir.pakanavis.keyboard", // TODO
  myketUrl: "https://myket.ir/app/ir.pakanavis.keyboard", // TODO
  privacyUrl: "#privacy",
};

type StoreKey = "apk" | "play" | "bazaar" | "myket";
const STORE_META: Record<StoreKey, { label: string; urlKey: keyof typeof APP; hint: string }> = {
  apk: { label: "دانلود مستقیم APK", urlKey: "apkUrl", hint: "دانلود مستقیم" },
  play: { label: "Google Play", urlKey: "gpUrl", hint: "فروشگاه رسمی گوگل" },
  bazaar: { label: "کافه‌بازار", urlKey: "bazaarUrl", hint: "بازار ایران" },
  myket: { label: "مایکت", urlKey: "myketUrl", hint: "مایکت ایران" },
};

// دکمه داخلی سبک
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
    size === "sm" ? "px-3 py-1.5 text-sm" : size === "lg" ? "px-5 py-2.5 text-base" : "px-4 py-2 text-sm";
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

// کارت ساده
function SCard({ title, icon, children, className = "" }: { title?: React.ReactNode; icon?: React.ReactNode; children?: React.ReactNode; className?: string }) {
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

export default function PakanavisKeyboardLanding_ImageHero() {
  const [store, setStore] = useState<StoreKey>("apk");

  const currentUrl = useMemo(() => {
    const key = STORE_META[store].urlKey;
    return APP[key] as string;
  }, [store]);

  // QR (سرویس عمومی). اگر نمی‌خوای بیرونی باشه، جایگزین کن با فایل استاتیک SVG خودت.
  const qrSrc = useMemo(() => {
    const encoded = encodeURIComponent(currentUrl || "");
    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&data=${encoded}`;
  }, [currentUrl]);

  const openDownload = () => {
    if (!currentUrl || currentUrl.startsWith("#")) return;
    window.open(currentUrl, "_blank");
  };

  return (
    <main dir="rtl" className="min-h-screen w-full bg-white text-gray-800">
      {/* پس‌زمینه ظریف */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(#000 1px, transparent 1px), radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 10px 10px",
          }}
        />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute top-[55%] -right-24 h-72 w-72 rounded-full bg-fuchsia-300/30 blur-3xl" />
      </div>

      {/* هدر */}
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
            <a href="#features" className="hover:text-gray-900">ویژگی‌ها</a>
            <a href="#install" className="hover:text-gray-900">نصب</a>
            <a href="#about" className="hover:text-gray-900">معرفی</a>
            <a href="#privacy" className="hover:text-gray-900">حریم خصوصی</a>
          </nav>

          <Btn size="sm" onClick={openDownload} className="hidden md:block">
            <span className="inline-flex items-center gap-2">
              <Download className="h-4 w-4" />
              دانلود
            </span>
          </Btn>
        </div>
      </header>

      {/* Hero: راست متن / چپ تصویر */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          

          {/* ستون متن (راست) */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className=""
          >
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
              تایپ فارسیِ تمیز، بی‌دردسر
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-700">
              {APP.name} با اصلاح املایی، نگارشی و نشانه‌گذاری در لحظه، متن‌های شما را
              در همهٔ اپ‌ها تمیز و حرفه‌ای می‌کند—بدون ارسال متن‌ها به سرور.
            </p>

            {/* سوئیچر فروشگاه‌ها */}
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
                  دانلود و نصب
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

            {/* باکس QR کنار CTA */}
            <div className="mt-6">
              <SCard
                title={
                  <span className="inline-flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-indigo-700" />
                    دانلود سریع با QR
                  </span>
                }
              >
                <div className="flex items-center gap-5">
                  <div className="shrink-0 rounded-2xl border border-gray-200 p-2 bg-white">
                    <img
                      src={qrSrc}
                      alt="QR برای دانلود کیبورد پاک‌نویس"
                      className="h-40 w-40 object-contain"
                      width={160}
                      height={160}
                    />
                  </div>
                  <div className="text-sm text-gray-700 leading-7">
                    دوربین گوشی را روی QR بگیر یا از دکمهٔ «دانلود و نصب» استفاده کن.
                    <div className="mt-2 text-xs text-gray-500">
                      لینک فعلی: <span className="text-indigo-700 break-all">{currentUrl || "—"}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs">بدون تبلیغ</span>
                      <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs">آفلاین</span>
                      <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs">حریم خصوصی</span>
                    </div>
                  </div>
                </div>
              </SCard>
            </div>
          </motion.div>
          {/* ستون تصویر (چپ) */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className=""
          >
            {/* جایگزین کن با تصویر واقعی از محصول/اسکرین‌شات */}
            <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl">
              <img
                src="/images/Word.png"
                alt="پیش‌نمایش کیبورد پاک‌نویس روی موبایل"
                className="w-full h-auto object-cover"
              />
              {/* روبان نسخه */}
              <div className="absolute top-3 left-3 rounded-xl bg-white/90 backdrop-blur px-3 py-1 text-xs border border-gray-200">
                نسخه {APP.version}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ویژگی‌ها (کارت‌های ستونی) */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">چرا پاک‌نویس؟</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: WandSparkles, title: "اصلاح آنی", desc: "املا، نیم‌فاصله، نشانه‌گذاری—در لحظه." },
            { icon: ReplaceAll, title: "هوشمند و روان", desc: "پیشنهادهای دقیق مطابق عادت‌های شما." },
            { icon: ShieldCheck, title: "حریم خصوصی", desc: "هیچ متنی بدون رضایت شما ارسال نمی‌شود." },
            { icon: Globe, title: "سازگار با همه‌جا", desc: "پیام‌رسان، مرورگر، فرم‌های وب و… ." },
            { icon: Zap, title: "پرسرعت و سبک", desc: "پاسخ‌گویی سریع و مصرف پایین باتری." },
            { icon: Languages, title: "چندزبانه", desc: "تمرکز ویژه روی فارسی و چینش استاندارد." },
          ].map(({ icon: Icon, title, desc }) => (
            <SCard
              key={title}
              title={<span className="text-base">{title}</span>}
              icon={
                <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 grid place-items-center">
                  <Icon className="h-5 w-5 text-indigo-700" />
                </div>
              }
            >
              <p className="text-sm text-gray-700 leading-7">{desc}</p>
            </SCard>
          ))}
        </div>
      </section>

      {/* نصب سریع */}
      <section id="install" className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">مراحل نصب سریع</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { title: "دانلود و نصب", desc: "از فروشگاه‌ها یا APK مستقیم.", icon: <Download className="h-5 w-5 text-indigo-700" /> },
            { title: "فعال‌سازی", desc: "Settings → System → Languages & input.", icon: <Smartphone className="h-5 w-5 text-indigo-700" /> },
            { title: "پیش‌فرض کردن", desc: "On-screen keyboard → Manage keyboards.", icon: <TypeIcon className="h-5 w-5 text-indigo-700" /> },
            { title: "آمادهٔ استفاده", desc: "نیم‌فاصله و نشانه‌گذاری سریع را تست کن.", icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" /> },
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

      {/* معرفی (متن ارسالی تو) */}
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

      {/* حریم خصوصی خلاصه + لینک کامل */}
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
            <li>هستهٔ آفلاین برای اصلاحات پایه؛ بدون اینترنت.</li>
            <li>ارسال ناشناس Crash/Telemetry فقط با رضایت شما.</li>
            <li>متن‌های تایپ‌شده به‌صورت پیش‌فرض ذخیره یا ارسال نمی‌شوند.</li>
          </ul>
          <a href={APP.privacyUrl} className="inline-flex items-center gap-2 mt-4 text-indigo-700 hover:underline">
            سیاست کامل حریم خصوصی
          </a>
        </SCard>
      </section>
    </main>
  );
}
