// File: app/components/layout/Hero.tsx
"use client";

import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

export type HeroButton = {
  text: string;
  href: string;
  /**
   * primary | secondary | any valid Tailwind class string
   */
  variant?: "primary" | "secondary" | string;
  /**
   * optional custom classes on this button
   */
  className?: string;
};

export interface HeroProps {
  /** تیتر بزرگ Hero */
  title: string;
  /** توضیح کوتاه زیر تیتر */
  description?: string;
  /** آدرس تصویر برای سمت چپ */
  imageSrc: string;
  useVideo?: boolean;
  videoSrc?: string;
  videoClassName?: string;
  videoType?: string;
  /** متن جایگزین تصویر */
  imageAlt?: string;
  /** آرایه دکمه‌های فراخوان عمل (می‌تواند خالی باشد) */
  buttons?: HeroButton[];
  /** کلاس‌های سفارشی کانتینر کلی بخش Hero */
  className?: string;
  /** کلاس‌های سفارشی برای بلوک تصویر */
  imageClassName?: string;
  /** کلاس‌های سفارشی برای بلوک متن */
  contentClassName?: string;
  /** کلاس‌های سفارشی برای تیتر */
  titleClassName?: string;
  /** کلاس‌های سفارشی برای توضیح */
  descriptionClassName?: string;
  /** کلاس‌های سفارشی برای کانتینر دکمه‌ها */
  buttonsContainerClassName?: string;
  /** کلاس‌های پیش‌فرض دکمه‌ها */
  buttonClassName?: string;
}

const Hero: FC<HeroProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  videoSrc,
  videoType = "video/mp4",
  useVideo = false,
  buttons = [],
  className = "",
  imageClassName = "",
  contentClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonsContainerClassName = "",
  buttonClassName = "",
}) => {
  const renderButton = (btn: HeroButton, idx: number) => {
    // بر اساس variant کلاس پایه را انتخاب می‌کنیم
    const base =
      btn.variant === "secondary"
        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
        : "bg-blue-600 text-white hover:bg-blue-700";

    return (
      <Link
        key={idx}
        href={btn.href}
        className={`
          inline-block rounded px-6 py-3 font-medium transition
          ${base} ${buttonClassName} ${btn.className ?? ""}
        `}
      >
        {btn.text}
      </Link>
    );
  };

  return (
    <section className={`w-full  bg-white ${className}`}>
      <div className="container mx-auto h-full w-full text-right flex flex-col items-center justify-between gap-10 md:flex-row">
        {/* محتوا سمت راست */}
        <div
          className={`
                   flex flex-col justify-center items-center md:items-start 
                   space-y-6
                      pr-10 
                ${contentClassName} 
                     `}
        >
          <h1
            className={`
      text-3xl  leading-tight 
      md:text-4xl  2xl:text-5xl
      ${titleClassName}
    `}
          >
            {title}
          </h1>

          {description && (
            <p
              className={`text-xl max-w-lg text-justify text-gray-600 ${descriptionClassName}`}
            >
              {description}
            </p>
          )}

          {buttons.length > 0 && (
            <div
              className={`
        flex flex-wrap justify-center md:justify-start 
        gap-4 
        ${buttonsContainerClassName}
      `}
            >
              {buttons.map(renderButton)}
            </div>
          )}
        </div>

        {/* تصویر سمت چپ */}
        <div className={`w-full md:w-1/2 mx-auto ${imageClassName}`}>
          {useVideo && videoSrc ? (
            <video autoPlay loop muted>
              <source src={videoSrc} type={videoType} />
            </video>
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              width={600}
              height={600}
              className=""
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
