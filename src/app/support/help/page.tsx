"use client";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  Shield,
  CreditCard,
  HelpCircle,
  Laptop,
  User,
  FileWarning,
  ArrowRight,
  Mail,
  Building2,
  ChevronDown,
} from "lucide-react";

export default function HelpCenterPage() {
  const [q, setQ] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const questionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeCategory !== null && questionsRef.current) {
      questionsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeCategory]);

  const featured = [
    { title: "Privacy and security FAQ", meta: "About Superhuman" },
    { title: "Problems signing in", meta: "Account Basics" },
    { title: "Paid account not recognized", meta: "Account Basics" },
    { title: "Get started with Paknevis", meta: "Tips & Tutorials" },
  ];

  const categories = [
    {
      title: "درباره پاکنویس",
      icon: User,
      questions: [
        { question: "Paknevis دقیقا چیست و چه کاری انجام می‌دهد؟", answer: "پاک‌نویس یک دستیار هوشمند نوشتاری است که به شما کمک می‌کند متن‌ها را ویرایش، بازنویسی و حرفه‌ای‌تر کنید تا در محیط‌های مختلف به‌سرعت محتوای باکیفیت بسازید." },
        { question: "چه کسانی بیشترین بهره را از Paknevis می‌برند؟", answer: "دانشجویان، تولیدکنندگان محتوا، مدیران بازاریابی، معلمان و هر کسی که به نوشتن متن فارسی دقیق و روان نیاز دارد، می‌تواند از پاک‌نویس بهره ببرد." },
        { question: "Paknevis چه تفاوتی با ابزارهای ترجمه دارد؟", answer: "پاک‌نویس ابزار ترجمه نیست؛ تمرکز آن بر بازنویسی هدفمند، بهبود لحن و اصلاح نگارشی متن‌های فارسی است و خروجی متناسب با مخاطب شما تولید می‌کند." },
        { question: "آیا برای استفاده از Paknevis نیاز به نصب نرم‌افزار دارم؟", answer: "خیر، Paknevis مبتنی بر وب است و تنها با یک مرورگر مدرن می‌توانید از امکانات آن استفاده کنید؛ اپلیکیشن موبایل در حال توسعه است." },
        { question: "آیا Paknevis از چند زبان پشتیبانی می‌کند؟", answer: "تمرکز اصلی پاک‌نویس بر زبان فارسی است؛ برای عبارت‌های انگلیسی رایج نیز پیشنهادهایی ارائه می‌شود اما اولویت با فارسی است." },
        { question: "چرا باید به Paknevis اعتماد کنم؟", answer: "پاک‌نویس از مدل‌های زبانی اختصاصی و تیم متخصص زبان فارسی بهره می‌برد؛ تمام پردازش‌ها با حفظ امنیت داده و به شکل رمزنگاری‌شده انجام می‌شود." },
        { question: "چگونه Paknevis با برند و لحن سازمان ما هماهنگ می‌شود؟", answer: "می‌توانید لحن دلخواه، واژگان کلیدی و دستورالعمل‌های برند را در پروفایل خود ثبت کنید تا در بازنویسی‌ها لحاظ شوند." },
        { question: "آیا تعداد درخواست‌های روزانه محدود است؟", answer: "بسته‌های رایگان محدودیت دارند اما با ارتقای حساب می‌توانید درخواست‌های بیشتری را با سرعت بالاتر ارسال کنید." },
        { question: "Paknevis چه تفاوتی با ویرایش انسانی دارد؟", answer: "پاک‌نویس سرعت بالاتری دارد و هزینه را کاهش می‌دهد؛ برای پروژه‌های حساس نیز می‌توانید خروجی هوش مصنوعی را به تیم ویراستاری انسانی ما بسپارید." },
        { question: "آیا پاک‌نویس برای تیم‌ها و سازمان‌ها قابل سفارشی‌سازی است؟", answer: "بله، می‌توانید داشبورد سازمانی داشته باشید، دسترسی‌ها را مدیریت کنید و الگوهای سفارشی برای تیم خود بسازید." },
      ],
    },
    {
      title: "افزونه کروم",
      icon: CreditCard,
      questions: [
        { question: "چطور می‌توانم اشتراک خود را ارتقا دهم؟", answer: "از بخش تنظیمات حساب وارد قسمت اشتراک شوید و پلن مورد نظر را انتخاب کنید؛ پرداخت آنلاین در چند ثانیه انجام می‌شود و بلافاصله به پلن جدید منتقل می‌شوید." },
        { question: "روش‌های پرداخت Paknevis چیست؟", answer: "در حال حاضر پرداخت از طریق کارت‌های عضو شتاب و درگاه امن بانکی امکان‌پذیر است؛ برای پرداخت ارزی با تیم فروش در ارتباط باشید." },
        { question: "آیا امکان دریافت فاکتور رسمی وجود دارد؟", answer: "بله، کاربران حقوقی می‌توانند پس از پرداخت درخواست فاکتور رسمی دهند؛ اطلاعات حقوقی خود را در پروفایل بارگذاری کنید تا فاکتور صادر شود." },
        { question: "آیا می‌توانم اشتراک را قبل از پایان دوره لغو کنم؟", answer: "بله، لغو اشتراک در هر زمان ممکن است؛ دسترسی تا پایان دوره پرداخت‌شده حفظ می‌شود و از دوره بعد مبلغی کسر نمی‌شود." },
        { question: "پلن رایگان چه محدودیت‌هایی دارد؟", answer: "پلن رایگان روزانه تعداد محدودی بازنویسی و دسترسی به برخی قالب‌های پرکاربرد را شامل می‌شود؛ امکانات پیشرفته در پلن‌های پولی فعال هستند." },
        { question: "چگونه اشتراک سازمانی خریداری کنیم؟", answer: "برای اشتراک سازمانی فرم تماس را تکمیل کنید تا نماینده فروش با شما هماهنگ کند و بر اساس حجم استفاده، قیمت‌گذاری انجام شود." },
        { question: "آیا تخفیف دانشجویی در نظر گرفته شده است؟", answer: "بله، با ارسال کارت دانشجویی معتبر می‌توانید از تخفیف‌های فصلی دانشجویی استفاده کنید که در پانل کاربری اعلام می‌شود." },
        { question: "در صورت ناموفق بودن پرداخت چه کنم؟", answer: "ابتدا وضعیت اتصال خود و محدودیت کارت را بررسی کنید؛ اگر مبلغ کسر شد اما اشتراک فعال نشد با پشتیبانی مالی تماس بگیرید تا در اسرع وقت پیگیری شود." },
        { question: "آیا امکان پرداخت خودکار وجود دارد؟", answer: "در پلن‌های ماهانه می‌توانید گزینه تمدید خودکار را فعال کنید؛ هر زمان هم امکان لغو تمدید خودکار وجود خواهد داشت." },
        { question: "آیا می‌توانم پلن‌ها را مقایسه کنم؟", answer: "بله، در صفحه قیمت‌ها جدول کامل مقایسه امکانات قرار دارد و می‌توانید بر اساس حجم استفاده، بهترین پلن را انتخاب کنید." },
      ],
    },
    {
      title: "افزونه ورد",
      icon: FileWarning,
      questions: [
        { question: "خروجی‌ها ناگهان کند شده، چه کار کنم؟", answer: "کش مرورگر را پاک کنید و دوباره وارد شوید؛ اگر همچنان کند است از منوی پشتیبانی گزارش عملکرد ارسال کنید تا تیم فنی بررسی کند." },
        { question: "چرا متن من کامل بازنویسی نمی‌شود؟", answer: "اگر طول متن زیاد باشد، آن را به بخش‌های کوچک‌تر تقسیم کنید؛ همچنین مطمئن شوید که قالب انتخابی با نوع متن شما سازگار است." },
        { question: "متن ذخیره شده من پیدا نمی‌شود، چه کنم؟", answer: "در داشبورد به بخش «پیش‌نویس‌ها» بروید و با فیلتر تاریخ جستجو کنید؛ اگر پاک شده باشد می‌توانید درخواست بازیابی ۷۲ ساعته ارسال کنید." },
        { question: "با خطای سرور مواجه می‌شوم، راه‌حل چیست؟", answer: "ابتدا چند دقیقه صبر کنید و دوباره تلاش کنید؛ اگر خطا ادامه داشت، کد خطا را برای پشتیبانی فنی ارسال کنید تا به سرعت بررسی شود." },
        { question: "خروجی با دستورالعمل من مطابقت ندارد، چرا؟", answer: "لطفا دستورالعمل را دقیق‌تر و با جزئیات بیشتر وارد کنید؛ می‌توانید مثال یا عبارت‌های کلیدی را مشخص کنید تا مدل نتایج دقیق‌تری بدهد." },
        { question: "چرا نمی‌توانم فایل ورد آپلود کنم؟", answer: "پشتیبانی فعلی برای فرمت‌های .docx و .txt فعال است؛ اگر فایل شما نامعتبر است آن را ذخیره مجدد گرفته یا از بخش «متن را جای‌گذاری کنید» استفاده کنید." },
        { question: "چرا خروجی خالی نمایش داده می‌شود؟", answer: "اگر مرورگر افزونه مسدودکننده دارد آن را غیر فعال کنید؛ همچنین مطمئن شوید که متن ورودی شما کمتر از حداقل ۳۰ کاراکتر نباشد." },
        { question: "با ارور محدودیت استفاده روبه‌رو شدم، راه‌حل چیست؟", answer: "پلن رایگان سقف مشخصی دارد؛ می‌توانید تا ریست روزانه صبر کنید یا با ارتقا به پلن بالاتر، محدودیت را افزایش دهید." },
        { question: "مرورگرم نسخه قدیمی است؛ آیا مشکلی ایجاد می‌کند؟", answer: "برای بهترین عملکرد از آخرین نسخه کروم، اج یا فایرفاکس استفاده کنید؛ در نسخه‌های قدیمی ممکن است برخی قابلیت‌ها نمایش داده نشوند." },
        { question: "چطور مشکل خطای ۲۴ ساعته را گزارش دهم؟", answer: "در صورت تکرار خطا، از صفحه خطا اسکرین‌شات بگیرید و همراه با توضیح زمان و نوع درخواست، فرم گزارش مشکل را ارسال کنید." },
      ],
    },
    {
      title: "حساب کاربری",
      icon: Laptop,
      questions: [
        { question: "چگونه حساب کاربری جدید بسازم؟", answer: "در صفحه اصلی بر گزینه ثبت‌نام کلیک کنید، ایمیل یا شماره تلفن خود را وارد کنید و پس از تایید کد ارسال‌شده، رمز عبور دلخواه را تعیین کنید." },
        { question: "اگر رمز عبورم را فراموش کنم چه کار کنم؟", answer: "از بخش ورود روی «فراموشی رمز» بزنید تا لینک بازنشانی برای ایمیل شما ارسال شود؛ با کلیک روی لینک می‌توانید رمز جدید تعیین کنید." },
        { question: "چطور اطلاعات پروفایل را به‌روزرسانی کنم؟", answer: "به تنظیمات حساب بروید و در بخش «اطلاعات شخصی» نام، تصویر و توضیحات خود را ویرایش کنید؛ همه تغییرات با ذخیره‌سازی اعمال می‌شود." },
        { question: "آیا می‌توانم چند دستگاه را هم‌زمان استفاده کنم؟", answer: "بله، تا سه دستگاه به صورت همزمان مجاز است؛ در صورت نیاز به دستگاه بیشتر، از بخش امنیتی دستگاه‌های بلااستفاده را خارج کنید." },
        { question: "چگونه اعلان ایمیل‌ها را مدیریت کنم؟", answer: "در تنظیمات اعلان می‌توانید خبرنامه، اعلان‌های آموزشی و هشدارهای عملیاتی را جداگانه فعال یا غیر فعال کنید." },
        { question: "چطور حسابم را حذف کنم؟", answer: "در تنظیمات امنیتی گزینه «حذف دائمی حساب» را انتخاب کنید؛ بعد از تایید، اطلاعات شما پس از ۱۴ روز به طور کامل پاک خواهد شد." },
        { question: "آیا امکان ورود با گوگل یا اپل هست؟", answer: "بله، در فرم ورود گزینه‌های ورود با گوگل و اپل فعال هستند؛ با انتخاب هر کدام، احراز هویت امن انجام می‌شود." },
        { question: "چگونه سطح دسترسی همکارم را محدود کنم؟", answer: "در داشبورد تیم، برای هر عضو نقش تعیین کنید؛ نقش‌ها مشخص می‌کنند چه کسی می‌تواند محتوا را ویرایش، حذف یا منتشر کند." },
        { question: "چرا باید شماره تلفن را تایید کنم؟", answer: "تایید شماره تلفن امنیت حساب را بالا می‌برد و امکان بازیابی سریع حساب در شرایط اضطراری را فراهم می‌کند." },
        { question: "آیا پاک‌نویس محدودیت سنی دارد؟", answer: "استفاده از پاک‌نویس برای افراد بالای ۱۶ سال مجاز است؛ برای کاربران کم سن‌تر نیاز به تایید والدین وجود دارد." },
      ],
    },
    {
      title: "نحوه کار",
      icon: HelpCircle,
      questions: [
        { question: "چگونه یک متن تبلیغاتی جذاب بسازم؟", answer: "از قالب «تبلیغات» استفاده کنید، ویژگی محصول، مخاطب هدف و لحن دلخواه را مشخص کنید تا چند نسخه متفاوت برای تست دریافت کنید." },
        { question: "بهترین روش برای بازنویسی ایمیل اداری چیست؟", answer: "ایمیل را در پاک‌نویس وارد کنید، هدف ایمیل و حس مورد نظر را بنویسید و از حالت «رسمی» استفاده کنید تا نسخه حرفه‌ای دریافت کنید." },
        { question: "چگونه لحن صمیمانه به متن اضافه کنم؟", answer: "در بخش دستورالعمل، عبارت‌هایی مانند «لحن دوستانه و خودمانی» یا «استفاده از مثال‌های روزمره» را ذکر کنید تا مدل با همان سبک بازنویسی کند." },
        { question: "آیا می‌توانم برای وبلاگ تقویم محتوا بسازم؟", answer: "بله، از قالب «برنامه‌ریزی محتوا» استفاده کنید، موضوع کلی و بازه زمانی را وارد کنید تا پیشنهادهای تیتر و زمان‌بندی دریافت کنید." },
        { question: "بهترین روش خلاصه‌سازی متن چیست؟", answer: "متن طولانی را وارد کنید و قالب «خلاصه کن» را انتخاب کنید؛ می‌توانید طول خروجی و سطح جزئیات را نیز مشخص کنید." },
        { question: "چگونه خروجی را به فرمت شبکه‌های اجتماعی تبدیل کنم؟", answer: "پس از تولید متن، گزینه «بازنویسی برای شبکه اجتماعی» را انتخاب کنید و پلتفرم مورد نظر را تعیین کنید تا محدودیت کاراکتر رعایت شود." },
        { question: "آیا امکان ساخت الگوی شخصی وجود دارد؟", answer: "بله، در بخش قالب‌های سفارشی می‌توانید مراحل و دستورالعمل دلخواه را ذخیره کنید تا در پروژه‌های بعدی سریع‌تر استفاده شود." },
        { question: "برای ایجاد سناریو آموزشی چه کنم؟", answer: "از قالب «سناریو آموزشی» استفاده کنید و سطح مخاطب را مشخص کنید؛ پاک‌نویس ساختار جلسه، فعالیت‌ها و منابع را پیشنهاد می‌دهد." },
        { question: "چگونه از تاریخچه نسخه‌ها استفاده کنم؟", answer: "در هر سند بخش «تاریخچه» را باز کنید تا نسخه‌های قبلی را ببینید و در صورت نیاز یکی را بازیابی کنید یا با نسخه فعلی مقایسه نمایید." },
        { question: "آیا ویدیوهای آموزشی موجود است؟", answer: "بله، در آکادمی پاک‌نویس مجموعه ویدیوهای کوتاه گام‌به‌گام وجود دارد که با پلن رایگان هم قابل مشاهده است." },
      ],
    },
    {
      title: "نسخه سازمانی",
      icon: Building2,
      questions: [
        { question: "Paknevis چه مزایایی برای سازمان‌ها دارد؟", answer: "سازمان‌ها می‌توانند با استانداردسازی لحن و سرعت تولید محتوا تا ۶۵٪ در زمان و هزینه صرفه‌جویی کنند و کنترل دقیق‌تری بر فرآیند تولید داشته باشند." },
        { question: "چگونه دسترسی تیمی مدیریت می‌شود؟", answer: "مدیر سازمانی می‌تواند اعضا را دعوت کند، نقش‌های مختلف تعیین کند و محدودیت مصرف هر تیم را از داشبورد مدیریتی تعریف کند." },
        { question: "آیا امکانات امنیتی ویژه‌ای برای سازمان‌ها ارائه می‌شود؟", answer: "بله، احراز هویت چندمرحله‌ای، لاگ‌های دقیق فعالیت و اتصال SSO برای دامنه‌های شرکتی قابل فعال‌سازی است." },
        { question: "چطور Paknevis در مدارس استفاده می‌شود؟", answer: "معلمان می‌توانند تکالیف نوشتاری را طراحی کنند، دانش‌آموزان از راهنمایی تعاملی استفاده کنند و گزارش پیشرفت دقیق دریافت نمایند." },
        { question: "آیا داده‌های سازمانی محرمانه می‌ماند؟", answer: "بله، داده‌ها رمزنگاری می‌شوند و بر اساس قرارداد محرمانگی ذخیره خواهند شد؛ درخواست حذف داده‌ها هم در هر زمان پذیرفته می‌شود." },
        { question: "آیا امکان اتصال به ابزارهای داخلی سازمان وجود دارد؟", answer: "بله، از طریق API و وبهوک می‌توانید پاک‌نویس را با سامانه‌های داخلی یا CMS سازمان خود یکپارچه کنید." },
        { question: "چگونه می‌توانیم از گزارش مصرف استفاده کنیم؟", answer: "داشبورد مدیریتی گزارش‌های دقیق از میزان استفاده، تیم‌های فعال و کلیدواژه‌های پرکاربرد ارائه می‌دهد تا تصمیم‌گیری بهبود یابد." },
        { question: "آیا طرح‌های آموزشی ویژه ارائه می‌شود؟", answer: "برای مدارس و دانشگاه‌ها بسته‌های اختصاصی با محتوای آموزشی و پشتیبانی مربیان ارائه می‌شود که بر اساس تعداد دانش‌آموز محاسبه می‌گردد." },
        { question: "چطور برای قرارداد سازمانی مذاکره کنیم؟", answer: "فرم درخواست سازمانی را ارسال کنید تا تیم فروش جلسه‌ای برای بررسی نیازها و تعیین شرایط قراردادی برگزار کند." },
        { question: "آیا می‌توانیم برند سازمان را در پاک‌نویس پیاده کنیم؟", answer: "بله، امکان بارگذاری راهنمای برند، فونت سازمانی و مجموعه واژگان اختصاصی وجود دارد تا خروجی‌ها کاملا مطابق هویت سازمان باشد." },
      ],
    },
  ];

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setExpandedQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white text-slate-800">
      

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white min-h-[500px]">
        {/* animated soft gradient blobs — minimal */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob blob-a" />
          <div className="blob blob-b" />
          <div className="blob blob-c" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 pt-14 pb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            سلام! چطور می‌تونیم کمک کنیم؟
          </h1>

          {/* Search */}
          <div className="mt-8 flex items-center justify-center">
            <div className="w-full max-w-2xl flex items-center rounded-full border border-slate-200 bg-white shadow-sm px-4 py-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="جستجو برای پاسخ‌ها"
                className="w-full pr-3 outline-none text-slate-700 placeholder:text-slate-400 bg-transparent"
              />
            </div>
          </div>

          {/* Featured */}
          <div className="max-w-4xl mx-auto mt-10">
            <div className="h-px bg-slate-200" />
            <div className="mt-3 text-[11px] tracking-[.25em] text-slate-500">FEATURED ARTICLES</div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              {featured.map((f) => (
                <a key={f.title} className="group block">
                  <div className="text-slate-900 group-hover:text-indigo-700 font-medium leading-6">{f.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{f.meta}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scoped styles for animated blobs */}
        <style>{`
          .blob{position:absolute;border-radius:9999px;filter:blur(28px);opacity:.22;mix-blend-multiply;pointer-events:none;will-change:transform;transform:translateZ(0);transition:transform 0.3s ease-out;}
          .blob-a{width:420px;height:420px;background:radial-gradient(closest-side,#66C0FF,transparent 70%);right:15%;top:-10%;animation:floaty 25s ease-in-out infinite;}
          .blob-b{width:360px;height:360px;background:radial-gradient(closest-side,#0094F0,transparent 65%);left:10%;bottom:-10%;animation:floaty2 30s ease-in-out infinite;}
          .blob-c{width:300px;height:300px;background:radial-gradient(closest-side,#0036C4,transparent 60%);left:40%;top:20%;animation:floaty3 28s ease-in-out infinite;}
          @keyframes floaty{
            0%{transform:translate3d(0,0,0) scale(1);}
            25%{transform:translate3d(120px,80px,0) scale(1.08);}
            50%{transform:translate3d(-80px,150px,0) scale(0.95);}
            75%{transform:translate3d(100px,-60px,0) scale(1.05);}
            100%{transform:translate3d(0,0,0) scale(1);}
          }
          @keyframes floaty2{
            0%{transform:translate3d(0,0,0) scale(1);}
            25%{transform:translate3d(-100px,-120px,0) scale(0.92);}
            50%{transform:translate3d(90px,-180px,0) scale(1.06);}
            75%{transform:translate3d(-70px,-40px,0) scale(0.98);}
            100%{transform:translate3d(0,0,0) scale(1);}
          }
          @keyframes floaty3{
            0%{transform:translate3d(0,0,0) scale(1);}
            25%{transform:translate3d(-90px,110px,0) scale(1.03);}
            50%{transform:translate3d(110px,-90px,0) scale(0.97);}
            75%{transform:translate3d(-50px,-120px,0) scale(1.04);}
            100%{transform:translate3d(0,0,0) scale(1);}
          }
          @media (prefers-reduced-motion: reduce){.blob,.blob-a,.blob-b,.blob-c{animation:none;}}
        `}</style>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {categories.map((c, idx) => {
            const Icon = c.icon;
            return (
              <button
                key={c.title}
                onClick={() => {
                  setActiveCategory(idx);
                  setExpandedQuestions({});
                }}
                className={`group flex flex-col items-center text-center gap-4 select-none transition-colors ${
                  activeCategory === idx ? "text-indigo-700" : "text-slate-700"
                }`}
                aria-expanded={activeCategory === idx}
              >
                <div
                  className={`w-16 h-16 rounded-2xl border flex items-center justify-center transition-colors ${
                    activeCategory === idx ? "border-indigo-200 bg-indigo-50" : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <Icon className={`w-9 h-9 transition-colors ${activeCategory === idx ? "text-indigo-700" : "text-indigo-700"}`} strokeWidth={1.75} />
                </div>
                <div className="space-y-1">
                  <div className="text-slate-900 font-medium group-hover:text-indigo-700">{c.title}</div>
                </div>
              </button>
            );
          })}
        </div>
        {activeCategory !== null && (
          <div ref={questionsRef} className="space-y-4 pt-10">
            <div className="text-center md:text-right">
              <p className="text-sm text-slate-500">این بخش مربوط به دسته‌بندی انتخابی شماست</p>
              <h2 className="text-lg font-semibold text-slate-900">
                سوالات و پاسخ‌های دسته «{categories[activeCategory].title}»
              </h2>
            </div>
            <div className="rounded-2xl border border-slate-200 divide-y divide-slate-200 bg-white shadow-sm">
              {categories[activeCategory].questions.map((item, questionIndex) => {
                const key = `${activeCategory}-${questionIndex}`;
                const isOpen = !!expandedQuestions[key];
                return (
                  <div key={item.question}>
                    <button
                      onClick={() => toggleQuestion(activeCategory, questionIndex)}
                      className="w-full flex items-center justify-between px-5 py-4 text-right"
                      aria-expanded={isOpen}
                    >
                      <span className="font-medium text-slate-900">{item.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-indigo-600" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm leading-7 text-slate-600">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Contact strip */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-6 flex items-center justify-center gap-3 text-slate-700">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-200">
            <Mail className="w-5 h-5" />
          </span>
          <span>پاسخ‌تان را پیدا نکردید؟</span>
          <a className="inline-flex items-center gap-1 text-emerald-700 hover:underline">
            با ما تماس بگیرید <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-600" />
              <strong className="text-slate-900">Paknevis</strong>
            </div>
            <p className="text-slate-600">Help Center</p>
          </div>
          <div>
            <div className="font-semibold mb-2">Get Paknevis</div>
            <ul className="space-y-1 text-slate-600">
              <li>Desktop</li>
              <li>Browser Extension</li>
              <li>Mobile</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Learn More</div>
            <ul className="space-y-1 text-slate-600">
              <li>Plans</li>
              <li>Pro</li>
              <li>Features</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Connect</div>
            <ul className="space-y-1 text-slate-600">
              <li>Help Center</li>
              <li>Status</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

