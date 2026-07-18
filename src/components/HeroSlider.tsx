"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

const STATIC_SLIDES: never[] = [];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:9000';
        const res = await fetch(`${apiUrl}/api/banners`);
        if (!res.ok) throw new Error("Gagal mengambil data banner");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const normalizeUrl = (url: string) => {
            if (!url) return url;
            return url
              .replace('http://194.233.91.132:19000', 'https://storage.alliago.id')
              .replace('http://storage.alliago.id', 'https://storage.alliago.id');
          };
          const mapped = data
            .filter((b: any) => b.is_active)
            .map((b: any) => ({
              href: b.href || '#',
              bgImage: normalizeUrl(b.image_url),
              mobileImage: normalizeUrl(b.mobile_image_url || b.image_url),
              fallbackBgImage: normalizeUrl(b.image_url),
            }));
          setSlides(mapped);
        }
      } catch (err) {
        console.error("Gagal mengambil banner:", err);
      } finally {
        setLoading(false);
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
      {/* Loading skeleton */}
      {loading && (
        <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
      )}
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
            <picture className="w-full h-full block">
              <source media="(max-width: 767px)" srcSet={slide.mobileImage || slide.bgImage} />
              <img
                src={slide.bgImage}
                alt="Allia Kids Banner"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.src = slide.fallbackBgImage;
                }}
              />
            </picture>
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
