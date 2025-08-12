import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import EnterprisePricingCarousel from "@/components/EnterprisePricingCarousel";
import ClientsMarquee from "@/components/ClientsMarquee";
import { pricingBenefits, pricingInstallSteps } from "@/content/pricing";
import { listPublicEnterprisePlans } from "@/lib/enterprise-plans";
import {
  CreditCard,
  HardDriveDownload,
  Mail,
  Package,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "نسخه سازمانی پاک‌نویس | طرح‌ها و قیمت‌ها",
  description:
    "طرح‌های نسخه آفلاین پاک‌نویس برای سازمان‌ها به همراه راه ارتباط با ما فروش.",
};

type IconType = ComponentType<SVGProps<SVGSVGElement>>;
const PRICING_ICON_MAP: Record<string, IconType> = {
  zap: Zap,
  target: Target,
  trending_up: TrendingUp,
  credit_card: CreditCard,
  mail: Mail,
  hard_drive_download: HardDriveDownload,
  package: Package,
};

function makeGeneralMailto(email: string) {
  const subject = encodeURIComponent("درخواست مشاوره نسخه آفلاین پاک‌نویس");
  const body = encodeURIComponent(
    `سلام\n\nبرای دریافت مشاوره و اطلاعات نسخهٔ آفلاین پاک‌نویس درخواست دارم.\n\nنام سازمان:\nتعداد کاربران/نیاز:\nشماره تماس:\n\nسپاس`
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

const toFaDigits = (val: string | number) =>
  val
    .toString()
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export default async function EnterprisePage() {
  const contactEmail = "sales@paknevis.ir";
  const plans = await listPublicEnterprisePlans();

  // ===== Theme tokens (from CSS vars)
  const accentText = "text-slate-900";
  const accentBorderHover = "hover:border-[var(--pn-accent)]";

  // ===== Card base
  const cardBase =
    "relative rounded-[18px] bg-[var(--pn-bg)] " +
    "border border-[var(--pn-border)] " +
    " " +
    "transition-[transform,box-shadow,border-color] duration-200 ease-out " +
    " hover:border-[var(--pn-accent)]";

  // Buttons
  const btnSolid =
    "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-extrabold text-white " +
    "shadow-sm transition hover:bg-slate-800";

  const btnOutline =
    "inline-flex h-11 items-center justify-center gap-2 rounded-xl border-2 bg-[var(--pn-bg)] px-5 text-sm font-extrabold " +
    `shadow-sm transition ${accentText} border-[var(--pn-accent)] hover:bg-[var(--pn-surface)] ${accentBorderHover}`;

  // Divider line


  return (
    <main dir="rtl" className="pn-theme-warm bg-[var(--pn-bg)] text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--pn-bg)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <div dir="ltr" className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left Image */}
            <div className="order-2 lg:order-1">
              <div className={`${cardBase} overflow-hidden`}>
                <div className="relative w-full overflow-hidden rounded-[14px]">
                  <Image src="/images/price3.png" alt="???? ?????? ???????? ???? ?????????" width={1200} height={800} className="h-full w-full object-cover" />
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div dir="rtl" className="order-1 lg:order-2">
              <h1 className="mt-4 text-3xl font-black leading-[1.25] sm:text-4xl">
                نسخهٔ آفلاین پاک‌نویس برای سازمان‌ها
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-700 sm:text-base">
                نسخهٔ آنلاین پاک‌نویس همیشه برای کاربران عادی رایگان خواهد بود؛ اما اگر به دلایل امنیتی
                به‌هیچ‌وجه نمی‌توانید رایانه‌های سازمانتان را به اینترنت وصل کنید، خرید نسخهٔ آفلاین
                تنها راهکار پیش روی شما برای ویرایش دقیق و صحیح تمام متن‌های اداری است.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#pricing" className={btnSolid}>
                  مشاهدهٔ طرح‌ها
                </a>
                <a href={makeGeneralMailto(contactEmail)} className={btnOutline}>
                  ارتباط با ما
                </a>
              </div>

              {/* Mini cards */}
              {/* <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { t: "کاملاً آفلاین", d: "بدون اتصال به اینترنت", icon: WifiOff },
                  { t: "سفارشی‌سازی", d: "طبق نیاز سازمان شما", icon: SlidersHorizontal },
                  { t: "پشتیبانی", d: "رفع باگ + به‌روزرسانی", icon: Headphones },
                ].map((x) => (
                  <div key={x.title} className={`${cardBase} p-4`}>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-black text-slate-900">{x.title}</div>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-[var(--pn-border)] bg-[var(--pn-bg)] shadow-sm">
                        <Icon className="h-4 w-4 text-slate-800" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="mt-2 text-xs leading-6 text-slate-700">{x.description}</div>
                  </div>
                )})}
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="scroll-mt-24 bg-[var(--pn-bg)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
          <div className="text-center">


            <h2 className="mt-3 text-2xl font-black sm:text-3xl">طرح های نسخه سازمانی</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-8 text-slate-700 sm:text-base">
              پلن مناسب تیم و سازمان خود را انتخاب کنید و با خیال راحت شروع کنید.
            </p>
          </div>

          <div className="mt-10">
            {plans.length > 0 ? (
              <EnterprisePricingCarousel plans={plans} />
            ) : (
              <div className="mx-auto max-w-3xl rounded-[2rem] border border-dashed border-[var(--pn-border)] bg-[var(--pn-surface)] px-6 py-10 text-center">
                <h3 className="text-xl font-black text-slate-900">فعلاً طرح فعالی ثبت نشده است</h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-8 text-slate-700 sm:text-base">
                  مدیر سایت هنوز هیچ پلن فعالی برای نسخه سازمانی منتشر نکرده است. برای دریافت
                  مشاوره و استعلام، از طریق ایمیل با ما در تماس باشید.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a href={makeGeneralMailto(contactEmail)} className={btnOutline}>
                    ارتباط با ما
                  </a>
                  <a href="/contact" className={btnSolid}>
                    ثبت درخواست
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section dir="ltr" className="text-center px-4 bg-[color:var(--pn-bg)] my-30">
        <h2 className="text-lg sm:text-xl md:text-xl font-bold mb-6 sm:mb-8 md:mb-10 text-[color:var(--pn-muted-title)]">
          مورد اعتماد سازمان‌ها، نویسندگان و کاربران حرفه‌ای در سراسر کشور
        </h2>
        <div className="max-w-6xl mx-auto">
          <ClientsMarquee />
        </div>
      </section>


      {/* LONG CONTENT */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">


        <div className="mt-12">
          <div className="text-center">
            <h3 className="mt-3 text-xl font-black sm:text-2xl">استفاده از نسخهٔ آفلاین چه مزایایی دارد؟</h3>
            <p className="mx-auto mt-2 max-w-3xl text-sm leading-8 text-slate-700 sm:text-base">
              مزایای کلیدی استفاده از پاک‌نویس در سازمان شما:
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {pricingBenefits.map((x) => {
              const Icon = PRICING_ICON_MAP[x.icon];
              return (
              <div key={x.title} className={`${cardBase} p-6`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-black text-slate-900">{x.title}</div>
                    <p className="mt-2 text-sm leading-8 text-slate-700">{x.description}</p>
                  </div>

                  <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-[var(--pn-surface)] border border-[var(--pn-border)] text-slate-800">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            )})}
          </div>
        </div>



        {/* نصب */}
        <div className="mt-10">
          <div className="text-center">
            <h3 className="mt-3 text-xl font-black sm:text-2xl">نحوهٔ نصب نسخهٔ آفلاین</h3>
            <p className="mx-auto mt-2 max-w-3xl text-sm leading-8 text-slate-700 sm:text-base">
              از انتخاب طرح تا نصب و بهره‌برداری:
            </p>
          </div>

          <ol className="mt-6 space-y-3">
            {pricingInstallSteps.map((s, idx) => {
              const Icon = PRICING_ICON_MAP[s.icon];
              return (
              <li key={idx} className={`${cardBase} flex items-start gap-4 p-5`}>
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-[var(--pn-surface)] border border-[var(--pn-border)] text-sm font-black text-slate-800">
                  {toFaDigits(idx + 1)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-black text-slate-900">مرحله {toFaDigits(idx + 1)}</span>
                    <span className=" bg-[var(--pn-surface)] inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-[var(--pn-border)] bg-[var(--pn-bg)] shadow-sm">
                      <Icon className="h-5 w-5 text-slate-800 " aria-hidden="true" />
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-8 text-slate-800">{s.text}</p>
                </div>
              </li>
            )})}
          </ol>

          <div className={`${cardBase} mt-8 p-8 text-center`}>
            <h3 className="mt-3 text-xl font-black sm:text-2xl">با پاک‌نویس، هر بار بهتر بنویس</h3>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-8 text-slate-700 sm:text-base">
              نرم‌افزار ویرایش متن فارسی پاک‌نویس نسخهٔ آفلاین، آمده است تا متن‌های سازمانی شما را بدون نیاز به اینترنت، با سرعت بالا و دقت فراوان ویرایش کند.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="#pricing" className={`${btnSolid} px-6`}>
                دیدن طرح‌ها
              </a>
              <a href={makeGeneralMailto(contactEmail)} className={btnOutline}>
                ارتباط با ما
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}




