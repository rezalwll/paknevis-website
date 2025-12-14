import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Download,
  Headphones,
  Home,
  RefreshCcw,
  type LucideIcon,
} from "lucide-react";

type QuickLink = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

const quickLinks: QuickLink[] = [
  {
    title: "بازگشت به صفحه اصلی",
    description: "جایی که همه چیز از آنجا شروع می‌شه",
    href: "/",
    icon: Home,
  },
  {
    title: " افزونه ورد",
    description: "افزونه ورد از اینجا در دسترس است.",
    href: "/downloads/word",
    icon: Download,
  },
  {
    title: " راهنما و پشتیبانی",
    description: "سوالت را در راهنما پیدا کن یا برای گزارش مشکل مستقیماً با تیم پشتیبانی تماس بگیر.",
    href: "/support/contact",
    icon: Headphones,
  },
  {
    title: "وبلاگ ",
    description: "آخرین به‌روزرسانی‌ها، ترفندها و داستان‌های کاربران پاک‌نویس رو اینجا بخون.",
    href: "/blog",
    icon: BookOpen,
  },
  {
    title: "سوالات متداول",
    description: "اگر چیزی برات مبهم هست، احتمالاً جوابش در این بخش است.",
    href: "/support/faq",
    icon: RefreshCcw,
  },
];




export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="min-h-[calc(100vh-200px)] bg-gradient-to-br from-primary-50 via-white to-primary-100 text-slate-800"
    >
      <div className="relative isolate overflow-hidden">
        <div
          className="absolute inset-x-0 -top-40 h-80 bg-gradient-to-b from-primary-200/50 via-white to-white blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-secondary-100/70 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-primary-100/60 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-10 lg:py-10">
          <div className="min-h-[70vh] w-full">
            <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4 py-12">
              <div className="flex w-full max-w-3xl flex-col items-center gap-10 text-center">
                {/* Text */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                      صفحه مورد نظر پیدا نشد، اما راه برگشت همین‌جاست
                    </h1>
                    <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                      لینک ممکن است جابه‌جا شده باشه یا کلا وجود نداشته باشه. از همینجا
                      میتونی به بخش‌های اصلی برگردی یا با پشتیبانی تماس بگیری.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-white shadow-lg shadow-primary-200 transition hover:bg-primary-700"
                    >
                      <Home className="h-5 w-5" />
                      <span>بازگشت به صفحه اصلی</span>
                    </Link>

                    <Link
                      href="/support/contact"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-slate-800 shadow-sm transition hover:border-primary-200 hover:text-primary-800"
                    >
                      <Headphones className="h-5 w-5 text-primary-700" />
                      <span>ارتباط با پشتیبانی</span>
                    </Link>
                  </div>
                </div>
                {/* Image */}
                <div className="relative w-1/2">
                  <div
                    className="absolute inset-0 -left-10 -right-10 rounded-[36px] bg-gradient-to-br from-primary-200/60 via-white to-primary-50 blur-2xl"
                    aria-hidden
                  />
                  <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/80 shadow-[0_22px_60px_rgba(0,0,0,0.08)] backdrop-blur">
                    <div className="aspect-[4/3] w-full">
                      <img
                        src="/images/dissconnect.png"
                        alt="تصویر قطع ارتباط و پیدا نشدن صفحه"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>


          <div className="mt-12 rounded-3xl bg-white/80 p-6 shadow-inner shadow-primary-50 ring-1 ring-primary-100 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                مسیرهای سریع برای ادامه
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-primary-200 via-primary-50 to-transparent" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickLinks.map(({ title, description, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-white to-primary-50/60 px-4 py-4 shadow-sm transition  hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-800 shadow-inner shadow-primary-50">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="text-base font-semibold text-slate-900">
                        {title}
                      </div>
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition group-hover:bg-primary-600 group-hover:text-white">
                      <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-700">
                    رفتن به این مسیر
                    <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
                  </span>
                  <div className="absolute left-3 top-3 h-14 w-14 rounded-full bg-primary-50/70 blur-2xl transition opacity-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
