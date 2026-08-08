"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { bannersApi, BannerItem } from "@/lib/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

function resolveUrl(url: string | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_BASE}${url}`;
}

export default function PopUpBannerModal() {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPopups() {
      try {
        setIsLoading(true);
        const list = await bannersApi.getAll("popup");
        if (Array.isArray(list) && list.length > 0) {
          const activePopups = list.filter((b) => b.is_active !== false);
          if (activePopups.length > 0) {
            setBanners(activePopups);
            setIsOpen(true);
          }
        }
      } catch (err) {
        console.warn("Gagal memuat popup banner:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPopups();
  }, []);

  // Carousel timer auto slide
  useEffect(() => {
    if (!isOpen || banners.length <= 1) return;

    const currentBanner = banners[currentIndex];
    const delayMs = (currentBanner?.popup_delay || 3) * 1000;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [isOpen, currentIndex, banners]);

  if (!isOpen || banners.length === 0) return null;

  const currentBanner = banners[currentIndex];
  const desktopImg = resolveUrl(currentBanner.image_url);
  const mobileImg = resolveUrl(currentBanner.mobile_image_url || currentBanner.image_url);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleBannerClick = () => {
    if (currentBanner.href) {
      if (currentBanner.href.startsWith("http")) {
        window.open(currentBanner.href, "_blank");
      } else {
        window.location.href = currentBanner.href;
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-all duration-300 animate-fade-in">
      {/* Click outside backdrop to close */}
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

      {/* Modal Container */}
      <div className="relative z-10 max-w-4xl w-full mx-auto bg-transparent rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center group">
        
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all shadow-lg backdrop-blur-md cursor-pointer border border-white/20"
          title="Tutup Banner"
        >
          <X size={20} />
        </button>

        {/* Carousel Image Container */}
        <div
          onClick={handleBannerClick}
          className={`relative w-full overflow-hidden rounded-3xl border border-white/20 shadow-2xl ${
            currentBanner.href ? "cursor-pointer" : "cursor-default"
          }`}
        >
          {/* Desktop Banner Image (Landscape) */}
          <div className="hidden md:block w-full">
            <img
              src={desktopImg}
              alt={currentBanner.title || "Pop-Up Banner Allia Kids"}
              className="w-full h-auto max-h-[80vh] object-contain mx-auto rounded-3xl transition-transform duration-500 hover:scale-[1.01]"
            />
          </div>

          {/* Mobile Banner Image (Portrait/Square) */}
          <div className="block md:hidden w-full">
            <img
              src={mobileImg}
              alt={currentBanner.title || "Pop-Up Banner Allia Kids"}
              className="w-full h-auto max-h-[75vh] object-contain mx-auto rounded-3xl transition-transform duration-500"
            />
          </div>

          {/* Carousel Next / Prev Controls (Shown if multiple banners) */}
          {banners.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all shadow-md backdrop-blur-md cursor-pointer border border-white/10"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all shadow-md backdrop-blur-md cursor-pointer border border-white/10"
              >
                <ChevronRight size={22} />
              </button>

              {/* Carousel Pagination Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex ? "w-6 bg-wellme-secondary" : "w-2.5 bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
