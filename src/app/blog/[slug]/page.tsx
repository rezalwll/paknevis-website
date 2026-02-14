import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPostBySlug, posts } from "../posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "مطلب پیدا نشد | وبلاگ پاک‌نویس",
    };
  }

  return {
    title: `${post.title} | وبلاگ پاک‌نویس`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | وبلاگ پاک‌نویس`,
      description: post.excerpt,
      images: [
        {
          url: post.imageUrl,
          alt: post.title,
        },
      ],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

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
          max-w-3xl md:max-w-4xl lg:max-w-5xl
        "
      >
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/blog" className="hover:text-slate-900 font-medium">
            وبلاگ
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 truncate max-w-[70%]">{post.title}</span>
        </nav>

        <article className="space-y-7 text-right">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="font-medium text-slate-800">{post.author}</span>
              <span className="text-slate-300">|</span>
              <span>{post.date}</span>
              <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-[11px] sm:text-xs text-slate-700">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 leading-snug">
              {post.title}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-64 w-full object-cover sm:h-72 lg:h-80"
            />
          </div>

          <div className="space-y-4 text-slate-700 leading-relaxed md:text-[1.02rem]">
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-4">
            <Link
              href="/blog"
              className="
                inline-flex items-center gap-1
                text-sm md:text-base
                font-medium text-slate-900 hover:underline
              "
            >
              ← بازگشت به وبلاگ
            </Link>
            <span className="text-xs text-slate-400">
              زمان خواندن تقریبی: ۳ دقیقه
            </span>
          </div>
        </article>
      </div>
    </main>
  );
}
