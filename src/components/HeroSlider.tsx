"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

const STATIC_SLIDES = [
  {
    href: "https://api.whatsapp.com/send?phone=6281334455616&text=Halo%20Allia%20Kids",
    bgImage: "/assets/img/banner/announcement-1.png",
    fallbackBgImage: "https://alliakids.com/wp-content/uploads/2025/09/Tidak-Ada-Akun-Admin-Tidak-Ada-Rekapan-Tidak-Pernah-DM-atau.png"
  },
  {
    href: "https://api.whatsapp.com/send?phone=6281334455616&text=Halo%20Allia%20Kids",
    bgImage: "/assets/img/banner/announcement-2.png",
    fallbackBgImage: "https://alliakids.com/wp-content/uploads/2026/02/Tidak-Ada-Akun-Admin-Tidak-Ada-Rekapan-Tidak-Pernah-DM-atau-1.png"
  },
  {
    href: "/apply",
    bgImage: "/assets/img/banner/banner-1.png",
    fallbackBgImage: "https://alliakids.com/wp-content/uploads/2026/02/1.png"
  },
  {
    href: "/apply",
    bgImage: "/assets/img/banner/banner-2.png",
    fallbackBgImage: "https://alliakids.com/wp-content/uploads/2026/02/2.png"
  },
  {
    href: "/layanan/sidik-jari-bakat",
    bgImage: "/assets/img/banner/banner-3.png",
    fallbackBgImage: "https://alliakids.com/wp-content/uploads/2026/02/3.png"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<any[]>(STATIC_SLIDES);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await fetch("https://backend.alliakids.com/api/banners");
        if (!res.ok) throw new Error("Gagal mengambil data banner");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((b: any) => ({
            href: b.href || "#",
            bgImage: b.image_url,
            fallbackBgImage: b.image_url,
          }));
          setSlides(mapped);
        }
      } catch (err) {
        console.error("Gagal mengambil banner dinamis, menggunakan banner statis:", err);
      }
    }
    fetchBanners();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <header className="-mt-20 relative w-full h-[40dvh] sm:h-[60dvh] lg:h-[88dvh] overflow-hidden bg-neutral-100">
      {/* Slide Container */}
      <div className="relative h-full w-full flex items-center z-20">
        {slides.map((slide, index) => (
          <Link
            key={index}
            href={slide.href}
            className={`absolute inset-0 block transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 pointer-events-auto scale-100"
                : "opacity-0 pointer-events-none scale-102"
            }`}
          >
            <img
              src={slide.bgImage}
              alt="Allia Kids Banner"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = slide.fallbackBgImage;
              }}
            />
          </Link>
        ))}
      </div>

      {/* Manual Slider Navigation */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/25 hover:bg-black/45 text-white backdrop-blur-sm transition-all duration-200 cursor-pointer hidden sm:block shadow-sm"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon size={24} />
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/25 hover:bg-black/45 text-white backdrop-blur-sm transition-all duration-200 cursor-pointer hidden sm:block shadow-sm"
        aria-label="Next slide"
      >
        <ChevronRightIcon size={24} />
      </button>

      {/* Bullet Pagination Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-wellme-primary" : "w-2.5 bg-black/20"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </header>
  );
}
