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
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-slate-800 shadow-sm transition hover:border-primary-200 hover:text-primary-800"
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



        </div>
      </div>
    </main>
  );
}
