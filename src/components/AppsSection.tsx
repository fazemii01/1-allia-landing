"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export default function AppsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Audio Hypnosleep & Buku Terapi Mandiri",
      description: "Dukung terapi anak di rumah dengan audio relaksasi tidur (hypnosleep) khusus untuk mengatasi fobia makanan (fobia nasi) atau kecemasan, didampingi buku panduan praktis orang tua.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600",
      btnText: "Beli / Tanya Produk",
      btnHref: "https://api.whatsapp.com/send?phone=6281334455616&text=Halo%20Allia%20Kids%2C%20saya%20tertarik%20dengan%20produk%20Audio%20Hypnosleep%20dan%20Buku%20Terapi",
      isExternal: true,
    },
    {
      title: "Analisis Sidik Jari Bakat (Fingertip Analysis)",
      description: "Ungkap potensi kecerdasan majemuk bawaan, bakat dominan, serta tipe kepribadian dan gaya belajar yang paling cocok untuk anak sejak usia dini melalui pola sidik jari.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600",
      btnText: "Daftar Analisis Bakat",
      btnHref: "/layanan/sidik-jari-bakat",
      isExternal: false,
    },
  ];

  const handleNext = () => {
    setActiveTab((prev) => (prev + 1) % tabs.length);
  };

  const handlePrev = () => {
    setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length);
  };

  return (
    <section className="container mx-auto px-4 lg:px-10 mb-32 relative">
      <div className="bg-wellme-100/50 border border-wellme-100 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
        <div className="flex items-center gap-6 lg:gap-12">
          {/* Navigation Prev Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="hidden lg:flex shrink-0 rounded-full size-12 bg-white hover:bg-wellme-primary hover:text-white text-wellme-primary transition-all duration-300 items-center justify-center shadow-md cursor-pointer"
          >
            <ChevronLeftIcon size={20} />
          </button>

          {/* Tab Content Wrapper */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16">
            {/* Left Column: Text Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 lg:gap-6 order-2 lg:order-1 animate-fade-in">
              <h2 className="text-wellme-primary-gradient text-2xl lg:text-3xl font-extrabold">
                {tabs[activeTab].title}
              </h2>
              <p className="text-sm lg:text-base text-grey-400 font-semibold leading-relaxed max-w-lg">
                {tabs[activeTab].description}
              </p>

              {/* Action Link Button */}
              <div className="flex items-center gap-4 mt-2">
                {tabs[activeTab].isExternal ? (
                  <a
                    href={tabs[activeTab].btnHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient border border-wellme-secondary hover:border-wellme-primary text-sm text-white font-bold px-8 py-3 transition-all duration-300 shadow-md hover:scale-105"
                  >
                    {tabs[activeTab].btnText}
                  </a>
                ) : (
                  <Link
                    href={tabs[activeTab].btnHref}
                    className="rounded-full bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient border border-wellme-secondary hover:border-wellme-primary text-sm text-white font-bold px-8 py-3 transition-all duration-300 shadow-md hover:scale-105"
                  >
                    {tabs[activeTab].btnText}
                  </Link>
                )}
              </div>
            </div>

            {/* Right Column: Visual Artwork */}
            <div className="w-full h-[220px] lg:h-[320px] relative rounded-2xl overflow-hidden shadow-md order-1 lg:order-2 border border-white">
              <img
                className="w-full h-full object-cover transition-all duration-1000"
                src={tabs[activeTab].image}
                alt={tabs[activeTab].title}
              />
            </div>
          </div>

          {/* Navigation Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="hidden lg:flex shrink-0 rounded-full size-12 bg-white hover:bg-wellme-primary hover:text-white text-wellme-primary transition-all duration-300 items-center justify-center shadow-md cursor-pointer"
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>

        {/* Small screen pagination pagination bullets */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {tabs.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeTab ? "w-6 bg-wellme-primary" : "w-2 bg-grey-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
