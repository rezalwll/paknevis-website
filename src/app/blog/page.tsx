import Link from "next/link";

import { posts } from "./posts";

export default function BlogPage() {
  return (
    <main
      className="
        min-h-screen bg-slate-50
        text-slate-800
        text-[15px] md:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]
      "
    >
      <div
        dir="rtl"
        className="
          mx-auto
          px-4 sm:px-6 lg:px-8
          py-12 lg:py-16
          max-w-4xl md:max-w-5xl lg:max-w-6xl 2xl:max-w-7xl
        "
      >
        <section className="grid gap-8 md:grid-cols-[1.4fr_1fr] items-start mb-10 md:mb-14">
          <div className="space-y-6 text-right">
            <div>
              <h1
                className="
                  text-3xl sm:text-4xl lg:text-5xl xl:text-[3.1rem]
                  font-semibold text-slate-900
                "
              >
                وبلاگ پاک‌نویس
              </h1>
              <p
                className="
                  mt-3
                  text-sm sm:text-base lg:text-[1.05rem] xl:text-[1.1rem]
                  text-slate-500 max-w-xl leading-relaxed
                "
              >
                اینجا آخرین نکته‌ها درباره محتوا، تجربه مشتری و رشد محصول را
                می‌خوانید. هر هفته با داستان‌ها و نمونه‌های تازه برمی‌گردیم.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 max-w-md ml-auto">
              <input
                type="search"
                placeholder="جست‌وجوی موضوع، کلیدواژه یا عنوان..."
                className="
                  flex-1 rounded-full border border-slate-200 bg-white
                  px-4 py-2.5
                  text-sm md:text-base lg:text-[1.05rem]
                  outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900
                "
              />
              <button
                className="
                  inline-flex items-center justify-center rounded-full
                  bg-slate-900 px-5 py-2.5
                  text-sm md:text-base lg:text-[1.05rem]
                  font-medium text-white
                  hover:bg-slate-800 transition
                "
              >
                جست‌وجو
              </button>
            </div>
          </div>
        </section>

        <section className="mb-8 border-b border-slate-200">
          <div
            className="
              flex flex-wrap gap-4
              text-sm md:text-[0.95rem] lg:text-base
              text-slate-500
            "
          >
            <button className="border-b-2 border-slate-900 pb-3 text-slate-900 font-medium cursor-pointer">
              همه
            </button>
            <button className="pb-3 hover:text-slate-900 cursor-pointer">
              تازه‌ها
            </button>
            <button className="pb-3 hover:text-slate-900 cursor-pointer">
              بازاریابی و رشد
            </button>
            <button className="pb-3 hover:text-slate-900 cursor-pointer">
              تجربه مشتری
            </button>
            <button className="pb-3 hover:text-slate-900 cursor-pointer">
              راهنمای تولید محتوا
            </button>
            <button className="pb-3 hover:text-slate-900 cursor-pointer">
              فرهنگ تیم و پشت‌صحنه
            </button>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.id} className="space-y-4">
              <div className="relative overflow-hidden rounded-3xl bg-slate-200">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="
                    h-56 w-full object-cover
                    sm:h-64 lg:h-72 xl:h-80
                  "
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-slate-900/75 via-slate-900/40 to-transparent backdrop-blur-[2px]" />
                <div
                  className="
                    absolute inset-x-0 bottom-0
                    p-4 sm:p-5
                    flex items-end justify-between
                    text-xs sm:text-sm lg:text-[0.95rem]
                    text-white
                  "
                >
                  <div className="space-y-1">
                    <p className="font-medium">{post.author}</p>
                    <p className="text-white/80">{post.date}</p>
                  </div>
                  <span
                    className="
                      rounded-full bg-white/15
                      px-3 py-1
                      text-[11px] sm:text-xs lg:text-[0.8rem]
                    "
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-right">
                <h2
                  className="
                    text-lg sm:text-xl lg:text-2xl xl:text-[1.6rem]
                    font-semibold text-slate-900
                  "
                >
                  {post.title}
                </h2>
                <p
                  className="
                    text-sm text-slate-500 leading-relaxed
                    md:text-[0.95rem] lg:text-base xl:text-[1.05rem]
                  "
                >
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="
                    mt-1 inline-flex items-center gap-1
                    text-sm md:text-[0.95rem] lg:text-base
                    font-medium text-slate-900 hover:underline
                  "
                >
                  مطالعه مطلب
                  <span aria-hidden>←</span>
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
