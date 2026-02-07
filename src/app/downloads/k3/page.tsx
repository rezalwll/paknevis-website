import Image from "next/image";
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
export default function ChromeExtensionDownloadPage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-white text-gray-800 [--brand:#0ea5e9]"
    >

      <section
        dir="rtl"
        className="
        bg-[color:var(--pn-bg)]
        text-[color:var(--pn-text)]
        
      "
      >
        <div className="mx-auto max-w-5xl lg:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:gap-20 md:grid-cols-2">
            {/* متن – راست */}
            <div className="text-right space-y-5 md:space-y-6">

              <h1
                className="
                text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem]
                font-extrabold leading-snug md:leading-tight
              "
              >
                پاک‌نویس برای اندروید؛{" "}
                <span className="block mt-1">
                  تایپ فارسیِ تمیز، بی‌دردسر
                </span>
              </h1>

              <p
                className="
                text-sm sm:text-base lg:text-lg
                leading-relaxed text-[color:var(--pn-muted)]
                max-w-xl
                text-justify
              "
              >
                کیبورد اندروید پاک‌نویس با اصلاح املایی، نگارشی و نشانه‌گذاری در لحظه، متن‌های شما را در همهٔ اپ‌ها تمیز و حرفه‌ای می‌کند
              </p>

              <div className="mt-6 flex flex-wrap justify-start gap-3">
                <a
                  href="/downloads/word"
                  className=""
                >
                  <Image
                    src="/images/bazar.png"
                    alt="پاک‌نویس"
                    width={200}
                    height={200}
                    className="mt-1  shrink-0"
                  />               </a>

                <a
                  href="/downloads/chrome"
                  className=""
                >
                  <Image
                    src="/images/myket.png"
                    alt="پاک‌نویس"
                    width={207}
                    height={200}
                    className="  shrink-0"
                  />
                </a>
              </div>
            </div>

            {/* تصویر – چپ */}
            <div className="order-first md:order-none ">
              <div
                className="
                relative mx-auto
                w-full 
                
              "
              >
                <Image
                  src="/images/sds.jpg"
                  alt=""
                  fill
                  priority
                  sizes=""
                  className="object-contain scale-[2] pointer-events-none pr-20 pb-16"
                />
                <div className="relative overflow-hidden scale-80 flex items-center justify-center py-10">
                  <Image
                    src="/images/iphone.png"
                    alt=""
                    fill
                    priority
                    sizes=""
                    className="object-contain pointer-events-none absolute"
                  />
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`w-[60%] h-auto rounded-xl mx-auto  z-10 scale-90 pr-5`}
                  >
                    <source src="/images/android.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">چرا این کیبورد با بقیه فرق داره؟</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: WandSparkles, title: "اصلاح آنی", desc: "املا، نیم‌فاصله، نشانه‌گذاری." },
            { icon: ReplaceAll, title: "هوشمند و روان", desc: "پیشنهادهای دقیق مطابق رفتار شما." },
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


      </section>



      <section id="changelog" className="mx-auto max-w-7xl px-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>تغییرات آخرین نسخه</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 leading-8">
            <ul className="list-disc pr-5 space-y-2">
              <li>بهبود هوش اصلاح نشانه‌گذاری و نیم‌فاصله</li>
              <li>کاهش مصرف رم در دستگاه‌های ضعیف</li>
              <li>رفع باگ جابجایی نشانگر در برخی اپ‌ها</li>
            </ul>
          </CardContent>
        </Card>
      </section>



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
        overflow-hidden
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
            {/* Chrome watermark (خیلی محو) */}
            <div
              aria-hidden="true"
              className="
          pointer-events-none
          absolute -bottom-35 -left-10
          h-44 w-44 sm:h-52 sm:w-52
          opacity-[0.20]
          blur-[0.2px]
        "
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/icons8-android.svg"
                  alt=""
                  fill
                  sizes=""
                  className="object-contain"
                />
              </div>
            </div>
            <div
              aria-hidden="true"
              className="
          pointer-events-none
          absolute top-10 right-0
          h-44 w-44 sm:h-52 sm:w-52
          opacity-[0.20]
          blur-[0.2px]
        "
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/icons8-android.svg"
                  alt=""
                  fill
                  sizes="220px"
                  className="object-contain"
                />
              </div>
            </div>
            <div
              aria-hidden="true"
              className="
          pointer-events-none
          absolute -bottom-10 -left-10
          h-44 w-44 sm:h-52 sm:w-52
          opacity-[0.20]
          blur-[0.2px]
        "
            >
              <div className="relative h-full w-full">
                {/* <Image
                  src="/images/Edge_logo.png"
                  alt=""
                  fill
                  sizes="220px"
                  className="object-contain"
                /> */}
              </div>
            </div>

            <h3
              className="
          text-xl sm:text-2xl md:text-[1.7rem] lg:text-[2.1rem]
          font-black
          text-[color:var(--pn-text)]
        "
            >
              تایپ فارسی بدون غلط
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
              کیبورد اندروید پاک‌نویس با اصلاح املایی، نگارشی و نشانه‌گذاری در لحظه، متن‌های شما را در همهٔ اپ‌ها تمیز و حرفه‌ای می‌کند
            </p>

            <div className="mt-7 lg:mt-8 flex justify-center gap-12">
              <a
                href="/downloads/word"
                className=""
              >
                <Image
                  src="/images/bazar.png"
                  alt="پاک‌نویس"
                  width={200}
                  height={200}
                  className="mt-1  shrink-0"
                />               </a>

              <a
                href="/downloads/chrome"
                className=""
              >
                <Image
                  src="/images/myket.png"
                  alt="پاک‌نویس"
                  width={207}
                  height={200}
                  className="  shrink-0"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
