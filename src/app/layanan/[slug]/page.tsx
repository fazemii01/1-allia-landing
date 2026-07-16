"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { layananApi, LayananItem } from "@/lib/api";

export default function DynamicLayananPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [layanan, setLayanan] = useState<LayananItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function loadData() {
      try {
        setLoading(true);
        const data = await layananApi.getBySlug(slug);
        setLayanan(data);
      } catch (err: any) {
        console.error(err);
        setError("Layanan tidak ditemukan atau terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-white">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 border-4 border-wellme-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-grey-400 font-semibold">Memuat data layanan...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !layanan) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-white">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center p-8 max-w-md border border-grey-200 rounded-3xl shadow-sm bg-white">
            <span className="text-4xl">⚠️</span>
            <h2 className="text-xl font-bold text-wellme-primary mt-4">Terjadi Kesalahan</h2>
            <p className="text-sm text-grey-400 font-semibold mt-2">{error || "Layanan tidak ditemukan"}</p>
            <Link href="/" className="inline-block mt-6 px-6 py-2.5 bg-wellme-primary text-white rounded-full text-sm font-bold">
              Kembali ke Beranda
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                  {layanan.title}
                </h1>
                <p className="text-grey-400 text-sm lg:text-base font-semibold max-w-xl leading-relaxed mx-auto lg:mx-0">
                  {layanan.description}
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
                  <Link
                    href="/apply"
                    className="rounded-full bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient border border-wellme-secondary hover:border-wellme-primary text-white font-bold px-8 py-3 transition-all duration-300 shadow-md hover:scale-105"
                  >
                    Booking Sesi {layanan.title}
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[420px] rounded-3xl overflow-hidden shadow-lg border border-white aspect-[4/3]">
                  <img
                    src={layanan.image_url || "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600"}
                    alt={layanan.title}
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
              <div className="text-xl font-extrabold text-wellme-primary">
                {layanan.stats?.durasi_sesi || "-"}
              </div>
            </div>
            <div className="border border-grey-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-xs text-grey-400 font-bold uppercase mb-2">Format Layanan</div>
              <div className="text-xl font-extrabold text-wellme-primary">
                {layanan.stats?.format_layanan || "-"}
              </div>
            </div>
            <div className="border border-grey-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-xs text-grey-400 font-bold uppercase mb-2">Mulai Dari</div>
              <div className="text-xl font-extrabold text-wellme-primary">
                {layanan.stats?.mulai_dari || "-"}
              </div>
            </div>
          </div>

          {/* Detailed Programs Grid */}
          {layanan.programs && layanan.programs.length > 0 && (
            <div className="mb-20">
              <div className="text-center flex flex-col gap-3 mb-10">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-wellme-primary">
                  Program Spesifik {layanan.title}
                </h2>
                <p className="text-grey-400 font-medium text-sm lg:text-base max-w-xl mx-auto leading-relaxed">
                  Kami merancang program spesifik sesuai kebutuhan emosi, perilaku, dan kebiasaan buah hati Anda.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {layanan.programs.map((prog, idx) => (
                  <div key={idx} className="border border-grey-200 rounded-3xl p-6 bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-bold text-lg text-wellme-primary">{prog.title}</h3>
                      <p className="text-sm text-grey-400 font-medium leading-relaxed">{prog.desc}</p>
                      <div className="text-sm font-extrabold text-wellme-secondary">{prog.harga}</div>
                    </div>
                    <a
                      href={`https://api.whatsapp.com/send?phone=6281334455616&text=Halo%20Allia%20Kids%2C%20saya%20tertarik%20booking%20sesi%20${encodeURIComponent(prog.title)}%20untuk%20anak%20saya.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-5 text-center text-xs font-bold py-2.5 rounded-full border border-wellme-secondary text-wellme-secondary hover:bg-wellme-secondary hover:text-white transition-all duration-200"
                    >
                      Booking Now
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {layanan.mengapa_memilih && layanan.mengapa_memilih.length > 0 && (
              <div>
                <h2 className="text-wellme-primary text-2xl lg:text-3xl font-extrabold mb-6">
                  Mengapa Memilih {layanan.title} di Allia Kids?
                </h2>
                <div className="flex flex-col gap-4">
                  {layanan.mengapa_memilih.map((benefit, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="w-5 h-5 rounded-full bg-wellme-100 text-wellme-primary flex items-center justify-center font-bold text-xs mt-1 shrink-0">✓</span>
                      <p className="text-grey-400 font-semibold text-sm lg:text-base leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {layanan.isu_permasalahan && layanan.isu_permasalahan.length > 0 && (
              <div className="bg-white-wellme rounded-3xl p-8 border border-grey-200 shadow-sm flex flex-col justify-center">
                <h3 className="text-xl font-extrabold text-wellme-primary mb-3">
                  Isu & Permasalahan yang Sangat Efektif Diterapi
                </h3>
                <p className="text-sm text-grey-400 font-semibold mb-6 leading-relaxed">
                  Layanan ini terbukti secara klinis mempercepat pemulihan berbagai tantangan anak berikut ini:
                </p>
                <div className="flex flex-wrap gap-2">
                  {layanan.isu_permasalahan.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold text-wellme-primary bg-white border border-grey-200 px-3 py-1.5 rounded-full shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
