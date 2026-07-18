"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function JariMatikMagic() {
  const benefits = [
    {
      title: "Praktis & Mudah",
      desc: "Hanya menggunakan sepuluh jari tangan sendiri tanpa alat bantu sempoa atau kalkulator.",
    },
    {
      title: "Metode Menyenangkan",
      desc: "Pembelajaran dirancang lewat permainan interaktif, nyanyian, dan cerita agar anak senang belajar berhitung.",
    },
    {
      title: "Melatih Otak Kanan & Kiri",
      desc: "Menyeimbangkan fungsi otak kanan (imajinasi/kreativitas) dan otak kiri (logika/analitis) melalui gerakan jari yang sinergis.",
    },
    {
      title: "Meningkatkan Kepercayaan Diri",
      desc: "Anak dapat menghitung perkalian, pembagian, penjumlahan, dan pengurangan dengan cepat di sekolah tanpa merasa terbebani.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-wellme-100/30 py-16 lg:py-24 border-b border-grey-150">
          <div className="container mx-auto px-4 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col gap-6">
                <span className="w-fit text-xs font-bold bg-[#EBF3FC] text-wellme-primary px-3.5 py-1.5 rounded-full border border-grey-100 uppercase tracking-wider">
                  Bimbingan Belajar Anak
                </span>
                <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary leading-tight">
                  Bimbel Jari Matik Magic
                </h1>
                <p className="text-grey-400 font-medium text-base lg:text-lg leading-relaxed max-w-2xl">
                  Metode berhitung cepat dengan sepuluh jari tangan secara praktis, logis, dan menyenangkan. Membantu menumbuhkan rasa suka anak terhadap matematika sejak usia dini tanpa hafalan yang memberatkan.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-grey-400 font-bold">Investasi Belajar:</span>
                    <span className="text-xl lg:text-2xl font-extrabold text-wellme-secondary">
                      Rp 180.000 / Bulan
                    </span>
                  </div>
                  <a
                    href="https://api.whatsapp.com/send?phone=6285138511348&text=Halo%20Allia%20Kids%2C%20saya%20tertarik%20untuk%20mendaftarkan%20anak%20saya%20di%20Bimbel%20Jari%20Matik%20Magic."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-white font-bold px-8 py-3.5 transition-all duration-300 shadow-md hover:scale-105"
                  >
                    Daftar Kelas Sekarang
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="max-w-[420px] rounded-3xl overflow-hidden shadow-lg border border-white">
                  <img
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600"
                    alt="Bimbel Jari Matik Magic Allia Kids"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Jarimatika */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-10">
            <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 mb-16">
              <h2 className="text-2xl lg:text-4xl font-extrabold text-wellme-primary">
                Mengapa Memilih Jari Matik Magic?
              </h2>
              <p className="text-grey-400 font-medium leading-relaxed">
                Jari Matik Magic adalah jembatan emas bagi anak untuk menguasai kemampuan numerasi dasar. Dibanding metode hafalan konvensional, metode jari tangan terbukti lebih ramah anak karena bersifat visual dan kinestetik.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-grey-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-wellme-100 flex items-center justify-center font-bold text-wellme-primary mb-4">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-lg text-wellme-primary mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-grey-400 font-medium leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-wellme-100/30 py-16 border-t border-grey-150">
          <div className="container mx-auto px-4 lg:px-10 text-center flex flex-col gap-6 items-center">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-wellme-primary">
              Bantu Buah Hati Menyukai Matematika Sejak Dini
            </h2>
            <p className="text-grey-400 font-medium max-w-xl leading-relaxed">
              Jadwalkan kelas percobaan gratis (trial class) bersama instruktur Allia Kids dan lihat bagaimana si kecil berhitung dengan ceria menggunakan jarinya.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=6285138511348&text=Halo%20Allia%20Kids%2C%20saya%20tertarik%20untuk%20mengikuti%20Trial%20Class%20Jari%20Matik%20Magic."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-white font-bold px-8 py-3.5 transition-all duration-300 shadow-md hover:scale-105"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
