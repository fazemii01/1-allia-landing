import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TumbuhKembangLayanan() {
  const benefits = [
    "Skrining Komprehensif: Menggunakan instrumen skrining baku (SDIDTK / KPSP) untuk mendeteksi dini keterlambatan perkembangan anak.",
    "Pemantauan Motorik & Sensorik: Mengukur kekuatan motorik kasar (berdiri, melompat), motorik halus (memegang pensil, menyusun balok), dan integrasi sensorik.",
    "Evaluasi Kognitif & Sosial: Mengamati cara berpikir anak, memecahkan masalah sederhana, kematangan sosio-emosional, dan interaksi dengan teman sebaya.",
    "Laporan Tumbuh Kembang Resmi: Setiap orang tua menerima laporan tertulis yang merinci grafik pencapaian anak dan rekomendasi tindak lanjut.",
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
                  Layanan Deteksi Dini
                </div>
                <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary leading-tight">
                  Skrining Tumbuh Kembang Anak
                </h1>
                <p className="text-grey-400 text-sm lg:text-base font-semibold max-w-xl leading-relaxed mx-auto lg:mx-0">
                  Asesmen deteksi dini untuk mengetahui apakah tahap perkembangan motorik, bahasa, kognitif, dan sosial-emosional anak usia 1-5 tahun sudah sesuai dengan usianya atau terdapat keterlambatan (delay).
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
                  <Link
                    href="/apply"
                    className="rounded-full bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient border border-wellme-secondary hover:border-wellme-primary text-white font-bold px-8 py-3 transition-all duration-300 shadow-md hover:scale-105"
                  >
                    Booking Sesi Skrining
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[420px] rounded-3xl overflow-hidden shadow-lg border border-white aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=600"
                    alt="Skrining Tumbuh Kembang"
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
              <div className="text-xl font-extrabold text-wellme-primary">Offline (Tatap Muka)</div>
            </div>
            <div className="border border-grey-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-xs text-grey-400 font-bold uppercase mb-2">Mulai Dari</div>
              <div className="text-xl font-extrabold text-wellme-primary">Rp 150.000 / Sesi</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-wellme-primary text-2xl lg:text-3xl font-extrabold mb-6">
                Pentingnya Skrining Tumbuh Kembang Sejak Dini
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
                Aspek Perkembangan Yang Diuji
              </h3>
              <p className="text-sm text-grey-400 font-semibold mb-6 leading-relaxed">
                Skrining ini membantu orang tua mengetahui detail peta perkembangan anak dalam aspek:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Motorik Kasar (Keseimbangan, Jalan, Lompat)",
                  "Motorik Halus (Menjepit, Menggunting, Menggambar)",
                  "Kemampuan Bicara & Bahasa (Kosa Kata, Memahami Kata)",
                  "Sosialisasi & Kemandirian (Bermain Bersama, Makan Sendiri)",
                  "Sensori Integrasi (Keseimbangan & Kepekaan Sentuhan)",
                  "Kognitif (Mengenali Warna, Bentuk, Mengelompokkan Objek)",
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
