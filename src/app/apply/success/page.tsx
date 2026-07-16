"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ApplySuccessPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-grey-200 shadow-sm flex flex-col items-center gap-6">
            
            {/* Animated Success Checkmark Ring */}
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center border border-green-250 animate-bounce">
              <svg className="w-10 h-10 text-green-500 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs text-green-600 font-bold bg-green-50 py-1.5 px-3.5 rounded-full w-fit mx-auto border border-green-150 uppercase tracking-wider">
                Pendaftaran Berhasil
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-wellme-primary leading-tight mt-2">
                Terima Kasih, Data Telah Kami Terima!
              </h2>
              <p className="text-sm text-grey-400 font-semibold leading-relaxed max-w-md mx-auto">
                Formulir pendaftaran terapi anak Anda telah tersimpan. Tim administrasi Allia Kids akan segera menghubungi Anda melalui nomor WhatsApp untuk menjadwalkan konsultasi awal.
              </p>
            </div>

            <hr className="w-full border-grey-100 my-2" />

            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <a
                href="https://api.whatsapp.com/send?phone=6281334455616&text=Halo%20Allia%20Kids%2C%20saya%20sudah%20mengisi%20formulir%20pendaftaran%20online."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-white font-bold py-3 text-sm shadow transition-all hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
              >
                Konfirmasi Via WhatsApp
              </a>
              <Link
                href="/"
                className="flex-1 rounded-xl border border-grey-200 hover:border-grey-300 text-grey-400 hover:text-wellme-primary font-bold py-3 text-sm transition-all flex items-center justify-center"
              >
                Kembali ke Beranda
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
