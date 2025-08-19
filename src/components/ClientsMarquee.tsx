"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export type Client = {
  name: string;
  logoSrc: string;
};

const clients: Client[] = [
  { name: "دانشگاه آزاد اسلامی", logoSrc: "/images/azaduni.png" },
  { name: "بانک توسعه صادرات", logoSrc: "/images/banktoseesaderat.png" },
  { name: "سازمان هواپیمایی کشوری", logoSrc: "/images/CAO-IRI-Logo.svg.png" },
  { name: "مجلس شورای اسلامی", logoSrc: "/images/majles.jpg" },
  {
    name: "مرکز پژوهش های مجلس شورای اسلامی",
    logoSrc: "/images/mpajooheshha.jpg",
  },
  { name: "فرماندهی نیروی انتظامی", logoSrc: "/images/NAJA.svg.png" },
  { name: "شرکت ملی صنایع مس ایران", logoSrc: "/images/NCopper.webp" },
  { name: "سازمان بازرسی کل کشور", logoSrc: "/images/sazmanbazresi.jpeg" },
];

export default function ClientsMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const speed = 0.5;

  const duplicatedClients = [...clients, ...clients];

  useEffect(() => {
    const animate = () => {
      if (!isPaused && trackRef.current) {
        positionRef.current -= speed;

        const trackWidth = trackRef.current.scrollWidth / 2;
        if (-positionRef.current >= trackWidth) {
          positionRef.current = 0;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  return (
    <div className="relative overflow-hidden py-10">
      <div
        ref={trackRef}
        className="flex"
        style={{ willChange: "transform" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedClients.map((client, idx) => (
          <div
            key={idx}
            className="flex flex-col flex-shrink-0 items-center justify-center px-6 group"
          >
            <Image
              src={client.logoSrc}
              alt={client.name}
              width={128}
              height={128}
              className="
                w-24 h-24 
                object-contain 
                filter grayscale 
                group-hover:grayscale-0 
                transition duration-300
              "
              onMouseEnter={() => setIsPaused(true)}
            />
            <span className="mt-2 text-sm text-center">{client.name}</span>
          </div>
        ))}
      </div>
      {}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent"></div>

      {}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent"></div>
    </div>
  );
}
