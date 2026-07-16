import React from "react";
import Link from "next/link";
import {
  LayananIndividualIcon,
  LayananCoupleIcon,
  LayananFamilyIcon,
  LayananMhcuIcon,
  LayananHipnoterapiIcon,
  LayananOnlineIcon
} from "./icons";

export default function ServicesSection() {
  const services = [
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    },
    {
      title: "Bimbel Jari Matik Magic",
      description: "Metode berhitung cepat menggunakan 10 jari tangan yang praktis, mudah dipahami, dan menyenangkan bagi anak.",
      icon: LayananOnlineIcon,
      href: "/layanan/jari-matik-magic",
      price: "Rp 180.000 / Bulan",
      subServices: [
        "Bimbel Jari Matik Khusus",
        "Berhitung Cepat Menyenangkan",
        "Kelas Matematika Dasar Ceria"
      ]
    }
  ];

  return (
    <div className="w-full">
      <section className="container mx-auto px-4 lg:px-10 text-center mb-6">
        <h2 className="text-wellme-primary-gradient text-3xl lg:text-4xl font-extrabold mb-4">
          Layanan Terapi Allia Kids
        </h2>
        <p className="text-sm lg:text-base text-grey-400 font-semibold max-w-2xl mx-auto leading-relaxed">
          Temukan dukungan tumbuh kembang optimal dan pemulihan emosional
          <br className="hidden lg:block" /> terbaik untuk masa depan buah hati Anda bersama Allia Kids
        </p>
      </section>

      <section className="bg-white-wellme mb-32 border-y border-grey-150">
        <div className="container mx-auto px-4 lg:px-10 py-12">
          <div className="flex flex-wrap justify-center -m-3">
            {services.map((service, index) => {
              const CardContent = (
                <div className="rounded-2xl border border-grey-200 bg-white p-6 w-full h-full shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
                  <div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="shrink-0 transition-all duration-300 group-hover:scale-110">
                        <service.icon size={56} />
                      </div>
                      <div className="flex flex-col gap-1 flex-grow">
                        <h3 className="font-bold text-lg text-wellme-primary group-hover:text-wellme-secondary transition-colors duration-200">
                          {service.title}
                        </h3>
                        <p className="text-sm text-grey-400 font-medium leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Sub-services list */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {service.subServices.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-bold bg-[#EBF3FC] text-wellme-primary px-2.5 py-1 rounded-full border border-grey-100"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action footer */}
                  <div className="mt-6 pt-4 border-t border-grey-100 flex items-center justify-between gap-4">
                    <div className="text-sm font-extrabold text-wellme-secondary">
                      {service.price}
                    </div>
                    <span className="text-xs font-bold text-wellme-primary hover:text-wellme-secondary group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1">
                      Detail Layanan &rarr;
                    </span>
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
