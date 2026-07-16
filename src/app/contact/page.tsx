import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        {/* Hero Section */}
        <section className="bg-wellme-100/30 py-16 lg:py-20 border-b border-grey-150">
          <div className="container mx-auto px-4 lg:px-10 text-center flex flex-col items-center">
            <span className="bg-wellme-primary/10 text-wellme-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Layanan Dukungan & Hubungi Kami
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary-gradient mb-6 max-w-2xl leading-tight">
              Hubungi <span className="text-wellme-secondary-gradient">Allia Kids</span>
            </h1>
            <p className="text-sm lg:text-base text-grey-450 font-semibold max-w-xl leading-relaxed">
              Tim administrasi kami siap menjawab pertanyaan seputar pendaftaran, konsultasi awal, biaya layanan terapis, dan kemitraan.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="container mx-auto px-4 lg:px-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Address Card */}
            <div className="border border-grey-200 rounded-3xl p-8 shadow-sm flex flex-col gap-4 bg-white">
              <div className="w-12 h-12 bg-wellme-primary/10 rounded-2xl flex items-center justify-center text-wellme-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800">Alamat Kantor</h3>
              <p className="text-xs text-grey-400 leading-relaxed font-semibold">
                Perum Adara Park 2, Blok D17, Karanganyar, Kabuaran, Kec. Kunir, Kabupaten Lumajang, Jawa Timur 67383
              </p>
            </div>

            {/* Phone/WhatsApp Card */}
            <div className="border border-grey-200 rounded-3xl p-8 shadow-sm flex flex-col gap-4 bg-white">
              <div className="w-12 h-12 bg-wellme-primary/10 rounded-2xl flex items-center justify-center text-wellme-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800">WhatsApp & Telepon</h3>
              <p className="text-xs text-grey-400 leading-relaxed font-semibold">
                Senin - Sabtu (08:00 - 17:00 WIB)
              </p>
              <a
                href="https://api.whatsapp.com/send?phone=6281334455616&text=Halo%20Allia%20Kids%2C%20saya%20ingin%20berkonsultasi"
                className="text-sm font-bold text-wellme-primary hover:underline"
              >
                081334455616
              </a>
            </div>

            {/* Email Card */}
            <div className="border border-grey-200 rounded-3xl p-8 shadow-sm flex flex-col gap-4 bg-white">
              <div className="w-12 h-12 bg-wellme-primary/10 rounded-2xl flex items-center justify-center text-wellme-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800">E-mail Resmi</h3>
              <p className="text-xs text-grey-400 leading-relaxed font-semibold">
                Kirimkan surat elektronik terkait kerja sama formal atau penawaran produk.
              </p>
              <a href="mailto:halo@alliakids.com" className="text-sm font-bold text-wellme-primary hover:underline">
                halo@alliakids.com
              </a>
            </div>
          </div>

          {/* Maps Embed Section */}
          <div className="max-w-5xl mx-auto mt-16">
            <div className="border border-grey-200 rounded-3xl overflow-hidden shadow-sm h-[350px] sm:h-[450px]">
              <iframe
                title="Peta Lokasi Allia Kids Lumajang"
                src="https://maps.google.com/maps?q=Perumahan%20Adara%20Park%202%20Lumajang&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Quick Chat Section */}
          <div className="bg-gradient-to-br from-wellme-100/50 to-wellme-200/20 border border-wellme-primary/10 rounded-3xl p-8 lg:p-12 max-w-3xl mx-auto mt-16 text-center">
            <h3 className="text-xl font-bold text-wellme-primary mb-2">Konsultasi Sesi Terapi Instan</h3>
            <p className="text-xs text-grey-400 max-w-md mx-auto mb-6 leading-relaxed">
              Anda tidak perlu menunggu lama. Klik tombol di bawah untuk langsung terhubung dengan WhatsApp Admin kami sekarang juga.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=6281334455616&text=Halo%20Allia%20Kids%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20terapi%20dan%2520konsultasi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-wellme-secondary-gradient hover:brightness-105 text-white font-bold px-8 py-3.5 rounded-full text-xs shadow-md transition-all cursor-pointer"
            >
              Hubungi Admin via WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
