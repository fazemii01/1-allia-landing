import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { HomeIcon, ChatIcon } from "@/components/icons";

export default function IndividualLayanan() {
  const benefits = [
    "Sesi Privat 1-on-1: Konseling aman dan rahasia bersama psikolog berlisensi.",
    "Bebas Pilih Media: Tersedia melalui Chat, Voice Call, maupun Video Call.",
    "Pilihan Fleksibel: Tersedia sesi tatap muka langsung (offline) di Jakarta & Bandung.",
    "Bebas Pilih Topik: Stres, kecemasan, karir, kepribadian, trauma, dll.",
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />

      <main className="flex-grow pt-10">
        {/* Hero Section */}
        <section className="py-20 bg-wellme-100/30 border-b border-grey-150">
          <div className="container mx-auto px-4 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col gap-4 text-center lg:text-left">
                <div className="text-xs text-wellme-primary font-bold bg-wellme-100 py-1 px-3 rounded-full w-fit mx-auto lg:mx-0 border border-grey-200">
                  Layanan Konseling Utama
                </div>
                <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary leading-tight">
                  Konseling Individual
                </h1>
                <p className="text-grey-400 text-sm lg:text-base font-semibold max-w-xl leading-relaxed mx-auto lg:mx-0">
                  Sesi konseling yang dilakukan secara tatap muka (offline) maupun online privat bersama partner psikolog berlisensi profesional Ibunda.id.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
                  <Link
                    href="/apply"
                    className="rounded-full bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient border border-wellme-secondary hover:border-wellme-primary text-white font-bold px-8 py-3 transition-all duration-300 shadow-md hover:scale-105"
                  >
                    Booking Sesi Sekarang
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[420px] rounded-3xl overflow-hidden shadow-lg border border-white aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600"
                    alt="Konseling Individual"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info Grid Section */}
        <section className="container mx-auto px-4 lg:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="border border-grey-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-xs text-grey-400 font-bold uppercase mb-2">Durasi Sesi</div>
              <div className="text-xl font-extrabold text-wellme-primary">60 Menit / Sesi</div>
            </div>
            <div className="border border-grey-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-xs text-grey-400 font-bold uppercase mb-2">Format Layanan</div>
              <div className="text-xl font-extrabold text-wellme-primary">Online & Offline</div>
            </div>
            <div className="border border-grey-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-xs text-grey-400 font-bold uppercase mb-2">Mulai Dari</div>
              <div className="text-xl font-extrabold text-wellme-primary">Rp 250.000 / Sesi</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-wellme-primary text-2xl lg:text-3xl font-extrabold mb-6">
                Mengapa Memilih Konseling Individual?
              </h2>
              <div className="flex flex-col gap-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-wellme-100 text-wellme-primary flex items-center justify-center font-bold text-xs mt-1 shrink-0">✓</span>
                    <p className="text-grey-400 font-semibold text-sm lg:text-base leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white-wellme rounded-3xl p-8 border border-grey-200 shadow-sm flex flex-col justify-center">
              <h3 className="text-xl font-extrabold text-wellme-primary mb-3">
                Topik Permasalahan yang Dilayani
              </h3>
              <p className="text-sm text-grey-400 font-semibold mb-6 leading-relaxed">
                Psikolog kami berpengalaman menangani berbagai isu kesehatan mental individu dewasa dan remaja, termasuk:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Kecemasan Berlebih (Anxiety)",
                  "Stres Kerja & Burnout",
                  "Depresi & Mood Disorder",
                  "Trauma Masa Lalu (PTSD)",
                  "Kesulitan Hubungan Asmara",
                  "Pengembangan Diri & Rasa Percaya Diri",
                  "Grief & Kehilangan",
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-bold text-wellme-primary bg-white border border-grey-200 px-3 py-1.5 rounded-full shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
