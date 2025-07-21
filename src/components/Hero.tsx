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
  title: string;

  description?: string;

  imageSrc: string;
  useVideo?: boolean;
  videoSrc?: string;
  videoClassName?: string;
  videoType?: string;

  imageAlt?: string;

  buttons?: HeroButton[];

  className?: string;

  imageClassName?: string;

  contentClassName?: string;

  titleClassName?: string;

  descriptionClassName?: string;

  buttonsContainerClassName?: string;

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
    const base =
      btn.variant === "secondary"
        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
        : "bg-primary-400 text-highlight-800 hover:bg-primary-500";

    return (
      <Link
        key={idx}
        href={btn.href}
        className={`
          inline-block rounded px-6 py-3 transition
          ${base} ${buttonClassName} ${btn.className ?? ""}
        `}
      >
        {btn.text}
      </Link>
    );
  };

  return (
    <section dir="rtl" className={`w-full ltr bg-white ${className}`}>
      <div className="container mx-auto h-full w-full text-right flex flex-col items-center justify-between gap-10 md:flex-row">
        {}
        <div
          className={`
                   flex flex-col justify-center items-center md:items-start 
                   space-y-6
                      md:pr-10 px-3
                ${contentClassName} 
                     `}
        >
          <h1
            className={`
      text-2xl text-gray-800
      md:text-3xl  2xl:text-4xl
      ${titleClassName}
    `}
          >
            {title}
          </h1>

          {description && (
            <p
              className={`text-lg max-w-lg text-justify text-gray-600 ${descriptionClassName}`}
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

        {}
        <div className={`w-full md:w-1/2 mx-auto max-md:mt-20 ${imageClassName}`}>
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
