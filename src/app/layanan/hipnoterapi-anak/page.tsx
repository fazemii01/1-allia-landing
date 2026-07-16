import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function HipnoterapiAnakLayanan() {
  const benefits = [
    "Praktisi Bersertifikat Resmi: Ditangani langsung oleh terapis bersertifikat resmi dari lembaga hipnoterapi terpercaya di Indonesia.",
    "Aman & Tanpa Obat: Metode alami dengan teknik bermain, visualisasi, dan relaksasi ringan tanpa menggunakan obat-obatan.",
    "Mengatasi Hambatan Bawah Sadar: Sangat efektif mengatasi trauma makan/fobia nasi, tantrum berlebih, malas belajar, kecemasan, ngompol, dan kurang percaya diri.",
    "Keterlibatan Orang Tua: Orang tua dilibatkan dalam sesi untuk mempelajari teknik penguatan positif di rumah demi hasil berkelanjutan.",
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
                  Layanan Terapi Unggulan
                </div>
                <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary leading-tight">
                  Hipnoterapi Anak & Dewasa
                </h1>
                <p className="text-grey-400 text-sm lg:text-base font-semibold max-w-xl leading-relaxed mx-auto lg:mx-0">
                  Sesi terapi pikiran bawah sadar yang aman, nyaman, dan menyenangkan bagi anak menggunakan metode visualisasi dan relaksasi khusus untuk memulihkan hambatan emosi, fobia makanan, dan perilaku.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
                  <Link
                    href="/apply"
                    className="rounded-full bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient border border-wellme-secondary hover:border-wellme-primary text-white font-bold px-8 py-3 transition-all duration-300 shadow-md hover:scale-105"
                  >
                    Booking Sesi Hipnoterapi
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[420px] rounded-3xl overflow-hidden shadow-lg border border-white aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600"
                    alt="Hipnoterapi Anak"
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
              <div className="text-xl font-extrabold text-wellme-primary">90 Menit / Sesi</div>
            </div>
            <div className="border border-grey-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-xs text-grey-400 font-bold uppercase mb-2">Format Layanan</div>
              <div className="text-xl font-extrabold text-wellme-primary">Offline (Tatap Muka)</div>
            </div>
            <div className="border border-grey-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-xs text-grey-400 font-bold uppercase mb-2">Mulai Dari</div>
              <div className="text-xl font-extrabold text-wellme-primary">Rp 550.000 / Sesi</div>
            </div>
          </div>

          {/* Detailed Programs Grid */}
          <div className="mb-20">
            <div className="text-center flex flex-col gap-3 mb-10">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-wellme-primary">
                Program Hipnoterapi Spesifik Anak
              </h2>
              <p className="text-grey-400 font-medium text-sm lg:text-base max-w-xl mx-auto leading-relaxed">
                Kami merancang 6 program spesifik sesuai kebutuhan emosi, perilaku, dan kebiasaan buah hati Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Terapi Emosi & Perilaku",
                  desc: "Membantu anak mengelola emosi negatif seperti marah, sedih, takut, atau trauma secara aman.",
                },
                {
                  title: "Terapi Konsentrasi & Fokus Belajar",
                  desc: "Meningkatkan kemampuan anak dalam berkonsentrasi, menghafal, dan menyerap pelajaran sekolah.",
                },
                {
                  title: "Terapi Percaya Diri & Sosialisasi",
                  desc: "Membantu anak mengatasi rasa malu, minder, rendah diri, atau takut bersosialisasi di lingkungannya.",
                },
                {
                  title: "Terapi Gangguan Tidur & Mimpi Buruk",
                  desc: "Mengatasi masalah susah tidur, sering terbangun di malam hari, ketakutan tidur sendiri, dan mimpi buruk.",
                },
                {
                  title: "Terapi Pengendalian Kebiasaan Buruk",
                  desc: "Membantu anak menghentikan kebiasaan seperti menggigit kuku, ngompol, mengisap jempol, atau kecanduan gadget.",
                },
                {
                  title: "Terapi Kecemasan & Fobia",
                  desc: "Mengatasi ketakutan berlebih terhadap sekolah, dokter, kegelapan, hewan, atau situasi sosial tertentu.",
                },
              ].map((prog, idx) => (
                <div key={idx} className="border border-grey-200 rounded-3xl p-6 bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-lg text-wellme-primary">{prog.title}</h3>
                    <p className="text-sm text-grey-400 font-medium leading-relaxed">{prog.desc}</p>
                    <div className="text-sm font-extrabold text-wellme-secondary">Rp 550.000 / Sesi</div>
                  </div>
                  <Link
                    href={`/apply?category=hipoterapi&program=${encodeURIComponent(prog.title)}`}
                    className="w-full mt-5 text-center text-xs font-bold py-2.5 rounded-full border border-wellme-secondary text-wellme-secondary hover:bg-wellme-secondary hover:text-white transition-all duration-200 block"
                  >
                    Booking Now
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-wellme-primary text-2xl lg:text-3xl font-extrabold mb-6">
                Mengapa Memilih Hipnoterapi di Allia Kids?
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
                Isu & Permasalahan yang Sangat Efektif Diterapi
              </h3>
              <p className="text-sm text-grey-400 font-semibold mb-6 leading-relaxed">
                Hipnoterapi terbukti secara klinis mempercepat pemulihan berbagai tantangan anak berikut ini:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Trauma Makan Nasi (Takut Nasi)",
                  "Fobia Makanan / Picky Eating Akut",
                  "Kebiasaan Mengompol (Enuresis)",
                  "Malas Belajar & Kehilangan Motivasi",
                  "Tantrum Berlebih & Emosi Meledak",
                  "Trauma Masa Lalu / Korban Bullying",
                  "Kurang Percaya Diri & Demam Panggung",
                  "Kecanduan Gadget / Game Online",
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
