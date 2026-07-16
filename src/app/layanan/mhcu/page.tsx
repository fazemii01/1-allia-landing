import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function MhcuLayanan() {
  const benefits = [
    "Asesmen Klinis Terstandar: Lembar tes psikometri ilmiah untuk mengevaluasi stres, kecemasan, depresi, atau kepribadian.",
    "Laporan Hasil Komprehensif: Hasil tertulis lengkap berupa grafik indikator klinis dan rekomendasi psikologis.",
    "Sesi Konsultasi Penjelasan: 60 menit sesi penjelasan hasil secara tatap muka atau daring bersama psikolog.",
    "Pemetaan Potensi Diri: Memahami profil diri secara objektif untuk pengembangan diri atau karir.",
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
                  Paket Asesmen Kesehatan Mental
                </div>
                <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary leading-tight">
                  Mental Health Check Up (MHCU)
                </h1>
                <p className="text-grey-400 text-sm lg:text-base font-semibold max-w-xl leading-relaxed mx-auto lg:mx-0">
                  Paket pemeriksaan kesehatan mental secara objektif melalui instrumen tes psikologi terstandar, dilanjutkan dengan sesi konsultasi pembacaan hasil bersama psikolog.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
                  <Link
                    href="/apply"
                    className="rounded-full bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient border border-wellme-secondary hover:border-wellme-primary text-white font-bold px-8 py-3 transition-all duration-300 shadow-md hover:scale-105"
                  >
                    Booking Paket MHCU
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[420px] rounded-3xl overflow-hidden shadow-lg border border-white aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600"
                    alt="Mental Health Check Up"
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
              <div className="text-xs text-grey-400 font-bold uppercase mb-2">Durasi Total</div>
              <div className="text-xl font-extrabold text-wellme-primary">Lembar Tes + 60 Menit Konsultasi</div>
            </div>
            <div className="border border-grey-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-xs text-grey-400 font-bold uppercase mb-2">Format Layanan</div>
              <div className="text-xl font-extrabold text-wellme-primary">Online & Offline</div>
            </div>
            <div className="border border-grey-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-xs text-grey-400 font-bold uppercase mb-2">Mulai Dari</div>
              <div className="text-xl font-extrabold text-wellme-primary">Rp 500.000 / Paket</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-wellme-primary text-2xl lg:text-3xl font-extrabold mb-6">
                Mengapa Mengambil Paket MHCU?
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
                Jenis Asesmen yang Disediakan
              </h3>
              <p className="text-sm text-grey-400 font-semibold mb-6 leading-relaxed">
                Kami menyediakan beberapa varian modul pemeriksaan psikologis sesuai kenyamanan dan kebutuhan evaluasi diri kamu:
              </p>
              <div className="flex flex-col gap-3 font-semibold text-sm text-grey-500">
                <div className="p-3 bg-white rounded-xl border border-grey-200">
                  <div className="text-wellme-primary font-bold">1. Paket Asesmen Emosi Klinis</div>
                  <div className="text-xs text-grey-400 mt-1">Mengukur indikator tingkat depresi, stres, kecemasan, dan kelelahan mental.</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-grey-200">
                  <div className="text-wellme-primary font-bold">2. Paket Asesmen Tipe Kepribadian</div>
                  <div className="text-xs text-grey-400 mt-1">Mengidentifikasi temperamen bawaan, gaya komunikasi, dan kecocokan karier/relasi.</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-grey-200">
                  <div className="text-wellme-primary font-bold">3. Paket Asesmen Lengkap / Komprehensif</div>
                  <div className="text-xs text-grey-400 mt-1">Kombinasi asesmen emosional dan pemetaan minat bakat kepribadian.</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
