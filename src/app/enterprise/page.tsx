import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
import EnterprisePricingCarousel from "../../components/EnterprisePricingCarousel";
import ClientsMarquee from "../../components/ClientsMarquee";
import {
  BadgeCheck,
  BookCheck,
  Building2,
  CreditCard,
  FileWarning,
  HandCoins,
  HardDriveDownload,
  Headphones,
  HelpCircle,
  Mail,
  Package,
  ScrollText,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  SpellCheck,
  Target,
  TimerOff,
  TrendingUp,
  Type,
  Users,
  Wand2,
  WifiOff,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "نسخه سازمانی پاک‌نویس | طرح‌ها و قیمت‌ها",
  description:
    "طرح‌های نسخه آفلاین پاک‌نویس برای سازمان‌ها به همراه راه ارتباط با ما فروش.",
};

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

function makeGeneralMailto(email: string) {
  const subject = encodeURIComponent("درخواست مشاوره نسخه آفلاین پاک‌نویس");
  const body = encodeURIComponent(
    `سلام\n\nبرای دریافت مشاوره و اطلاعات نسخهٔ آفلاین پاک‌نویس درخواست دارم.\n\nنام سازمان:\nتعداد کاربران/نیاز:\nشماره تماس:\n\nسپاس`
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

function IconPill({
  Icon,
  children,
  className = "",
}: {
  Icon: IconType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={
        "inline-flex items-center gap-2 rounded-full border border-[var(--pn-border)] " +
        "bg-[var(--pn-bg)] px-3 py-1 text-xs font-bold shadow-sm " +
        className
      }
    >
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--pn-surface)] border border-[var(--pn-border)] text-slate-800">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      {children}
    </span>
  );
}

function IconChip({ Icon, text }: { Icon: IconType; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--pn-border)] bg-[var(--pn-bg)] px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
      <Icon className="h-4 w-4 text-slate-600" aria-hidden="true" />
      {text}
    </span>
  );
}

export default function EnterprisePage() {
  const contactEmail = "sales@paknevis.ir";

  // ===== Theme tokens (from CSS vars)
  const accentText = "text-slate-900";
  const accentBgSoft = "bg-[var(--pn-surface)]";
  const accentBorder = "border-[var(--pn-border)]";
  const accentBorderHover = "hover:border-[var(--pn-accent)]";

  // ===== Card base
  const cardBase =
    "relative rounded-[18px] bg-[var(--pn-bg)] " +
    "border border-[var(--pn-border)] " +
    " " +
    "transition-[transform,box-shadow,border-color] duration-200 ease-out " +
    " hover:border-[var(--pn-accent)]";

  const cardFeatured = "border-2 border-[var(--pn-accent)]";

  // Buttons
  const btnSolid =
    "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-extrabold text-white " +
    "shadow-sm transition hover:bg-slate-800";

  const btnOutline =
    "inline-flex h-11 items-center justify-center gap-2 rounded-xl border-2 bg-[var(--pn-bg)] px-5 text-sm font-extrabold " +
    `shadow-sm transition ${accentText} border-[var(--pn-accent)] hover:bg-[var(--pn-surface)] ${accentBorderHover}`;

  // Divider line
  const divider =
    "mx-auto my-4 h-[3px] w-14 rounded-full bg-[var(--pn-accent)] opacity-90";

  const featureCards: { t: string; d: string; icon: IconType }[] = [
    {
      t: "خطایابی املایی",
      d: "تمام متن بررسی می‌شود و غلط‌های املایی، فاصله‌گذاری‌ها و نیم‌فاصله‌ها شناسایی و اصلاح پیشنهاد می‌شود.",
      icon: SpellCheck,
    },
    {
      t: "خطایابی نشانه‌گذاری",
      d: "کمک برای اصلاح فاصلهٔ قبل/بعد نشانه‌ها و استفاده درست از نقطه، ویرگول، نقطه‌ویرگول و…",
      icon: Type,
    },
    {
      t: "اصلاح نویسه‌ها",
      d: "تبدیل نویسه‌های عربی/انگلیسی به نسخهٔ فارسی برای متن یکدست و حرفه‌ای.",
      icon: Wand2,
    },
    {
      t: "تصحیح اعداد",
      d: "شناسایی اعداد عربی/انگلیسی و تبدیل آن‌ها به اعداد فارسی.",
      icon: BadgeCheck,
    },
    {
      t: "مصوب فرهنگستان",
      d: "کمک به اجرای مو‌به‌موی شیوه‌نامه و دستور مصوب فرهنگستان زبان و ادب فارسی.",
      icon: BookCheck,
    },
    {
      t: "پیشنهادهای ویرایشی",
      d: "ارائه پیشنهادهای نگارشی/ویرایشی برای متن روان‌تر و درست‌تر.",
      icon: Sparkles,
    },
  ];

  const featureDetails: { s: string; p: string[]; icon: IconType }[] = [
    {
      s: "جزئیات خطایابی املایی",
      p: [
        "با این ویژگی، نرم‌افزار تمام متن شما را بررسی می‌کند و بدون نادیده‌گرفتن موردی، غلط‌های املایی، فاصله‌گذاری‌ها و نیم‌فاصله‌ها را شناسایی می‌کند و نسخهٔ صحیح را پیشنهاد می‌دهد.",
      ],
      icon: SpellCheck,
    },
    {
      s: "جزئیات خطایابی نشانه‌گذاری",
      p: [
        "فرایند و قوانین نشانه‌گذاری در فارسی تا حدی مبهم است. پاک‌نویس کمک می‌کند هر جا فاصلهٔ قبل یا بعد نشانه‌ای کم یا زیاد است اصلاح شود و از نقطه، ویرگول، نقطه‌ویرگول و… درست استفاده کنید.",
      ],
      icon: Type,
    },
    {
      s: "جزئیات اصلاح نویسه‌ها",
      p: [
        "گاهی متن در ظاهر فارسی است اما نویسه‌ها پشت‌صحنه عربی یا انگلیسی هستند و کیفیت متن را پایین می‌آورند. این بخش، نویسه‌های عربی و انگلیسی را به نسخهٔ فارسی تبدیل می‌کند.",
      ],
      icon: Wand2,
    },
    {
      s: "جزئیات تصحیح اعداد",
      p: [
        "اعداد ممکن است عربی یا انگلیسی وارد شوند. پاک‌نویس کمک می‌کند اعداد عربی/انگلیسی را پیدا کنید و به فارسی تبدیل کنید.",
      ],
      icon: BadgeCheck,
    },
    {
      s: "جزئیات اجرای شیوه‌نامهٔ مصوب فرهنگستان",
      p: [
        "فرهنگستان زبان و ادب فارسی معتبرترین مرجع درست‌نویسی است. پاک‌نویس کمک می‌کند واژه‌ها و دستورهای مصوب فرهنگستان را دقیق اجرا کنید.",
      ],
      icon: BookCheck,
    },
    {
      s: "جزئیات پیشنهادهای ویرایشی",
      p: [
        "در این بخش پیشنهادهای ویرایشی و نگارشی ارائه می‌شود تا متن فارسی بهبود یابد و در نهایت متن روان‌تر و درست‌تری داشته باشید.",
      ],
      icon: Sparkles,
    },
  ];

  const accordion: {
    s: string;
    p: string[];
    list?: string[];
    featured?: boolean;
    icon: IconType;
  }[] = [
      {
        s: "چرا پاک‌نویسِ آفلاین ساخته شد؟",
        p: [
          "برخی از سازمان‌ها به دلایل امنیتی و حفظ محرمانگی اطلاعات، امکان و مجوز استفاده از اینترنت روی رایانه‌های سازمانی را ندارند؛ یعنی این رایانه‌ها نباید به اینترنت وصل شوند.",
          "با وصل‌شدن حتی یک‌مرتبه‌ای رایانهٔ سازمانی به اینترنت هم ممکن است امنیت سازمان و مدارک آن به خطر بیفتد. حالا که نمی‌توانید رایانهٔ سازمانی خود را به اینترنت وصل کنید، چگونه می‌خواهید از پاک‌نویس استفاده کنید؟",
          "به‌تازگی، استفاده از پاک‌نویس به‌صورت کاملاً آفلاین هم امکان‌پذیر شده است. شما متناسب با نیازتان طرح مناسب را تهیه می‌کنید.",
        ],
        icon: HelpCircle,
      },
      {
        s: "نسخهٔ آفلاین و سازمانی چه ویژگی‌های متفاوتی دارد؟",
        p: [
          "نسخهٔ آفلاین سازمانی علاوه بر ویژگی‌های مشترک با نسخهٔ آنلاین و رایگان، امکان شخصی‌سازی و سفارشی‌سازی کامل دارد.",
          "در صورت نیاز، نرم‌افزار برای سازمان شما سفارشی می‌شود و پیکره/زبان/منبع واژگانی مدنظر شما اضافه می‌شود؛ حتی تنظیمات داخلی نرم‌افزار نیز قابل شخصی‌سازی است.",
          "علاوه بر این، با خرید نسخهٔ آفلاین، تا یک سال پشتیبانی واقعی دریافت می‌کنید.",
        ],
        list: [
          "نصب کامل نسخهٔ آفلاین روی تمام رایانه‌های سازمان",
          "رفع و بهبود تمام باگ‌های نرم‌افزار",
          "اجرای سفارشی‌سازی‌های مدنظر شما",
          "پاسخگویی فعالانه به سؤالات و مشکلات",
          "به‌روزرسانی نرم‌افزار و پیکره‌ها",
        ],
        featured: true,
        icon: Settings2,
      },
      {
        s: "نسخهٔ آفلاین پاک‌نویس برای چه کسانی مفید است؟",
        p: [
          "برای افراد عادی کاربرد خاصی ندارد؛ چون نسخهٔ آنلاین رایگان است.",
          "برای سازمان‌ها/ادارات/شرکت‌هایی مفید است که امکان اتصال رایانه به اینترنت را ندارند یا به‌دلیل سیاست‌های امنیتی اجازه اتصال نمی‌دهند.",
        ],
        icon: Users,
      },
    ];

  const benefits: { t: string; d: string; icon: IconType }[] = [
    {
      t: "افزایش سرعت",
      d: "با چند کلیک ساده و بدون صرف زمان طولانی برای بازخوانی و اصلاح دستی، متن روان و بی‌غلط تولید می‌کنید و ساعت-نفر موردنیاز برای نگارش به‌طور چشمگیری کاهش می‌یابد.",
      icon: Zap,
    },
    {
      t: "دقت بالا",
      d: "حتی ویراستاران حرفه‌ای هم ممکن است خطا را از قلم بیندازند. پاک‌نویس با سازوکار نرم‌افزاری، خطاها را با دقت بسیار بالا شناسایی می‌کند.",
      icon: Target,
    },
    {
      t: "افزایش بهره‌وری سازمان",
      d: "افزایش سرعت و دقت در نوشتن متن‌های فارسی، به‌صورت معنی‌دار بهره‌وری سازمان را بالا می‌برد و در زمان و انرژی کارمندان صرفه‌جویی می‌کند.",
      icon: TrendingUp,
    },
  ];

  const withoutPaknevis: { t: string; icon: IconType }[] = [
    { t: "مقدار زیادی زمان", icon: TimerOff },
    { t: "کاهش کیفیت متن فارسی", icon: FileWarning },
    { t: "از دست دادن منابع مالی و فرصت‌ها", icon: HandCoins },
  ];

  const installSteps: { t: string; icon: IconType }[] = [
    {
      t: "با توجه به تعداد رایانه‌ها/کاربران یا حجم استفاده، طرح مورد نظر را از همین صفحه انتخاب کنید.",
      icon: CreditCard,
    },
    {
      t: "از طریق ایمیل، درخواست و نیازهای سازمانتان را با کارشناسان پاک‌نویس در میان بگذارید.",
      icon: Mail,
    },
    {
      t: "نسخهٔ آفلاین روی رایانه‌های سازمان نصب می‌شود و تمام امکانات ویرایشی بدون اینترنت در دسترس خواهد بود.",
      icon: HardDriveDownload,
    },
    {
      t: "افزونه/بستهٔ لازم را دریافت می‌کنید تا در آینده بتوانید روی رایانه‌های جدید نیز نصب کنید.",
      icon: Package,
    },
  ];

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
                  <img
                    src="/images/Online editor.png"
                    alt="نسخه آفلاین پاک‌نویس برای سازمان‌ها"
                    className="h-full w-full object-cover"
                  />
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
                  <div key={x.t} className={`${cardBase} p-4`}>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-black text-slate-900">{x.t}</div>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-[var(--pn-border)] bg-[var(--pn-bg)] shadow-sm">
                        <x.icon className="h-4 w-4 text-slate-800" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="mt-2 text-xs leading-6 text-slate-700">{x.d}</div>
                  </div>
                ))}
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
            <EnterprisePricingCarousel />
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
            {benefits.map((x) => (
              <div key={x.t} className={`${cardBase} p-6`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-black text-slate-900">{x.t}</div>
                    <p className="mt-2 text-sm leading-8 text-slate-700">{x.d}</p>
                  </div>

                  <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-[var(--pn-surface)] border border-[var(--pn-border)] text-slate-800">
                    <x.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            ))}
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
            {installSteps.map((s, idx) => (
              <li key={idx} className={`${cardBase} flex items-start gap-4 p-5`}>
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-[var(--pn-surface)] border border-[var(--pn-border)] text-sm font-black text-slate-800">
                  {idx + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-black text-slate-900">مرحله {idx + 1}</span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-[var(--pn-border)] bg-[var(--pn-bg)] shadow-sm">
                      <s.icon className="h-5 w-5 text-slate-800" aria-hidden="true" />
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-8 text-slate-800">{s.t}</p>
                </div>
              </li>
            ))}
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
