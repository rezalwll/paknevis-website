"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Keyboard as KeyboardIcon,
  ShieldCheck,
  Sparkles,
  Zap,
  Languages,
  Smartphone,
  CheckCircle2,
  BadgeCheck,
  QrCode,
  Lock,
  Globe,
} from "lucide-react";

// ---------- داده‌های اپ ----------
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

// ---------- اجزای کوچک UI ----------

function PrimaryButton({
  children,
  onClick,
  className = "",
  size = "md",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeCls =
    size === "sm"
      ? "px-3 py-1.5 text-sm"
      : size === "lg"
      ? "px-5 py-2.5 text-base"
      : "px-4 py-2 text-sm";
  return (
    <button
      onClick={onClick}
      className={`${sizeCls} rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${className}`}
    >
      {children}
    </button>
  );
}

function SoftBadge({
  icon: Icon,
  label,
  value,
  accent = "indigo",
}: {
  icon: any;
  label: string;
  value: string;
  accent?: "indigo" | "emerald" | "purple";
}) {
  const colorMap: Record<string, string> = {
    indigo:
      "bg-indigo-50 text-indigo-700 border-indigo-200 [&_svg]:text-indigo-700",
    emerald:
      "bg-emerald-50 text-emerald-700 border-emerald-200 [&_svg]:text-emerald-700",
    purple:
      "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 [&_svg]:text-fuchsia-700",
  };
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${colorMap[accent]}`}
    >
      <div className="h-10 w-10 rounded-lg bg-white/70 grid place-items-center border border-white shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex flex-col">
        <div className="text-xs font-medium opacity-80">{label}</div>
        <div className="text-base font-bold leading-none">{value}</div>
      </div>
    </div>
  );
}

// ---------- صفحه اصلی ----------
export default function PakanavisLandingWithQR() {
  const [store, setStore] = useState<"apk" | "play" | "bazaar" | "myket">("apk");

  const openDownload = () => {
    const map = {
      apk: APP.apkUrl,
      play: APP.gpUrl,
      bazaar: APP.bazaarUrl,
      myket: APP.myketUrl,
    } as const;
    window.open(map[store], "_blank");
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen w-full bg-gradient-to-b from-white via-indigo-50/40 to-white text-gray-900"
    >
      {/* --- HERO / بالای صفحه --- */}
      <section className="relative overflow-hidden">
        {/* پس‌زمینه نرم */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-6rem] left-[-6rem] h-64 w-64 rounded-full bg-fuchsia-200/50 blur-3xl" />
          <div className="absolute bottom-[-6rem] right-[-4rem] h-72 w-72 rounded-full bg-indigo-200/60 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-10 pb-16 md:pb-24">
          {/* هدر ساده بالای سکشن، نه استیکی */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white shadow border border-gray-200 grid place-items-center">
                <KeyboardIcon className="h-5 w-5 text-indigo-700" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 leading-tight text-sm">
                  {APP.name}
                </span>
                <span className="text-[11px] text-gray-500 leading-tight">
                  نسخه {APP.version}
                </span>
              </div>
            </div>

            {/* سوئیچر استورها و CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-xl bg-white border border-gray-200 shadow-sm p-1">
                {[
                  { key: "apk", label: "APK مستقیم" },
                  { key: "play", label: "Play" },
                  { key: "bazaar", label: "بازار" },
                  { key: "myket", label: "مایکت" },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() =>
                      setStore(opt.key as "apk" | "play" | "bazaar" | "myket")
                    }
                    className={`px-3 py-1.5 text-[12px] leading-none rounded-lg transition ${
                      store === opt.key
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <PrimaryButton size="sm" onClick={openDownload}>
                <span className="inline-flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  دانلود
                </span>
              </PrimaryButton>
            </div>
          </div>

          {/* محتوای سه ستونه اصلی هیرو */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* ستون ۱: متن و ارزش پیشنهادی */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <h1 className="text-3xl md:text-4xl font-extrabold leading-[1.3] text-gray-900">
                تایپ فارسی تمیز،
                <br />
                بدون غلط و بدون خجالت.
              </h1>

              <p className="mt-4 text-gray-700 leading-8 text-sm md:text-base">
                {APP.name} متن‌های تو رو همان لحظه تمیز می‌کند:
                اصلاح املا، نگارش، نشانه‌گذاری و نیم‌فاصله. روی همهٔ اپ‌ها جواب
                می‌دهد (واتساپ، تلگرام، مرورگر و ...). بدون اینکه متن‌ات لزوماً بره
                سرور.
              </p>

              <div className="mt-6 grid gap-3 text-[13px] text-gray-600 leading-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <div>
                    تصحیح لحظه‌ای غلط‌های تایپی، لحن، و فاصله‌گذاری فارسی
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <div>کیبورد سبک، پاسخ‌گویی سریع، مناسب دستگاه‌های متوسط</div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <div>مود آفلاین + کنترل اینکه چی فرستاده بشه یا نشه</div>
                </div>
              </div>

              {/* متادیتا اپ */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <BadgeCheck className="h-4 w-4 text-indigo-600" />
                  آخرین بروزرسانی: {APP.lastUpdate}
                </span>
                <span className="flex items-center gap-1">
                  <Smartphone className="h-4 w-4 text-indigo-600" />
                  حداقل {APP.minAndroid}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="h-4 w-4 text-indigo-600" />
                  حجم {APP.size}
                </span>
              </div>
            </motion.div>

            {/* ستون ۲: QR code دانلود مستقیم */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 flex flex-col items-center text-center">
                <div className="text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg px-2 py-1 inline-flex items-center gap-1">
                  <QrCode className="h-4 w-4" />
                  نصب سریع
                </div>

                <div className="mt-4 font-bold text-gray-900 text-lg leading-7">
                  اسکن کن و همین الان نصب کن
                </div>
                <div className="text-[13px] text-gray-600 leading-6 mt-2">
                  بدون گشتن توی استور — فایل APK مستقیم.
                </div>

                {/* باکس QR (placeholder) */}
                <div className="mt-6 w-40 h-40 rounded-xl border border-gray-300 bg-white shadow-inner grid place-items-center text-gray-400 text-[10px] leading-tight font-mono">
                  QR CODE
                  <br />
                  {APP.version}
                </div>

                <div className="mt-4 text-[11px] text-gray-500 leading-5">
                  با دوربین گوشی / Google Lens باز کن
                  <br />
                  یا دکمه زیر رو بزن.
                </div>

                <PrimaryButton
                  className="w-full mt-5"
                  onClick={openDownload}
                  size="md"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    نصب {APP.version}
                  </span>
                </PrimaryButton>

                <div className="mt-3 text-[11px] text-gray-500 leading-5">
                  بدون تبلیغ • بدون دسترسی ناخواسته
                </div>
              </div>
            </motion.div>

            {/* ستون ۳: پیش‌نمایش کیبورد / نمونه اصلاح متن */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="order-3 lg:order-3"
            >
              {/* قاب موبایل ساده */}
              <div className="mx-auto w-full max-w-[320px]">
                <div className="rounded-3xl border border-gray-300 bg-white shadow-xl overflow-hidden">
                  <div className="bg-gray-100 text-center text-[11px] text-gray-500 py-2 border-b border-gray-200">
                    پیش‌نمایش کیبورد
                  </div>
                  <div className="p-4 text-[13px] leading-7 text-gray-700 space-y-3">
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                      <span className="opacity-70">من: </span>
                      لطفا ادرس رو بفرست
                      <span className="opacity-70"> — پاک‌نویس:</span> لطفاً
                      آدرس را بفرست.
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                      <span className="opacity-70">من: </span>
                      سلام وقت بخیر مرسی از پیام تون
                      <span className="opacity-70"> — پاک‌نویس:</span> سلام،
                      وقت‌به‌خیر؛ مرسی از پیام‌تان.
                    </div>
                  </div>
                </div>

                {/* معرفی محصول (متنی که دادی) */}
                <div className="mt-4 text-[12px] leading-7 text-gray-600 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                  <div className="font-semibold text-gray-900 text-sm mb-1">
                    کیبورد اندروید پاکنویس؛ تازه و در حال پی‌یشفت
                  </div>
                  <p>
                    کیبورد اندروید پاکنویس یک محصول جدید و نوآورانه در زمینه
                    تایپ فارسی است که تجربه‌ای روان و هوشمند از نوشتن در
                    گوشی و تبلت ارائه می‌دهد. این کیبورد هم‌اکنون قابلیت تصحیح
                    خطاهای املایی و نگارشی و پیشنهاد برای املا کلمات را دارد،
                    اما با توجه به فناوری در حال رشد آن، امکانات بیشتری در آینده
                    به آن اضافه خواهد شد تا تجربه کاربری بهینه‌تر و
                    پیشرفته‌تری ارائه کند. هدف ما این است که با
                    به‌روزرسانی‌های منظم، کیبورد پاکنویس را به یک ابزار کامل و
                    حرفه‌ای برای همه کاربران فارسی‌زبان تبدیل کنیم.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- سوشال پروف / باج‌ها و اعتماد --- */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-4">
          <SoftBadge
            icon={Download}
            label="نصب فعال"
            value="+50,000"
            accent="indigo"
          />
          <SoftBadge
            icon={Zap}
            label="تاخیر لمس کلید"
            value="~18ms"
            accent="emerald"
          />
          <SoftBadge
            icon={ShieldCheck}
            label="رضایت کلی"
            value="4.8 / 5"
            accent="purple"
          />
        </div>
      </section>

      {/* --- ویژگی‌ها به شکل استپ/تایم‌لاین عمودی --- */}
      <section id="features" className="mx-auto max-w-7xl px-4 pb-20">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
          چرا این کیبورد با بقیه فرق دارد؟
        </h2>

        <ol className="relative border-r border-gray-200 pr-6 space-y-10 text-sm leading-7 text-gray-700">
          {/* node 1 */}
          <li className="relative">
            <div className="absolute -right-[34px] top-0 flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-lg">
              ۱
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-indigo-600 shrink-0" />
              <div>
                <div className="font-bold text-gray-900 text-base mb-1">
                  تصحیح هوشمند املایی و نگارشی
                </div>
                <div className="text-gray-700">
                  فاصله‌گذاری، نیم‌فاصله، و نشانه‌گذاری را همان لحظه مرتب
                  می‌کند، مثل اینکه یه ویراستار جدی نشسته روی شونه‌ات.
                </div>
              </div>
            </div>
          </li>

          {/* node 2 */}
          <li className="relative">
            <div className="absolute -right-[34px] top-0 flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-lg">
              ۲
            </div>
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-indigo-600 shrink-0" />
              <div>
                <div className="font-bold text-gray-900 text-base mb-1">
                  کار کردن در همهٔ اپ‌ها
                </div>
                <div className="text-gray-700">
                  پیام‌رسان، مرورگر، فرم ثبت‌نام، کپشن اینستاگرام، هرجا
                  تایپ می‌کنی.
                </div>
              </div>
            </div>
          </li>

          {/* node 3 */}
          <li className="relative">
            <div className="absolute -right-[34px] top-0 flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-lg">
              ۳
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-indigo-600 shrink-0" />
              <div>
                <div className="font-bold text-gray-900 text-base mb-1">
                  کنترل حریم خصوصی
                </div>
                <div className="text-gray-700">
                  متن تایپ‌شده‌ات پیش‌فرض جایی ذخیره نمی‌شود. حالت آفلاین
                  هم هست که حتی به اینترنت هم نیاز نداشته باشی.
                </div>
              </div>
            </div>
          </li>

          {/* node 4 */}
          <li className="relative">
            <div className="absolute -right-[34px] top-0 flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-lg">
              ۴
            </div>
            <div className="flex items-start gap-3">
              <Languages className="h-5 w-5 text-indigo-600 shrink-0" />
              <div>
                <div className="font-bold text-gray-900 text-base mb-1">
                  تمرکز واقعی روی فارسی
                </div>
                <div className="text-gray-700">
                  چینش استاندارد فارسی، عدد فارسی/عربی، و تایپ لاتین همزمان.
                  نیم‌فاصله جدا دارد. تو برای تایپ فارسی اذیت نمی‌شی.
                </div>
              </div>
            </div>
          </li>

          {/* node 5 */}
          <li className="relative">
            <div className="absolute -right-[34px] top-0 flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-lg">
              ۵
            </div>
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-indigo-600 shrink-0" />
              <div>
                <div className="font-bold text-gray-900 text-base mb-1">
                  مود آفلاین + حداقل مصرف
                </div>
                <div className="text-gray-700">
                  سبک و کم‌مصرف، برای گوشی‌های معمولی هم بدون لگ. این یعنی
                  حتی رو گوشی مامان‌جان هم باید روون باشه.
                </div>
              </div>
            </div>
          </li>
        </ol>
      </section>

      {/* --- راه‌اندازی سریع (4 مرحله مربعی) --- */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
          راه‌اندازی در چهار قدم
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm leading-7 text-gray-700">
          {[
            {
              step: "۱",
              title: "دانلود و نصب",
              body: "فایل APK را نصب کن یا از پلی/بازار/مایکت بگیر.",
            },
            {
              step: "۲",
              title: "فعال‌سازی",
              body: "برو به Settings → System → Languages & input → On-screen keyboard → Manage keyboards و پاک‌نویس رو روشن کن.",
            },
            {
              step: "۳",
              title: "کیبورد پیش‌فرض",
              body: "همان‌جا یا از پایین صفحه تایپ، پاک‌نویس رو به کیبورد اصلی گوشی انتخاب کن.",
            },
            {
              step: "۴",
              title: "شخصی‌سازی",
              body: "کلید نیم‌فاصله، استایل، و حالت Performance رو از بخش تنظیمات داخل خود کیبورد ست کن.",
            },
          ].map((b) => (
            <div
              key={b.step}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 flex flex-col"
            >
              <div className="text-xs text-indigo-700 font-medium bg-indigo-50 border border-indigo-200 rounded-lg w-fit px-2 py-1 mb-3">
                قدم {b.step}
              </div>
              <div className="font-bold text-gray-900 mb-2">{b.title}</div>
              <div className="text-gray-700">{b.body}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-500 leading-6">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            تم روشن/تیره
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            کلید نیم‌فاصله اختصاصی
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            عدم ارسال متن بدون اجازه
          </div>
        </div>
      </section>

      {/* --- حریم خصوصی / فوتر --- */}
      <footer
        id="privacy"
        className="bg-white border-t border-gray-200 text-gray-700 text-sm leading-7"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 grid lg:grid-cols-3 gap-10">
          {/* ستون اول: حریم خصوصی */}
          <div>
            <div className="flex items-center gap-2 text-gray-900 font-bold mb-3">
              <ShieldCheck className="h-5 w-5 text-indigo-600" />
              <span>حریم خصوصی و دسترسی‌ها</span>
            </div>
            <ul className="list-disc pr-5 space-y-2 text-[13px] text-gray-700 leading-6">
              <li>
                متن تایپ‌شده شما پیش‌فرض ذخیره یا ارسال نمی‌شود، مگر قابلیت‌های
                ابریِ اختیاری را روشن کنید.
              </li>
              <li>
                حالت آفلاین اجازه می‌دهد بدون اینترنت هم از اصلاح پایه استفاده
                کنی.
              </li>
              <li>
                ارسال گزارش کرش (Crash/Telemetry) فقط با رضایت خودت انجام
                می‌شود و به‌صورت ناشناس است.
              </li>
            </ul>
            <a
              href={APP.privacyUrl}
              className="inline-block mt-4 text-indigo-700 hover:underline text-[13px] font-medium"
            >
              سیاست حریم خصوصی
            </a>
          </div>

          {/* ستون دوم: اطلاعات فنی کوتاه */}
          <div>
            <div className="font-bold text-gray-900 mb-3">
              اطلاعات فنی فعلی
            </div>
            <div className="text-[13px] text-gray-700 leading-6 space-y-2">
              <div className="flex items-start gap-2">
                <Smartphone className="h-4 w-4 text-indigo-600 shrink-0" />
                <div>
                  حداقل اندروید:{" "}
                  <span className="font-medium text-gray-900">
                    {APP.minAndroid}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Download className="h-4 w-4 text-indigo-600 shrink-0" />
                <div>
                  حجم نصب:{" "}
                  <span className="font-medium text-gray-900">{APP.size}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <BadgeCheck className="h-4 w-4 text-indigo-600 shrink-0" />
                <div>
                  آخرین بروزرسانی:{" "}
                  <span className="font-medium text-gray-900">
                    {APP.lastUpdate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ستون سوم: CTA آخر */}
          <div>
            <div className="font-bold text-gray-900 mb-3">
              همین الان تستش کن
            </div>
            <div className="text-[13px] text-gray-700 leading-6">
              توی هر اپ یه جمله شلخته بنویس، ببین پاک‌نویس چطور تمیزش می‌کنه.
              وقتی می‌بینی جمله‌ات یهویی رسمی و درست شد، می‌فهمی چقدر تا حالا
              متن‌هات ضعیف دیده شده.
            </div>

            <div className="mt-5 flex flex-col items-stretch gap-3">
              <PrimaryButton onClick={openDownload} size="md">
                <span className="inline-flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  دانلود و نصب ({APP.version})
                </span>
              </PrimaryButton>

              {/* QR کوچک تکراری در فوتر */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg border border-gray-300 bg-white shadow-inner grid place-items-center text-[9px] text-gray-400 leading-tight font-mono">
                  QR
                  <br />
                  APK
                </div>
                <div className="text-[11px] leading-5 text-gray-600">
                  اسکن با گوشی
                  <br />
                  یا کلیک روی دکمه دانلود
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* خط پایین حقوق */}
        <div className="border-t border-gray-200 text-[11px] text-gray-500 py-4 text-center">
          © 2025 Pakanavis — همهٔ حقوق محفوظ است.
        </div>
      </footer>
    </main>
  );
}
