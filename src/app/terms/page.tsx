import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        {/* Hero Section */}
        <section className="bg-wellme-100/30 py-16 lg:py-20 border-b border-grey-150">
          <div className="container mx-auto px-4 lg:px-10 text-center flex flex-col items-center">
            <span className="bg-wellme-primary/10 text-wellme-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Ketentuan Hukum & Penggunaan
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary-gradient mb-6 max-w-2xl leading-tight">
              Syarat & <span className="text-wellme-secondary-gradient">Ketentuan</span>
            </h1>
            <p className="text-sm lg:text-base text-grey-450 font-semibold max-w-xl leading-relaxed">
              Aturan, kebijakan pendaftaran, dan batasan tanggung jawab yang berlaku bagi seluruh pengguna portal Allia Kids.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 lg:px-10 py-16">
          <div className="max-w-3xl mx-auto bg-white border border-grey-200 rounded-3xl p-8 lg:p-12 shadow-sm space-y-8 text-sm text-grey-450 leading-relaxed font-medium">
            
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-wellme-primary border-b pb-2">1. Ketentuan Pendaftaran Sesi</h2>
              <p>
                Setiap pendaftaran sesi konsultasi atau terapi tumbuh kembang diwajibkan mengisi data anak secara jujur dan lengkap melalui portal pendaftaran Allia Kids.
              </p>
              <p>
                Jadwal sesi yang telah disepakati bersama administrasi bersifat mengikat. Jika orang tua berhalangan hadir pada sesi offline, diharapkan melakukan konfirmasi reschedule maksimal 24 jam sebelum sesi berlangsung.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-wellme-primary border-b pb-2">2. Kebijakan Pembayaran</h2>
              <p>
                Pembayaran biaya administrasi atau paket terapi wajib dilakukan sesuai nominal yang tertera pada invoice tagihan portal pendaftaran resmi kami.
              </p>
              <p>
                Bukti pembayaran wajib diunggah melalui formulir yang tersedia di portal dalam waktu 1x24 jam untuk memverifikasi keabsahan sesi terapi yang akan berjalan.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-wellme-primary border-b pb-2">3. Tanggung Jawab Orang Tua</h2>
              <p>
                Allia Kids berperan sebagai fasilitator stimulasi dan terapi tumbuh kembang. Keberhasilan proses terapi sangat didukung oleh partisipasi aktif dan konsistensi orang tua dalam menerapkan arahan terapis di lingkungan rumah.
              </p>
              <p>
                Orang tua berkewajiban mendampingi anak selama berada di area klinik untuk menjaga keamanan fisik buah hati Anda.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-wellme-primary border-b pb-2">4. Perubahan Syarat Ketentuan</h2>
              <p>
                Allia Kids berhak melakukan perubahan terhadap syarat dan ketentuan ini sewaktu-waktu. Seluruh perubahan akan diumumkan langsung di halaman ini dan berlaku secara efektif sejak tanggal diterbitkan.
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
