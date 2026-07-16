"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  partnershipApi,
  partnershipWhyUsApi,
  partnershipCollaborationsApi,
  partnershipMomentsApi,
} from "@/lib/api";

const STATIC_PARTNERS = [
  { id: 1, name: "Bathaholic", slug: "bathaholic", logo_url: "/assets/img/logo/partnership/bathaholic.png" },
  { id: 2, name: "Earth Love Life", slug: "earth-love-life", logo_url: "/assets/img/logo/partnership/earth-love-life.png" },
  { id: 3, name: "Kiehlers", slug: "kiehlers", logo_url: "/assets/img/logo/partnership/kiehlers.png" },
  { id: 4, name: "Klamby", slug: "klamby", logo_url: "/assets/img/logo/partnership/klamby.png" },
  { id: 5, name: "Katadata", slug: "katadata", logo_url: "/assets/img/logo/partnership/katadata.png" },
  { id: 6, name: "Calf", slug: "calf", logo_url: "/assets/img/logo/partnership/calf.png" },
  { id: 7, name: "KAI", slug: "kai", logo_url: "/assets/img/logo/partnership/kai.png" },
  { id: 8, name: "Kemenkes", slug: "kemenkes", logo_url: "/assets/img/logo/partnership/kemenkes.png" },
  { id: 9, name: "Botanical", slug: "botanical", logo_url: "/assets/img/logo/partnership/botanical.png" },
  { id: 10, name: "Beeme", slug: "beeme", logo_url: "/assets/img/logo/partnership/beeme.png" },
  { id: 11, name: "POPMANA", slug: "popmama", logo_url: "/assets/img/logo/partnership/popmama.png" },
  { id: 12, name: "KAI Commuter", slug: "kai-commuter", logo_url: "/assets/img/logo/partnership/kai-commuter.png" }
];

const STATIC_WHY_US = [
  { id: 1, title: "Berpengalaman & Terpercaya", description: "Menyediakan layanan tumbuh kembang dan hipnoterapi anak dengan pendekatan teruji, hangat, dan aman.", sort_order: 1 },
  { id: 2, title: "Menghadirkan Terapis & Praktisi Profesional", description: "Terapis wicara, terapis perilaku, dan praktisi hipnoterapi bersertifikat resmi yang ahli di bidang psikologi perkembangan anak.", sort_order: 2 },
  { id: 3, title: "Pendekatan Ramah Anak (Child-Centered)", description: "Metode terapi dirancang melalui aktivitas bermain dan relaksasi yang menyenangkan agar anak merasa nyaman tanpa merasa dipaksa.", sort_order: 3 },
  { id: 4, title: "Mitra Lembaga Pendidikan & Komunitas", description: "Allia Kids aktif bekerja sama dengan TK/PAUD, Sekolah Dasar, Posyandu, dan komunitas parenting untuk optimalisasi deteksi dini tumbuh kembang anak.", sort_order: 4 },
];

const STATIC_COLLABORATIONS = [
  { id: 1, title: "Seminar & Edukasi Parenting Sekolah", description: "Terapis dan psikolog Allia Kids siap mengisi seminar sekolah (TK/SD), konten edukasi tumbuh kembang, dan sharing session komunitas orang tua.", images: ["/assets/img/gallery/partnership/cdk-01.webp", "/assets/img/gallery/partnership/cdk-02.webp"], sort_order: 1 },
  { id: 2, title: "Modul Stimulasi & Buku Terapi Mandiri", description: "Kolaborasi penyusunan panduan stimulasi motorik/bahasa anak, buku terapi mandiri, serta mainan sensorik edukatif anak.", images: ["/assets/img/gallery/partnership/mental-health-kit-01.webp", "/assets/img/gallery/partnership/mental-health-kit-02.webp", "/assets/img/gallery/partnership/mental-health-kit-03.webp"], sort_order: 2 },
  { id: 3, title: "Program Skrining Tumbuh Kembang Massal", description: "Mengadakan pemeriksaan motorik, kognitif, dan wicara kolektif untuk seluruh siswa di PAUD/TK/SD mitra guna deteksi dini hambatan.", images: ["/assets/img/gallery/partnership/giveaway-01.webp", "/assets/img/gallery/partnership/giveaway-02.webp", "/assets/img/gallery/partnership/giveaway-03.webp"], sort_order: 3 },
  { id: 4, title: "Parenting Support Group", description: "Sesi diskusi kelompok terarah (sharing circle) bagi para orang tua bersama psikolog klinis anak untuk membahas isu pengasuhan.", images: ["/assets/img/gallery/partnership/healing-experience-01.webp", "/assets/img/gallery/partnership/healing-experience-02.webp", "/assets/img/gallery/partnership/healing-experience-03.webp"], sort_order: 4 },
  { id: 5, title: "Workshop Stimulasi & Sensori Play", description: "Pelatihan praktik langsung sensori play dan stimulasi motorik kasar/halus anak bagi guru-guru sekolah atau kader posyandu.", images: ["/assets/img/gallery/partnership/education-program-01.webp", "/assets/img/gallery/partnership/education-program-02.webp", "/assets/img/gallery/partnership/education-program-03.webp"], sort_order: 5 },
];

const STATIC_MOMENTS = [
  { id: 1, title: 'Skrining Tumbuh Kembang & Wicara Massal di TK/PAUD Lumajang', img_url: "/assets/img/gallery/partnership/documentation-kai.webp", sort_order: 1 },
  { id: 2, title: "Workshop Deteksi Dini Keterlambatan Bicara bersama Guru TK", img_url: "/assets/img/gallery/partnership/documentation-kiehlers.webp", sort_order: 2 },
  { id: 3, title: "Talkshow Parenting: Mengatasi Tantrum Anak tanpa Amarah", img_url: "/assets/img/gallery/partnership/documentation-calf.webp", sort_order: 3 },
  { id: 4, title: "Edukasi Sensori Play & Stimulasi Motorik Halus Toddler", img_url: "/assets/img/gallery/partnership/documentation-ariel-tatum.webp", sort_order: 4 },
  { id: 5, title: "Analisis Sidik Jari Bakat Siswa Sekolah Dasar", img_url: "/assets/img/gallery/partnership/documentation-taman-kota-fest.webp", sort_order: 5 },
  { id: 6, title: "Sharing Session Orang Tua Anak Berkebutuhan Khusus", img_url: "/assets/img/gallery/partnership/documentation-influencers.webp", sort_order: 6 },
];

export default function Partnership() {
  const [activeCollab, setActiveCollab] = useState(0);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [partners, setPartners] = useState<any[]>(STATIC_PARTNERS);
  const [whyUs, setWhyUs] = useState<any[]>(STATIC_WHY_US);
  const [collaborations, setCollaborations] = useState<any[]>(STATIC_COLLABORATIONS);
  const [moments, setMoments] = useState<any[]>(STATIC_MOMENTS);

  useEffect(() => {
    // Partners logos
    partnershipApi.getActive()
      .then((data) => { if (data?.length > 0) setPartners(data); })
      .catch((err) => console.error("Partners API error:", err));

    // Why Us cards
    partnershipWhyUsApi.getActive()
      .then((data) => { if (data?.length > 0) setWhyUs(data); })
      .catch((err) => console.error("WhyUs API error:", err));

    // Collaboration types
    partnershipCollaborationsApi.getActive()
      .then((data) => { if (data?.length > 0) setCollaborations(data); })
      .catch((err) => console.error("Collaborations API error:", err));

    // Moments gallery
    partnershipMomentsApi.getActive()
      .then((data) => { if (data?.length > 0) setMoments(data); })
      .catch((err) => console.error("Moments API error:", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      {/* Custom Partnership Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-50 pt-6 px-4 lg:px-10">
        <div className="container mx-auto rounded-full bg-white/80 backdrop-blur-md shadow px-6 py-3.5 border border-grey-100 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <span className="font-cursive text-2xl text-wellme-primary select-none">
              Allia Kids
            </span>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-grey-500">
            <a href="#why" className="hover:text-wellme-primary transition-colors duration-200">Mengapa Kami</a>
            <a href="#collaboration" className="hover:text-wellme-primary transition-colors duration-200">Kolaborasi</a>
            <a href="#moments" className="hover:text-wellme-primary transition-colors duration-200">Momen Kami</a>
            <a
              href="#contact"
              className="rounded-full bg-wellme-secondary hover:brightness-110 text-white font-bold px-6 py-2.5 transition-all shadow-sm hover:scale-103"
            >
              Hubungi Kami
            </a>
          </div>

          {/* Mobile Burger Menu Button */}
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="lg:hidden text-grey-500 focus:outline-none"
          >
            <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileNavOpen && (
          <div className="absolute top-full left-4 right-4 mt-3 bg-white border border-grey-150 rounded-2xl p-5 shadow-xl flex flex-col gap-4 lg:hidden animate-zoom-in text-wellme-primary">
            <a href="#why" onClick={() => setIsMobileNavOpen(false)} className="text-grey-500 font-bold hover:text-wellme-primary">Mengapa Kami</a>
            <a href="#collaboration" onClick={() => setIsMobileNavOpen(false)} className="text-grey-500 font-bold hover:text-wellme-primary">Kolaborasi</a>
            <a href="#moments" onClick={() => setIsMobileNavOpen(false)} className="text-grey-500 font-bold hover:text-wellme-primary">Momen Kami</a>
            <hr className="border-grey-150" />
            <a
              href="#contact"
              onClick={() => setIsMobileNavOpen(false)}
              className="w-full text-center rounded-full bg-wellme-secondary text-white font-bold py-3 shadow-md"
            >
              Hubungi Kami
            </a>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {/* Header Section with event background photo */}
        <header 
          className="relative overflow-hidden bg-cover bg-bottom flex items-center text-white min-h-[600px] lg:min-h-[900px] pt-32 pb-16"
          style={{ backgroundImage: "url('/assets/img/background/partnership/header.webp')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b0e] via-[#070b0e]/80 to-transparent z-10" />
          <div className="container mx-auto px-4 lg:px-10 h-full relative z-20 w-full">
            <div className="flex flex-col items-start justify-center gap-5 max-w-4xl">
              <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight">
                Kolaborasi Untuk <br />
                <span className="text-wellme-secondary">Kesehatan Mental Indonesia</span>
              </h1>
              <div className="flex flex-col gap-4 text-base lg:text-lg font-semibold text-white/90 max-w-2xl leading-relaxed">
                <p>
                  Ibunda.id membuka ruang kolaborasi bagi brand, komunitas, and instansi yang ingin menghadirkan program activation atau konten edukasi kesehatan mental.
                </p>
                <p>
                  Dengan saling membersamai, kita bisa menghadirkan pengalaman yang hangat, yang membuat orang merasa ditemani, dipahami, dan tidak sendirian.
                </p>
              </div>
              <a
                href="#contact"
                className="mt-4 rounded-xl bg-wellme-secondary hover:brightness-110 text-sm lg:text-base text-white font-bold transition-all px-6 py-3.5 shadow-md flex items-center gap-2 hover:scale-105 duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg> Hubungi Kami
              </a>
            </div>
          </div>
        </header>

        {/* Brand Partner Logos Bar */}
        <section className="bg-white border-b border-grey-100 w-full relative z-10 py-8 overflow-hidden">
          <div className="marquee-container w-full">
            <div className="marquee-content flex flex-row">
              {/* Track 1 */}
              <div className="flex flex-row items-center gap-12 md:gap-16 pr-12 md:pr-16 shrink-0">
                {partners.map((t, c) => (
                  <div key={`partner-logo-1-${c}`} className="flex items-center justify-center shrink-0">
                    <img
                      className="h-8 md:h-10 w-auto object-contain"
                      src={t.logo_url}
                      alt={t.name}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              {/* Track 2 */}
              <div className="flex flex-row items-center gap-12 md:gap-16 pr-12 md:pr-16 shrink-0">
                {partners.map((t, c) => (
                  <div key={`partner-logo-2-${c}`} className="flex items-center justify-center shrink-0">
                    <img
                      className="h-8 md:h-10 w-auto object-contain"
                      src={t.logo_url}
                      alt={t.name}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section id="why" className="container mx-auto px-4 lg:px-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 hidden lg:block">
              <div className="rounded-3xl overflow-hidden shadow-lg border border-grey-200 aspect-[4/3]">
                <img
                  className="w-full h-full object-cover"
                  src="/assets/img/gallery/partnership/why.webp"
                  alt="Why Ibunda.id"
                />
              </div>
            </div>
            <div className="lg:col-span-6 flex flex-col gap-6">
              <h2 className="text-wellme-primary text-2xl lg:text-3xl font-extrabold text-center lg:text-left mb-2">
                Mengapa harus bersama Ibunda.id?
              </h2>
              <div className="flex flex-col gap-4">
                {whyUs.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-grey-200 rounded-2xl p-4 flex gap-4 hover:border-wellme-primary hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-6 h-6 shrink-0 rounded-full bg-wellme-100 flex items-center justify-center text-wellme-primary font-bold text-xs mt-1">
                      ✓
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-wellme-primary text-base lg:text-lg font-bold group-hover:text-wellme-secondary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-grey-caption text-xs lg:text-sm font-semibold leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration Types Section */}
        <section id="collaboration" className="bg-white-wellme py-24 border-y border-grey-150">
          <div className="container mx-auto px-4 lg:px-10">
            <h2 className="text-wellme-primary text-2xl lg:text-3xl font-extrabold text-center lg:text-left mb-8">
              Apa saja yang bisa kita lakukan bersama?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 flex flex-col gap-3">
                {collaborations.map((collab, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveCollab(index)}
                    className={`w-full text-left py-4 px-6 rounded-2xl font-bold transition-all duration-300 cursor-pointer ${
                      index === activeCollab
                        ? "bg-wellme-secondary text-white shadow-md scale-102"
                        : "border border-grey-200 text-wellme-primary bg-white hover:bg-wellme-100/10"
                    }`}
                  >
                    {collab.title}
                  </button>
                ))}
              </div>
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 lg:p-8 border border-grey-200 shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-extrabold text-wellme-primary mb-3">
                    {collaborations[activeCollab].title}
                  </h3>
                  <p className="text-sm text-grey-400 font-semibold leading-relaxed">
                    {collaborations[activeCollab].description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {collaborations[activeCollab].images.map((img: string, imgIdx: number) => (
                    <div key={imgIdx} className="rounded-xl overflow-hidden border border-grey-150 aspect-video shadow-sm">
                      <img src={img} className="w-full h-full object-cover" alt="Moment" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <div className="pt-16 -mt-28 lg:pt-40 lg:-mt-40" id="contact">
          <section className="mb-32 lg:mb-40 relative overflow-x-hidden lg:overflow-visible z-20 pt-20 lg:pt-0">
            <div className="absolute top-0 lg:top-1/2 lg:-translate-y-1/2 right-[-3rem] lg:right-0 w-full max-w-[80%] lg:max-w-[50%] h-[200px] lg:h-[480px] 2xl:max-h-[640px] z-10">
              <img className="rounded-l-full w-full h-full object-cover" alt="team" src="/assets/img/gallery/partnership/team.webp" />
              <div className="absolute inset-0 rounded-l-full bg-[linear-gradient(91.01deg,rgba(28,114,187,0.5)_-93.15%,rgba(10,124,195,0.5)_129.94%)]"></div>
            </div>
            <div className="bg-wellme-primary text-white pt-36 pb-16 lg:py-16">
              <div className="container mx-auto px-4 lg:px-10">
                <div className="flex flex-col items-center lg:items-start justify-center gap-6 text-center lg:text-start relative z-20">
                  <h2 className="text-2xl lg:text-3xl font-bold">Mari Mulai Berdiskusi</h2>
                  <div className="flex flex-col gap-3 text-sm lg:text-base lg:max-w-[50%] font-semibold text-white/90">
                    <div>Mari bangun lebih banyak ruang aman di Indonesia. Tim Ibunda.id siap mendengar ide kolaborasimu untuk menemani lebih banyak hati yang berproses.</div>
                    <div>Tim kami akan membantu merancang bentuk kerja sama yang paling cocok dengan brand, komunitas, maupun instansi kamu.</div>
                  </div>
                  <a href="mailto:partnership@ibunda.id" className="rounded-xl bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-sm lg:text-base text-white transition-all px-5 py-3.5 w-full lg:w-fit font-bold shadow-md">
                    <div className="flex flex-col items-center lg:items-start gap-1">
                      <div className="text-xs text-white/70">Hubungi kami melalui :</div>
                      <div className="flex items-center gap-2 font-bold text-sm lg:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-mail"><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10"></path><path d="M3 7l9 6l9 -6"></path></svg>
                        partnership@ibunda.id
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Moments Section */}
        <section id="moments" className="container mx-auto px-4 lg:px-10 mb-32 pt-10">
          <h2 className="text-center text-wellme-primary text-2xl lg:text-3xl font-extrabold mb-10">
            Lihat Kolaborasi Sebelumnya
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {moments.map((moment, idx) => (
              <div
                key={idx}
                className="rounded-3xl overflow-hidden relative cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 aspect-video border border-grey-200"
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={moment.img_url}
                  alt={moment.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h4 className="text-white font-bold text-sm lg:text-base leading-snug">
                    {moment.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
