"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon, CloseIcon, HomeIcon, EditIcon, CalendarIcon, ClipboardIcon, ChatIcon, LayananIndividualIcon, LayananCoupleIcon, LayananFamilyIcon, LayananMhcuIcon, LayananHipnoterapiIcon, LayananOnlineIcon, EdukasiCekIcon, EdukasiBukuIcon, EdukasiArtikelIcon, EdukasiGaleriIcon } from "./icons";

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pName, setPName] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const logged = localStorage.getItem("isLoggedIn");
      if (logged === "true") {
        setIsLoggedIn(true);
        setPName(localStorage.getItem("parentName") || "Orang Tua");
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      if (educationRef.current && !educationRef.current.contains(event.target as Node)) {
        setIsEducationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const services = [
    {
      title: "Hipnoterapi Anak & Dewasa",
      description: "Mengatasi trauma, kecemasan, fobia makanan (takut nasi), ngompol, dan meningkatkan motivasi belajar.",
      icon: LayananHipnoterapiIcon,
      href: "/layanan/hipnoterapi-anak",
    },
    {
      title: "Terapi Wicara",
      description: "Pendampingan untuk anak dengan keterlambatan wicara (speech delay), artikulasi, dan gangguan komunikasi.",
      icon: LayananIndividualIcon,
      href: "/layanan/terapi-wicara",
    },
    {
      title: "Terapi Perilaku",
      description: "Terapi pembiasaan positif untuk anak dengan hiperaktivitas, tantrum, ADHD/ADD, dan Autisme.",
      icon: LayananCoupleIcon,
      href: "/layanan/terapi-perilaku",
    },
    {
      title: "Skrining Tumbuh Kembang",
      description: "Evaluasi milestone perkembangan motorik, sensorik, kognitif, dan sosial-emosional anak usia 1-5 tahun.",
      icon: LayananFamilyIcon,
      href: "/layanan/tumbuh-kembang",
    },
    {
      title: "Analisis Sidik Jari Bakat",
      description: "Asesmen potensi kecerdasan majemuk, bakat bawaan, serta gaya belajar optimal anak sejak dini.",
      icon: LayananMhcuIcon,
      href: "/layanan/sidik-jari-bakat",
    },
    {
      title: "Bimbel Jari Matik Magic",
      description: "Metode berhitung cepat menggunakan 10 jari tangan secara praktis, mudah, dan menyenangkan bagi anak.",
      icon: LayananOnlineIcon,
      href: "/layanan/jari-matik-magic",
    },
  ];

  const educationItems = [
    {
      title: "Cek Perkembangan",
      description: "Skrining mandiri tumbuh kembang, emosi, dan gaya belajar anak.",
      icon: EdukasiCekIcon,
      href: "/tespsikologi",
    },
    {
      title: "Buku Saku Parenting",
      description: "Panduan praktis pola asuh dan stimulasi tumbuh kembang anak.",
      icon: EdukasiBukuIcon,
      href: "/buku-saku",
    },
    {
      title: "Artikel Parenting",
      description: "Kumpulan artikel edukatif seputar anak dan tumbuh kembang.",
      icon: EdukasiArtikelIcon,
      href: "/artikel",
    },
    {
      title: "Galeri Kegiatan",
      description: "Momen seru dokumentasi kelas, terapi, dan workshop Allia Kids.",
      icon: EdukasiGaleriIcon,
      href: "/galeri",
    },
  ];

  return (
    <>
      <nav className="container mx-auto px-4 lg:px-10 sticky top-[16px] left-0 right-0 z-50">
      <div className="rounded-full bg-white/80 backdrop-blur-lg shadow-md px-4 lg:px-6 py-3 lg:py-4 z-20 relative border border-grey-100">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <span className="font-cursive text-2xl lg:text-3xl text-wellme-primary select-none">
              Allia Kids
            </span>
          </Link>
 
          {/* Desktop Navigation */}
          <div className="items-center gap-6 text-sm hidden lg:flex">
            <div className="flex items-center gap-6 text-grey-400 font-medium">
              {/* Layanan Terapi Dropdown */}
              <div
                ref={dropdownRef}
                className=""
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsServicesOpen(!isServicesOpen);
                    setIsEducationOpen(false);
                  }}
                  className="flex items-center gap-2 hover:text-wellme-primary font-semibold transition-colors duration-200 cursor-pointer"
                >
                  Layanan Terapi
                  <ChevronDownIcon size={18} className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
 
                {/* Dropdown Menu */}
                {isServicesOpen && (
                  <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 w-full">
                    <div className="bg-white border border-grey-200 shadow-xl rounded-b-3xl rounded-t-xl p-6 animate-zoom-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map((service, index) => (
                          <Link
                            key={index}
                            href={service.href}
                            onClick={() => setIsServicesOpen(false)}
                            className="flex gap-4 p-4 hover:bg-white-wellme rounded-xl border border-transparent hover:border-grey-200 transition-all duration-200 group relative"
                          >
                            <div className="shrink-0 flex items-center justify-center">
                              <service.icon size={52} />
                            </div>
                            <div className="flex flex-col gap-1 pr-6">
                              <div className="font-bold text-wellme-primary group-hover:text-wellme-secondary transition-colors text-base">{service.title}</div>
                              <div className="text-xs text-grey-caption leading-relaxed font-semibold">{service.description}</div>
                            </div>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-grey-300 group-hover:text-wellme-secondary transition-colors">
                              ➔
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Edukasi & Skrining Dropdown */}
              <div
                ref={educationRef}
                className=""
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsEducationOpen(!isEducationOpen);
                    setIsServicesOpen(false);
                  }}
                  className="flex items-center gap-2 hover:text-wellme-primary font-semibold transition-colors duration-200 cursor-pointer"
                >
                  Edukasi & Skrining
                  <ChevronDownIcon size={18} className={`transition-transform duration-200 ${isEducationOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isEducationOpen && (
                  <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 w-full">
                    <div className="bg-white border border-grey-200 shadow-xl rounded-b-3xl rounded-t-xl p-6 animate-zoom-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {educationItems.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            onClick={() => setIsEducationOpen(false)}
                            className="flex gap-4 p-4 hover:bg-white-wellme rounded-xl border border-transparent hover:border-grey-200 transition-all duration-200 group relative"
                          >
                            <div className="shrink-0 flex items-center justify-center">
                              <item.icon size={52} />
                            </div>
                            <div className="flex flex-col gap-1 pr-6">
                              <div className="font-bold text-wellme-primary group-hover:text-wellme-secondary transition-colors text-base">{item.title}</div>
                              <div className="text-xs text-grey-caption leading-relaxed font-semibold">{item.description}</div>
                            </div>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-grey-300 group-hover:text-wellme-secondary transition-colors">
                              ➔
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/cari-psikolog?tab=all" className="hover:text-wellme-primary transition-colors duration-200 font-semibold">
                List Terapis & Psikolog
              </Link>
              <Link href="/about" className="hover:text-wellme-primary transition-colors duration-200 font-semibold">
                Tentang Kami
              </Link>
              {/* <Link href="/artikel" className="hover:text-wellme-primary transition-colors duration-200 font-semibold">
                Artikel
              </Link>
              <Link href="/galeri" className="hover:text-wellme-primary transition-colors duration-200 font-semibold">
                Galeri
              </Link> */}
              {/* <Link href="/partnership" className="hover:text-wellme-primary transition-colors duration-200 font-semibold">
                Kolaborasi
              </Link> */}
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center gap-1.5">
              <Link
                href="/apply"
                className="rounded-l-3xl rounded-r-lg bg-wellme-secondary-gradient text-white font-medium px-6 py-[10px] hover:brightness-110 transition-all duration-300 shadow-sm text-center"
              >
                Booking Sesi
              </Link>
              {isLoggedIn ? (
                <Link
                  href="/portal"
                  className="rounded-r-3xl rounded-l-lg bg-[#EBF3FC] text-wellme-primary hover:bg-[#E2EEFC] font-bold px-6 py-[10px] transition-all duration-300 shadow-sm text-center"
                >
                  Portal Saya
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="rounded-r-3xl rounded-l-lg bg-wellme-primary-gradient text-white font-medium px-6 py-[10px] hover:brightness-110 transition-all duration-300 shadow-sm cursor-pointer text-center"
                >
                  Masuk
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            {isLoggedIn ? (
              <Link
                href="/portal"
                className="rounded-full bg-[#EBF3FC] text-sm text-wellme-primary font-bold px-5 py-[8px] hover:bg-[#E2EEFC] transition-all text-center"
              >
                Portal
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-wellme-primary-gradient text-sm text-white font-medium px-5 py-[8px] hover:brightness-110 transition-all duration-300 text-center"
              >
                Masuk
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-grey-500 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <CloseIcon size={24} />
              ) : (
                <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-[calc(100%+8px)] left-4 right-4 bg-white border border-grey-200 shadow-lg rounded-3xl p-5 flex flex-col gap-4 lg:hidden animate-zoom-in max-h-[75vh] overflow-y-auto z-50">
            <div className="font-semibold text-wellme-primary border-b pb-2">Layanan Terapi</div>
            <div className="flex flex-col gap-3 pl-2">
              {services.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-grey-400 font-medium hover:text-wellme-primary transition-colors"
                >
                  <service.icon size={18} className="text-wellme-primary" />
                  {service.title}
                </Link>
              ))}
            </div>

            <div className="font-semibold text-wellme-primary border-b pb-2 mt-2">Edukasi & Skrining</div>
            <div className="flex flex-col gap-3 pl-2">
              {educationItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-grey-400 font-medium hover:text-wellme-primary transition-colors"
                >
                  <item.icon size={18} className="text-wellme-primary" />
                  {item.title}
                </Link>
              ))}
            </div>

            <hr className="border-grey-150" />
            <Link
              href="/cari-psikolog?tab=all"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-grey-400 font-medium hover:text-wellme-primary transition-colors"
            >
              List Terapis & Psikolog
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-grey-400 font-medium hover:text-wellme-primary transition-colors"
            >
              Tentang Kami
            </Link>
            {/* <Link
              href="/artikel"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-grey-400 font-medium hover:text-wellme-primary transition-colors"
            >
              Artikel
            </Link>
            <Link
              href="/galeri"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-grey-400 font-medium hover:text-wellme-primary transition-colors"
            >
              Galeri
            </Link> */}
            {/* <Link
              href="/partnership"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-grey-400 font-medium hover:text-wellme-primary transition-colors"
            >
              Kolaborasi
            </Link> */}
            <hr className="border-grey-150" />
            <Link
              href="/apply"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center rounded-full bg-wellme-secondary-gradient text-white font-medium py-3 hover:brightness-110 transition-all duration-300"
            >
              Booking Sesi
            </Link>
          </div>
        )}
      </div>
    </nav>
      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 w-full bg-white/80 border-t border-grey-200 backdrop-blur-lg px-4 py-3 lg:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-5 items-center justify-between gap-2">
          <div className="col-span-1">
            <Link href="/" className="text-grey-400 hover:text-wellme-primary flex flex-col items-center justify-center text-center gap-1">
              <HomeIcon size={20} />
              <div className="text-[10px] font-semibold text-nowrap">Beranda</div>
            </Link>
          </div>
          <div className="col-span-1">
            <Link href="/tespsikologi" className="text-grey-400 hover:text-wellme-primary flex flex-col items-center justify-center text-center gap-1">
              <EditIcon size={20} />
              <div className="text-[10px] font-semibold text-nowrap">Tes Psikologi</div>
            </Link>
          </div>
          <div className="col-span-1">
            <Link
              href="/cari-psikolog"
              className="w-14 h-14 rounded-full bg-wellme-primary-gradient text-white font-medium flex items-center justify-center mx-auto -mt-8 shadow-lg hover:brightness-110 transition-all cursor-pointer border-4 border-white"
              aria-label="Cari Psikolog"
            >
              <CalendarIcon size={24} />
            </Link>
          </div>
          <div className="col-span-1">
            <Link href="/cari-psikolog?tab=all" className="text-grey-400 hover:text-wellme-primary flex flex-col items-center justify-center text-center gap-1">
              <ClipboardIcon size={20} />
              <div className="text-[10px] font-semibold text-nowrap">Terapis</div>
            </Link>
          </div>
          <div className="col-span-1">
            <a
              href="https://api.whatsapp.com/send?phone=6281334455616&text=Halo%20Allia%20Kids%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20terapi%20dan%20konsultasi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-grey-400 hover:text-wellme-primary flex flex-col items-center justify-center text-center gap-1"
            >
              <ChatIcon size={20} />
              <div className="text-[10px] font-semibold text-nowrap">Chat Admin</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
