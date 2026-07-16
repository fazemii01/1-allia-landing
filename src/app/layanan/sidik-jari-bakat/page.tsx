import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function SidikJariBakatLayanan() {
  const benefits = [
    "Akurasi Ilmiah Tinggi: Menganalisis pola dermatoglifi (pola sidik jari) yang terbentuk sejak dalam kandungan, bersifat permanen dan tidak dipengaruhi mood.",
    "Pemetaan Gaya Belajar: Mengetahui secara pasti gaya belajar dominan anak (Visual, Auditori, atau Kinestetik) agar orang tua tidak salah memberikan metode belajar.",
    "Analisis Belahan Otak Dominan: Mengetahui kecenderungan kerja otak kanan (kreativitas, intuisi, holistik) atau otak kiri (analitis, logika, bahasa).",
    "Sesi Konsultasi Eksklusif: Dilengkapi dengan sesi konsultasi tatap muka untuk menjelaskan laporan hasil setebal 15+ halaman serta arahan pola asuh yang pas.",
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
                  Layanan Pemetaan Potensi
                </div>
                <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary leading-tight">
                  Analisis Sidik Jari Bakat
                </h1>
                <p className="text-grey-400 text-sm lg:text-base font-semibold max-w-xl leading-relaxed mx-auto lg:mx-0">
                  Temukan potensi terpendam, bakat bawaan sejak lahir, serta gaya belajar dominan anak secara objektif dan ilmiah melalui pemindaian pola sidik jari (fingerprint analysis).
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
                  <Link
                    href="/apply"
                    className="rounded-full bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient border border-wellme-secondary hover:border-wellme-primary text-white font-bold px-8 py-3 transition-all duration-300 shadow-md hover:scale-105"
                  >
                    Booking Sesi Analisis Sidik Jari
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[420px] rounded-3xl overflow-hidden shadow-lg border border-white aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600"
                    alt="Analisis Sidik Jari Bakat"
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
              <div className="text-xl font-extrabold text-wellme-primary">60 Menit (Scan & Konsultasi)</div>
            </div>
            <div className="border border-grey-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-xs text-grey-400 font-bold uppercase mb-2">Format Layanan</div>
              <div className="text-xl font-extrabold text-wellme-primary">Offline (Tatap Muka)</div>
            </div>
            <div className="border border-grey-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-xs text-grey-400 font-bold uppercase mb-2">Mulai Dari</div>
              <div className="text-xl font-extrabold text-wellme-primary">Rp 350.000 / Sesi</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-wellme-primary text-2xl lg:text-3xl font-extrabold mb-6">
                Mengapa Memilih Analisis Sidik Jari?
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
                Manfaat & Hasil Analisis
              </h3>
              <p className="text-sm text-grey-400 font-semibold mb-6 leading-relaxed">
                Hasil analisis sidik jari ini akan menjabarkan secara rinci mengenai potensi anak dalam hal:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "8 Kecerdasan Majemuk (Musik, Kinestetik, Logika, dll.)",
                  "Gaya Belajar Dominan (Visual / Auditori / Kinestetik)",
                  "Karakter Komunikasi Anak (Reflektif, Afektif, Kognitif)",
                  "Potensi Karier & Jurusan Sekolah di Masa Depan",
                  "Kekuatan Otak Kanan vs Otak Kiri",
                  "Gaya Bekerja & Manajemen Stres Bawaan",
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
