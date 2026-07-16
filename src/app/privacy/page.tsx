import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        {/* Hero Section */}
        <section className="bg-wellme-100/30 py-16 lg:py-20 border-b border-grey-150">
          <div className="container mx-auto px-4 lg:px-10 text-center flex flex-col items-center">
            <span className="bg-wellme-primary/10 text-wellme-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Perlindungan Data & Kerahasiaan
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary-gradient mb-6 max-w-2xl leading-tight">
              Kebijakan <span className="text-wellme-secondary-gradient">Privasi</span>
            </h1>
            <p className="text-sm lg:text-base text-grey-450 font-semibold max-w-xl leading-relaxed">
              Bagaimana Allia Kids mengumpulkan, menyimpan, dan menjaga kerahasiaan rekam medis serta data pribadi buah hati Anda.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 lg:px-10 py-16">
          <div className="max-w-3xl mx-auto bg-white border border-grey-200 rounded-3xl p-8 lg:p-12 shadow-sm space-y-8 text-sm text-grey-450 leading-relaxed font-medium">
            
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-wellme-primary border-b pb-2">1. Pengumpulan Data Pribadi</h2>
              <p>
                Kami mengumpulkan informasi pribadi yang Anda berikan secara sukarela saat mendaftar sesi terapi, seperti nama orang tua, nomor WhatsApp, email, nama anak, usia anak, dan rekam klinis singkat mengenai hambatan tumbuh kembang yang dihadapi.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-wellme-primary border-b pb-2">2. Kerahasiaan Data Rekam Terapi</h2>
              <p>
                Seluruh catatan terapi, rekam medis tumbuh kembang, hasil skrining mandiri, dan laporan asesmen bakat sidik jari bersifat **Sangat Rahasia**.
              </p>
              <p>
                Data tersebut hanya dapat diakses oleh terapis yang menangani anak dan tim medis penanggung jawab di Allia Kids untuk keperluan efektivitas program stimulasi terapi. Kami tidak akan membagikan data rekam medis anak Anda kepada pihak ketiga tanpa persetujuan tertulis dari orang tua.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-wellme-primary border-b pb-2">3. Keamanan File Unggahan</h2>
              <p>
                Seluruh berkas dokumen penunjang seperti bukti transfer pembayaran, data kartu keluarga, atau berkas medis yang Anda unggah melalui portal kami disimpan secara aman menggunakan sistem penyimpanan objek terenkripsi (MinIO) di server lokal kami.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-wellme-primary border-b pb-2">4. Persetujuan Penggunaan Portal</h2>
              <p>
                Dengan menggunakan portal pendaftaran online Allia Kids, Anda menyatakan menyetujui seluruh tata cara pengumpulan dan penggunaan data sesuai dengan poin-poin yang tertera dalam Kebijakan Privasi ini.
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
