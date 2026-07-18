"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayananIndividualIcon,
  LayananCoupleIcon,
  LayananFamilyIcon,
  LayananMhcuIcon,
  LayananHipnoterapiIcon,
  LayananOnlineIcon
} from "./icons";

const STATIC_SERVICES = [
  {
    title: "Hipnoterapi Anak",
    description: "Terapi bawah sadar yang aman dan menyenangkan untuk membantu mengatasi berbagai hambatan emosi dan mental pada anak.",
    icon: LayananHipnoterapiIcon,
    href: "/layanan/hipnoterapi-anak",
    price: "Rp 550.000 / Sesi",
    subServices: [
      "Terapi Emosi & Perilaku",
      "Terapi Konsentrasi & Fokus Belajar",
      "Terapi Percaya Diri & Sosialisasi",
      "Terapi Gangguan Tidur & Mimpi Buruk",
      "Terapi Pengendalian Kebiasaan Buruk",
      "Terapi Kecemasan & Fobia"
    ],
    promo_active: false,
    promo_label: "",
    promo_price: "",
    promo_ends_at: null
  },
  {
    title: "Terapi Wicara",
    description: "Terapi wicara terstruktur untuk mendampingi anak yang mengalami keterlambatan bicara (speech delay) dan kesulitan artikulasi.",
    icon: LayananIndividualIcon,
    href: "/layanan/terapi-wicara",
    price: "Rp 150.000 - Rp 250.000 / Sesi",
    subServices: [
      "Skrining Artikulasi & Wicara",
      "Terapi Speech Delay Anak",
      "Stimulasi Bahasa Ekspresif"
    ],
    promo_active: false,
    promo_label: "",
    promo_price: "",
    promo_ends_at: null
  },
  {
    title: "Terapi Perilaku",
    description: "Pendampingan modifikasi perilaku untuk melatih fokus anak, menangani tantrum berlebih, kecenderungan ADHD, dan autisme.",
    icon: LayananCoupleIcon,
    href: "/layanan/terapi-perilaku",
    price: "Rp 150.000 - Rp 250.000 / Sesi",
    subServices: [
      "Modifikasi Perilaku Tantrum",
      "Fokus & Kepatuhan Instruksi",
      "Sensory & Motoric Integration"
    ],
    promo_active: false,
    promo_label: "",
    promo_price: "",
    promo_ends_at: null
  },
  {
    title: "Skrining Tumbuh Kembang",
    description: "Deteksi tumbuh kembang anak usia 1-5 tahun secara holistik untuk memantau pencapaian milestone motorik & sosial anak.",
    icon: LayananFamilyIcon,
    href: "/layanan/tumbuh-kembang",
    price: "Rp 150.000 / Sesi",
    subServices: [
      "Pemeriksaan Motorik & Kognitif",
      "Evaluasi Sosial-Emosional",
      "Skrining Milestone Tumbuh Kembang"
    ],
    promo_active: false,
    promo_label: "",
    promo_price: "",
    promo_ends_at: null
  },
  {
    title: "Analisis Sidik Jari Bakat",
    description: "Pemetaan kecerdasan majemuk, potensi bakat alami, serta gaya belajar dominan anak melalui pola sidik jari.",
    icon: LayananMhcuIcon,
    href: "/layanan/sidik-jari-bakat",
    price: "Rp 350.000 / Sesi",
    subServices: [
      "Test Bakat Sidik Jari Allia Kids",
      "Pemetaan Gaya Belajar (V-A-K)",
      "Konseling Bakat Bawaan Lahir"
    ],
    promo_active: false,
    promo_label: "",
    promo_price: "",
    promo_ends_at: null
  }
];

function getServiceIcon(slug: string) {
  const s = slug.toLowerCase();
  if (s.includes("hipnoterapi") || s.includes("nasi") || s.includes("takut")) return LayananHipnoterapiIcon;
  if (s.includes("wicara")) return LayananIndividualIcon;
  if (s.includes("perilaku")) return LayananCoupleIcon;
  if (s.includes("tumbuh-kembang") || s.includes("skrining")) return LayananFamilyIcon;
  if (s.includes("sidik-jari") || s.includes("bakat") || s.includes("analisis")) return LayananMhcuIcon;
  if (s.includes("jari-matik") || s.includes("magic") || s.includes("bimbel")) return LayananOnlineIcon;
  return LayananIndividualIcon;
}

export default function ServicesSection() {
  const [services, setServices] = useState<any[]>(STATIC_SERVICES);

  useEffect(() => {
    async function fetchServices() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9000";
        const res = await fetch(`${apiUrl}/api/layanan`);
        if (!res.ok) throw new Error("Gagal mengambil data layanan");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item: any) => ({
            title: item.title,
            description: item.description,
            icon: getServiceIcon(item.slug),
            href: `/layanan/${item.slug}`,
            price: item.stats?.mulai_dari || "Hubungi Kami",
            subServices: item.isu_permasalahan || [],
            promo_active: item.promo_active,
            promo_label: item.promo_label,
            promo_price: item.promo_price,
            promo_ends_at: item.promo_ends_at
          }));
          setServices(mapped);
        }
      } catch (err) {
        console.error("Gagal mengambil layanan dinamis, menggunakan fallback statis:", err);
      }
    }
    fetchServices();
  }, []);

  const getRemainingDaysText = (endsAt?: string | null) => {
    if (!endsAt) return null;
    const diff = new Date(endsAt).getTime() - Date.now();
    if (diff <= 0) return null;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days === 1 ? "Terakhir hari ini!" : `Sisa ${days} hari lagi`;
  };

  const getDiscountText = (label: string) => {
    if (!label) return null;
    const match = label.match(/(\d+)%/);
    return match ? `Hemat ${match[1]}%` : "Promo Spesial";
  };

  return (
    <div className="w-full">
      <section className="container mx-auto px-4 lg:px-10 text-center mb-6">
        <h2 className="text-wellme-primary-gradient text-3xl lg:text-4xl font-extrabold mb-4">
          Layanan Terapi Allia Kids
        </h2>
        <p className="text-sm lg:text-base text-grey-450 font-semibold max-w-2xl mx-auto leading-relaxed">
          Temukan dukungan tumbuh kembang optimal dan pemulihan emosional
          <br className="hidden lg:block" /> terbaik untuk masa depan buah hati Anda bersama Allia Kids
        </p>
      </section>

      <section className="bg-white-wellme mb-32 border-y border-grey-150">
        <div className="container mx-auto px-4 lg:px-10 py-12">
          <div className="flex flex-wrap justify-center -m-3">
            {services.map((service, index) => {
              const remainingDays = getRemainingDaysText(service.promo_ends_at);
              const discountText = getDiscountText(service.promo_label);
              
              const CardContent = (
                <div className="rounded-3xl border border-grey-200 bg-white w-full h-full shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 group flex flex-col justify-between overflow-hidden">

                  {/* Promo Banner Strip — only shown when promo is active */}
                  {service.promo_active && (
                    <div className="bg-gradient-to-r from-[#0f2d4a] to-[#1c72bb] px-5 py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🔥</span>
                        <div>
                          <p className="text-white text-[10px] font-semibold uppercase tracking-widest opacity-80 leading-none">Penawaran Terbatas</p>
                          <p className="text-amber-300 text-xs font-extrabold leading-tight">{service.promo_label}</p>
                        </div>
                      </div>
                      {service.promo_ends_at && getRemainingDaysText(service.promo_ends_at) && (
                        <span className="text-white/70 text-[9px] font-bold bg-white/10 px-2 py-0.5 rounded-full border border-white/20 shrink-0">
                          ⏱ {getRemainingDaysText(service.promo_ends_at)}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-7 flex flex-col flex-grow">
                    <div>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="shrink-0 transition-all duration-300 group-hover:scale-105">
                          <service.icon size={56} />
                        </div>
                        <div className="flex flex-col gap-1 flex-grow">
                          <h3 className="font-bold text-lg text-wellme-primary group-hover:text-wellme-secondary transition-colors duration-200 leading-snug">
                            {service.title}
                          </h3>
                          <p className="text-sm text-grey-400 font-medium leading-relaxed mt-1">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Sub-services list */}
                      {service.subServices && service.subServices.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {service.subServices.map((sub: string, sIdx: number) => (
                            <span
                              key={sIdx}
                              className="text-[10px] font-bold bg-slate-50 text-wellme-primary px-3 py-1.5 rounded-full border border-grey-150 transition-colors duration-200 group-hover:bg-[#EBF3FC]"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Pricing footer */}
                    <div className="mt-6 pt-5 border-t border-grey-100">
                      {service.promo_active && service.promo_price ? (
                        <div className="flex items-end justify-between gap-3">
                          <div className="flex flex-col">
                            <span className="text-[11px] text-grey-350 line-through font-medium mb-0.5">{service.price}</span>
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="text-[#0f2d4a] text-xl font-extrabold tracking-tight leading-none">{service.promo_price}</span>
                              {discountText && (
                                <span className="inline-flex items-center bg-amber-400 text-[#0f2d4a] text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                                  {discountText}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-xs font-bold text-wellme-primary group-hover:translate-x-1.5 transition-transform duration-300 flex items-center gap-1 shrink-0 pb-0.5">
                            Detail &rarr;
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-4 w-full">
                          <span className="text-wellme-secondary text-base lg:text-lg font-extrabold">
                            {service.price}
                          </span>
                          <span className="text-xs font-bold text-wellme-primary group-hover:translate-x-1.5 transition-transform duration-300 flex items-center gap-1 shrink-0">
                            Detail Layanan &rarr;
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );

              return (
                <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-3">
                  <Link href={service.href} className="block h-full">
                    {CardContent}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

