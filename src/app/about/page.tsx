import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      {/* Header and Navigation */}
      <Navbar />

      {/* Main Flow Content */}
      <main className="flex-grow pt-24 pb-20">
        {/* Hero Section */}
        <section className="bg-wellme-100/30 py-16 lg:py-24 border-b border-grey-150">
          <div className="container mx-auto px-4 lg:px-10 text-center flex flex-col items-center">
            <span className="bg-wellme-primary/10 text-wellme-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Pusat Tumbuh Kembang & Hipnoterapi Anak
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary-gradient mb-6 max-w-2xl leading-tight">
              Tentang <span className="text-wellme-secondary-gradient">Allia Kids</span>
            </h1>
            <p className="text-sm lg:text-base text-grey-450 font-semibold max-w-xl leading-relaxed">
              Pendamping profesional tumbuh kembang buah hati Anda melalui pendekatan ilmiah, ramah anak, dan berbasis hipnosis klinis.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-4 lg:px-10 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-wellme-primary leading-snug">
                Pusat Terapi dengan Pendampingan Ramah Anak
              </h2>
              <p className="text-sm text-grey-450 leading-relaxed font-medium">
                <strong>Allia Kids</strong> adalah klinik tumbuh kembang dan hipnoterapi yang berfokus pada penanganan permasalahan anak dan remaja melalui pendekatan ilmiah dan terapi berbasis hipnosis klinis. Kami percaya bahwa setiap anak memiliki potensi luar biasa yang dapat dikembangkan apabila hambatan psikologis, emosi, dan perilaku dapat ditangani dengan tepat.
              </p>
              <p className="text-sm text-grey-450 leading-relaxed font-medium">
                Dengan tim terapis bersertifikat dan berpengalaman, Allia Kids menghadirkan solusi efektif dan menyenangkan bagi anak-anak. Kami mengutamakan <strong>pendekatan ramah anak</strong>, sehingga proses terapi dilakukan dengan cara yang aman, nyaman, dan tanpa tekanan.
              </p>
            </div>
            
            {/* Visual Bento Card */}
            <div className="bg-gradient-to-br from-wellme-100/50 to-wellme-200/20 border border-wellme-primary/10 rounded-3xl p-8 lg:p-10 flex flex-col gap-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-wellme-secondary/5 rounded-full blur-3xl" />
              
              <div className="flex gap-4 items-start">
                <div className="text-wellme-primary p-2 bg-white/80 rounded-xl shadow-sm shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Penuh Cinta & Perhatian</h4>
                  <p className="text-xs text-grey-400 mt-1 leading-relaxed">Terapi dijalankan dengan memahami karakteristik personal unik si kecil secara mendalam.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-wellme-primary/10 pt-5">
                <div className="text-wellme-primary p-2 bg-white/80 rounded-xl shadow-sm shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Metode Ilmiah & Profesional</h4>
                  <p className="text-xs text-grey-400 mt-1 leading-relaxed">Mengedepankan riset klinis psikologi anak modern untuk proses intervensi stimulasi terbaik.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start border-t border-wellme-primary/10 pt-5">
                <div className="text-wellme-primary p-2 bg-white/80 rounded-xl shadow-sm shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Terapis Praktisi Bersertifikat</h4>
                  <p className="text-xs text-grey-400 mt-1 leading-relaxed">Didampingi terapis wicara, terapis perilaku, dan hipnoterapis anak yang berkompeten.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="bg-neutral-50 py-16 lg:py-20 border-t border-b border-grey-150">
          <div className="container mx-auto px-4 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Visi Card */}
              <div className="bg-white border border-grey-200 rounded-3xl p-8 shadow-sm flex flex-col gap-4">
                <div className="w-12 h-12 bg-wellme-primary/10 rounded-2xl flex items-center justify-center text-wellme-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-wellme-primary">Visi Kami</h3>
                <p className="text-sm text-grey-450 leading-relaxed font-medium">
                  Menjadi klinik tumbuh kembang dan hipnoterapi anak terpercaya di Indonesia yang membantu anak-anak menemukan potensi terbaiknya, tumbuh bahagia, sehat, dan percaya diri.
                </p>
              </div>

              {/* Misi Card */}
              <div className="bg-white border border-grey-200 rounded-3xl p-8 shadow-sm flex flex-col gap-4">
                <div className="w-12 h-12 bg-wellme-secondary/10 rounded-2xl flex items-center justify-center text-wellme-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-wellme-primary">Misi Kami</h3>
                <ul className="space-y-3 text-sm text-grey-450 font-medium">
                  <li className="flex gap-2 items-start">
                    <span className="text-wellme-secondary">✓</span>
                    <span>Memberikan layanan hipnoterapi yang aman, efektif, dan ramah anak.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-wellme-secondary">✓</span>
                    <span>Membantu anak mengatasi hambatan psikologis, emosi, dan perilaku.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-wellme-secondary">✓</span>
                    <span>Memberikan edukasi kepada orang tua mengenai kesehatan mental anak.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-wellme-secondary">✓</span>
                    <span>Mengedepankan metode ilmiah dan profesional dalam setiap sesi terapi.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 lg:px-10 py-16 lg:py-20 text-center">
          <div className="bg-gradient-to-br from-wellme-800 to-wellme-900 rounded-3xl p-8 lg:p-16 text-white max-w-4xl mx-auto shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
            <h2 className="text-2xl lg:text-4xl font-extrabold mb-4 leading-tight">
              Ingin Si Kecil Tumbuh Lebih Optimal?
            </h2>
            <p className="text-xs lg:text-sm text-white/80 max-w-xl mx-auto mb-8 font-semibold leading-relaxed">
              Dapatkan konsultasi awal gratis bersama praktisi kami untuk mengidentifikasi hambatan tumbuh kembang atau emosional si kecil secara ramah dan nyaman.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/apply"
                className="bg-wellme-secondary-gradient hover:brightness-110 text-white font-bold px-8 py-3.5 rounded-full text-sm shadow-md transition-all"
              >
                Booking Sesi Sekarang
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=6285138511348&text=Halo%20Allia%20Kids%2C%20saya%20tertarik%20untuk%20berkonsultasi%20mengenai%20layanan%20terapi"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold px-8 py-3.5 rounded-full text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                Tanya Administrasi
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Navigation */}
      <Footer />
    </div>
  );
}
