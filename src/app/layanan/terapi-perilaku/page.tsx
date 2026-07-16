import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TerapiPerilakuLayanan() {
  const benefits = [
    "Terapis Perilaku Kompeten: Sesi ditangani oleh terapis perilaku terlatih dengan keahlian khusus di bidang psikologi perkembangan anak.",
    "Metode ABA & Play Therapy: Mengombinasikan Applied Behavior Analysis (ABA) yang terstruktur dan Terapi Bermain yang menyenangkan bagi anak.",
    "Fokus Kemandirian Anak: Melatih kemandirian harian (activity of daily living), kedisiplinan, serta kepatuhan instruksi sederhana.",
    "Modifikasi Kebiasaan Buruk: Membantu mengganti perilaku destruktif (agresif, melempar barang, memukul) menjadi ekspresi emosi yang sehat.",
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
                  Layanan Terapi Khusus
                </div>
                <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary leading-tight">
                  Layanan Terapi Perilaku
                </h1>
                <p className="text-grey-400 text-sm lg:text-base font-semibold max-w-xl leading-relaxed mx-auto lg:mx-0">
                  Terapi penanganan masalah kepatuhan, pemusatan perhatian (ADHD/ADD), hiperaktivitas, temper tantrum berlebih, sosialisasi, dan pendampingan anak berkebutuhan khusus (ABK).
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
                  <Link
                    href="/apply"
                    className="rounded-full bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient border border-wellme-secondary hover:border-wellme-primary text-white font-bold px-8 py-3 transition-all duration-300 shadow-md hover:scale-105"
                  >
                    Booking Sesi Terapi Perilaku
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[420px] rounded-3xl overflow-hidden shadow-lg border border-white aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600"
                    alt="Terapi Perilaku"
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
                Mengapa Memilih Terapi Perilaku Allia Kids?
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
                Gejala / Isu Perilaku yang Perlu Terapi
              </h3>
              <p className="text-sm text-grey-400 font-semibold mb-6 leading-relaxed">
                Terapis kami berpengalaman melatih kepatuhan dan manajemen emosi anak dengan isu:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Hiperaktivitas (Sangat Sulit Diam)",
                  "Tantrum Agresif (Memukul, Menggigit, Berteriak)",
                  "ADHD / Gangguan Pemusatan Perhatian",
                  "Sulit Fokus / Malas Menulis & Membaca",
                  "Autism Spectrum Disorder (ASD)",
                  "Suka Membangkang & Menolak Aturan",
                  "Kesulitan Berinteraksi & Pemalu Ekstrem",
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
