"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  ShieldCheck,
  Keyboard as KeyboardIcon,
  Sparkles,
  Globe,
  Zap,
  Lock,
  CheckCircle2,
  BadgeCheck,
  Languages,
  Smartphone,
  Star,
} from "lucide-react";

// ====== Mini UI (بدون وابستگی خارجی) ======
function Btn({
  children,
  onClick,
  size = "md",
  variant = "primary",
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
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
      ? "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
      : "text-gray-700 hover:bg-gray-100";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${sizes} ${variants} rounded-xl transition focus:outline-none focus:ring-2 focus:ring-indigo-400 ${className}`}
    >
      {children}
    </button>
  );
}

function Card({
  children,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: any;
}) {
  return (
    <As
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </As>
  );
}

function CardHeader({ children, className = "" }: any) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}
function CardTitle({ children, className = "" }: any) {
  return <h3 className={`font-bold text-gray-900 ${className}`}>{children}</h3>;
}
function CardContent({ children, className = "" }: any) {
  return <div className={`p-5 pt-0 ${className}`}>{children}</div>;
}

function Accordion({
  items,
  type = "single",
}: {
  items: { id: string; q: string; a: string }[];
  type?: "single" | "multiple";
}) {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const toggle = (id: string) => {
    if (type === "single") {
      setOpenIds((cur) => (cur.includes(id) ? [] : [id]));
    } else {
      setOpenIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
    }
  };
  return (
    <div className="rounded-2xl border border-gray-200 bg-white divide-y divide-gray-200">
      {items.map((it) => {
        const open = openIds.includes(it.id);
        return (
          <div key={it.id}>
            <button
              onClick={() => toggle(it.id)}
              className="w-full text-right px-5 py-4 font-medium text-gray-900 flex items-center justify-between"
            >
              <span>{it.q}</span>
              <svg
                className={`h-5 w-5 transition ${open ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="none"
              >
                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <div
              className={`px-5 pb-4 text-gray-700 leading-8 ${open ? "block" : "hidden"}`}
            >
              {it.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- تنظیمات کلی ---
const APP = {
  name: "کیبورد اندروید پاک‌نویس",
  slug: "pakanavis-keyboard",
  version: "v1.0.0",
  size: "18 MB",
  minAndroid: "Android 8.0+ (Oreo)",
  lastUpdate: "01 Nov 2025",
  apkUrl: "https://example.com/pakanavis-keyboard.apk", // TODO
  gpUrl: "https://play.google.com/store/apps/details?id=ir.pakanavis.keyboard", // TODO
  bazaarUrl: "https://cafebazaar.ir/app/ir.pakanavis.keyboard", // TODO
  myketUrl: "https://myket.ir/app/ir.pakanavis.keyboard", // TODO
  privacyUrl: "#privacy",
  changelogUrl: "#changelog",
};

export default function PakanavisKeyboardDownloadPage() {
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
    <div dir="rtl" className="min-h-screen w-full bg-gradient-to-b from-white via-indigo-50/50 to-white text-gray-800">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-indigo-100 grid place-items-center border border-indigo-200">
              <KeyboardIcon className="h-5 w-5 text-indigo-700" />
            </div>
            <span className="font-bold tracking-tight">{APP.name}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900">ویژگی‌ها</a>
            <a href="#how" className="hover:text-gray-900">نصب و راه‌اندازی</a>
            <a href="#privacy" className="hover:text-gray-900">حریم خصوصی</a>
            <a href="#faq" className="hover:text-gray-900">سوالات متداول</a>
          </nav>
          <div className="flex items-center gap-3">
            <Btn size="sm" onClick={openDownload}>
              <span className="inline-flex items-center gap-2">
                <Download className="h-4 w-4" /> دانلود
              </span>
            </Btn>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* پس‌زمینه لطیف */}
        <div className="absolute inset-0 -z-10 opacity-60">
          <div className="absolute -top-20 -left-24 h-64 w-64 bg-fuchsia-200/60 blur-3xl rounded-full" />
          <div className="absolute top-10 right-10 h-72 w-72 bg-indigo-200/70 blur-3xl rounded-full" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900"
            >
              تایپ فارسی بدون غلط —
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-indigo-600"> سریع، هوشمند، تمیز</span>
            </motion.h1>

            {/* باکس معرفی: متن ارسالی شما */}
            <Card className="mt-5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  معرفی کوتاه محصول
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-8 text-gray-700">
                <p>
                  <strong>کیبورد اندروید پاکنویس؛ تازه و در حال پی یشفت</strong><br />
                  کیبورد اندروید پاکنویس یک محصول جدید و نوآورانه در زمینه تایپ فارسی است که تجربهای
                  گوسیی روان و هوشمند از نوش ر نت در و تبلت ارائه میدهد. این کیبورد هماکنون قابلیت تصحیح
                  خطاهای املا یب رسیی و نگا و پیشنهاد برای یب املا کلمات را دارد، اما با توجه به فناوری درحالرشد آن،
                  امکانات بیش رتی در آینده به آن اضافه خواهد شد تا تجربه کاربری بهینهتر و پی یشفتهتری ارائه کند.
                  هدف ما این است که با بهروزرسا نبهای منظم، کیبورد پاکنویس را به یک ابزار کامل و حرفهای برای همه کاربران فارسیزبان تبدیل کنیم.
                </p>
              </CardContent>
            </Card>

            {/* Download Switcher */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex rounded-2xl border border-gray-200 bg-white p-1">
                {([
                  { key: "apk", label: "دانلود مستقیم APK" },
                  { key: "play", label: "Google Play" },
                  { key: "bazaar", label: "کافه‌بازار" },
                  { key: "myket", label: "مایکت" },
                ] as const).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setStore(key)}
                    className={`px-3 md:px-4 py-1.5 text-sm rounded-xl transition ${
                      store === key
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <Btn size="lg" onClick={openDownload} className="shadow">
                <span className="inline-flex items-center gap-2">
                  <Download className="h-5 w-5" /> دریافت {APP.version}
                </span>
              </Btn>
            </div>

            {/* Meta */}
            <ul className="mt-5 text-sm text-gray-600 flex flex-wrap gap-x-6 gap-y-2">
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-indigo-600" /> آخرین بروزرسانی: {APP.lastUpdate}
              </li>
              <li className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-indigo-600" /> حداقل: {APP.minAndroid}
              </li>
              <li className="flex items-center gap-2">
                <Download className="h-4 w-4 text-indigo-600" /> حجم: {APP.size}
              </li>
            </ul>
          </div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="relative"
          >
            <div className="relative mx-auto w-[320px] md:w-[360px] aspect-[9/19.5] rounded-[3rem] border border-gray-200 bg-white shadow-xl overflow-hidden">
              <div className="absolute inset-x-0 top-2 mx-auto h-6 w-28 rounded-full bg-gray-200" />
              {/* اسکرین‌شات‌های فرضی */}
              <div className="h-full w-full grid place-items-center">
                <div className="w-[85%] h-[85%] rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,.1),transparent_60%),linear-gradient(135deg,rgba(167,139,250,.08),rgba(236,72,153,.08))] border border-gray-200 p-4">
                  <div className="text-center text-sm text-gray-700">
                    پیش‌نمایش رابط کیبورد
                    <div className="mt-3 rounded-xl p-3 bg-gray-50 text-right leading-7 border border-gray-200">
                      <span className="opacity-70">من: </span>
                      سلام وقت بخیر، مرسی از پیام‌تون. <span className="opacity-70">— پاک‌نویس:</span> سلام، وقت‌به‌خیر؛ مرسی از پیام‌تان.
                    </div>
                    <div className="mt-3 rounded-xl p-3 bg-gray-50 text-right leading-7 border border-gray-200">
                      <span className="opacity-70">من: </span>
                      لطفا ادرس رو بفرست. <span className="opacity-70">— پاک‌نویس:</span> لطفاً آدرس را بفرست.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center text-xs text-gray-500">
              * در نسخهٔ نهایی، تصاویر واقعی اسکرین‌شات‌ها جایگزین می‌شوند.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Sparkles, title: "اصلاح املایی و نگارشی آنی", desc: "پیشنهاد واژهٔ درست، فاصله‌گذاری، نیم‌فاصله و نشانه‌گذاری مناسب در لحظه." },
            { icon: Globe, title: "هماهنگ با همهٔ اپ‌ها", desc: "کارکرد پایدار در پیام‌رسان‌ها، شبکه‌های اجتماعی، مرورگر و فرم‌های وب." },
            { icon: ShieldCheck, title: "حریم خصوصیِ سخت‌گیرانه", desc: "هیچ متنی به سرور ارسال نمی‌شود مگر با اجازهٔ صریح شما." },
            { icon: Zap, title: "سبک و سریع", desc: "مصرف کم باتری و پاسخ‌گویی تندِ کلیدها روی دستگاه‌های متوسط." },
            { icon: Languages, title: "چندزبانه با تمرکز بر فارسی", desc: "چینش استاندارد فارسی، اعداد فارسی/عربی و حروف لاتین." },
            { icon: Lock, title: "مود آفلاین", desc: "ویرایش پایه به‌صورت کاملاً آفلاین برای زمان‌های بدون اینترنت." },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title}>
              <CardHeader className="flex-row items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 grid place-items-center border border-indigo-100">
                  <Icon className="h-5 w-5 text-indigo-700" />
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 leading-7">{desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Demo / CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-4">
        <Card className="bg-gradient-to-r from-indigo-50 to-fuchsia-50">
          <CardHeader>
            <CardTitle>یک متن مشکل‌دار بنویس… پاک‌نویس تمیز تحویل می‌دهد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-4 text-gray-700 text-sm leading-8 border border-gray-200">
                سلام خسته نباشید اگه امکانش هست برام بفرست مرسی — (نمونه ورودی)
              </div>
              <div className="rounded-2xl bg-white p-4 text-gray-900 text-sm leading-8 border border-gray-200">
                سلام، خسته نباشید. اگر امکانش هست، برایم بفرست. ممنون.
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Btn onClick={openDownload}>
                <span className="inline-flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  دانلود و نصب
                </span>
              </Btn>
              <span className="text-xs text-gray-600">
                بدون تبلیغ | بدون جمع‌آوری متن تایپ‌شده
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How to install */}
      <section id="how" className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">راهنمای نصب و فعال‌سازی کیبورد</h2>
            <ol className="mt-6 space-y-4 text-gray-700 leading-8 list-decimal pr-4">
              <li>فایل APK را دانلود و نصب کنید یا از فروشگاه‌های معتبر (پلی، بازار، مایکت) نصب نمایید.</li>
              <li>
                به <b>Settings → System → Languages &amp; input → On-screen keyboard → Manage keyboards</b> بروید.
              </li>
              <li>«{APP.name}» را فعال کنید و آن را به کیبورد پیش‌فرض تبدیل کنید.</li>
              <li>برای تنظیمات، آیکون کیبورد را در نوار پایین لمس کنید یا از داخل اپ وارد شوید.</li>
            </ol>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-gray-600">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> پشتیبانی از تم روشن/تیره
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> کلید نیم‌فاصله و نشانه‌گذاری سریع
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> حروف‌چینی استاندارد فارسی
              </span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>سطوح دسترسی و حریم خصوصی</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 text-sm leading-8">
              <ul className="list-disc pr-5 space-y-3">
                <li>امکان کارکرد آفلاین بدون نیاز به اینترنت (قابل فعال/غیرفعال‌سازی).</li>
                <li>گزینهٔ ارسال ناشناس کرش/تله‌متری با رضایت کاربر.</li>
                <li>متن‌های تایپ‌شده ذخیره یا ارسال نمی‌شوند مگر برای قابلیت‌های ابریِ اختیاری.</li>
              </ul>
              <a
                href={APP.privacyUrl}
                className="inline-flex items-center gap-2 mt-4 text-indigo-700 hover:underline"
              >
                <ShieldCheck className="h-4 w-4" /> سیاست حریم خصوصی
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ratings / Social Proof */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "میانگین امتیاز کاربران", value: "4.8/5", icon: Star },
            { label: "نصب فعال", value: "+50,000", icon: Download },
            { label: "تاخیر لمس کلید", value: "~18ms", icon: Zap },
          ].map(({ label, value, icon: Icon }) => (
            <Card key={label}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <div className="text-gray-600 text-sm">{label}</div>
                  <div className="text-2xl font-bold mt-1 text-gray-900">{value}</div>
                </div>
                <div className="h-11 w-11 rounded-xl bg-indigo-50 grid place-items-center border border-indigo-100">
                  <Icon className="h-5 w-5 text-indigo-700" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">سوالات متداول</h2>
        <Accordion
          items={[
            {
              id: "1",
              q: "چرا کیبورد دسترسی «Full Access» می‌خواهد؟",
              a: "این دسترسی برای ویژگی‌های آنلاین اختیاری (مانند همگام‌سازی واژگان) است؛ می‌توانید آن را غیرفعال کنید و قابلیت‌های آفلاین همچنان فعال می‌مانند.",
            },
            {
              id: "2",
              q: "آیا داده‌های من ذخیره می‌شود؟",
              a: "به‌صورت پیش‌فرض ذخیره یا ارسال نمی‌شود. تنها در صورت فعال‌سازی امکانات ابری، داده‌ها ناشناس و رمزگذاری‌شده پردازش می‌شوند.",
            },
            {
              id: "3",
              q: "چطور نیم‌فاصله را سریع وارد کنم؟",
              a: "کلید اختصاصی نیم‌فاصله در ردیف پایین قرار دارد؛ نگه‌داشتن فاصله نیز نیم‌فاصله می‌گذارد (از تنظیمات قابل تغییر است).",
            },
            {
              id: "4",
              q: "اگر لگ یا تاخیر داشتم چه کنم؟",
              a: "Performance Mode را فعال کنید و واژه‌نامه‌های غیرضروری را غیرفعال نمایید. در صورت تداوم، گزارش کرش را ارسال کنید.",
            },
          ]}
          type="single"
        />
      </section>

      {/* Changelog & Footer */}
      <section id="changelog" className="mx-auto max-w-7xl px-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>تغییرات نسخه ({APP.version})</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 leading-8">
            <ul className="list-disc pr-5 space-y-2">
              <li>بهبود هوش اصلاح نشانه‌گذاری و نیم‌فاصله</li>
              <li>کاهش مصرف رم در دستگاه‌های ضعیف</li>
              <li>رفع باگ جابجایی نشانگر در برخی اپ‌ها</li>
            </ul>
          </CardContent>
        </Card>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <a href={APP.privacyUrl} className="hover:text-gray-900">
              سیاست حریم خصوصی
            </a>
            <span>•</span>
            <a href="#support" className="hover:text-gray-900">
              پشتیبانی
            </a>
          </div>
          <div>© 2025 Pakanavis — همهٔ حقوق محفوظ است.</div>
        </div>
      </section>
    </div>
  );
}
