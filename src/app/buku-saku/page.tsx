"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BukuSaku() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const BASE_API = rawApiUrl.endsWith("/api") ? rawApiUrl : `${rawApiUrl}/api`;
  const BASE_IMAGE_URL = rawApiUrl.replace("/api", "");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${BASE_API}/edukasi?category=buku_saku`);
        if (res.ok) {
          const data = await res.json();
          setBooks(data);
        }
      } catch (err) {
        console.error("Gagal memuat buku saku", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const getImageUrl = (url: string) => {
    if (!url) return "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300";
    if (url.startsWith("http")) return url;
    return `${BASE_IMAGE_URL}${url}`;
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Header */}
        <section className="bg-wellme-100/30 py-16 lg:py-24 border-b border-grey-150 text-center">
          <div className="container mx-auto px-4 lg:px-10">
            <span className="w-fit text-xs font-bold bg-[#EBF3FC] text-wellme-primary px-3.5 py-1.5 rounded-full border border-grey-100 uppercase tracking-wider mb-4 inline-block">
              Sumber Daya Gratis
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary mb-6">
              Buku Saku Parenting Allia Kids
            </h1>
            <p className="text-grey-400 font-medium text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Dapatkan modul bimbingan ringkas dan checklist tumbuh kembang eksklusif untuk mendampingi masa emas pertumbuhan buah hati Anda secara mandiri di rumah.
            </p>
          </div>
        </section>

        {/* Books List */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-10">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-3xl border border-grey-200 bg-white p-6 shadow-sm flex flex-col gap-4 animate-pulse">
                    <div className="h-[200px] w-full bg-slate-100 rounded-2xl" />
                    <div className="h-6 bg-slate-100 rounded w-3/4" />
                    <div className="h-4 bg-slate-100 rounded w-full" />
                    <div className="h-4 bg-slate-100 rounded w-5/6" />
                    <div className="h-10 bg-slate-100 rounded-full mt-4" />
                  </div>
                ))}
              </div>
            ) : books.length === 0 ? (
              <div className="text-center text-grey-400 py-12 font-semibold">
                Belum ada buku saku yang tersedia saat ini.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="rounded-3xl border border-grey-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="h-[200px] w-full rounded-2xl overflow-hidden shadow-inner border border-grey-100">
                        <img src={getImageUrl(book.cover_url)} alt={book.title} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-extrabold text-xl text-wellme-primary leading-tight">
                        {book.title}
                      </h3>
                      <p className="text-sm text-grey-400 font-semibold leading-relaxed">
                        {book.description || "Tidak ada deskripsi."}
                      </p>
                      <div className="flex gap-2 text-xs font-bold text-wellme-secondary">
                        <span className="bg-wellme-100 px-3 py-1 rounded-full">E-Book</span>
                        <span className="bg-wellme-100 px-3 py-1 rounded-full">PDF</span>
                      </div>
                    </div>

                    {book.file_url ? (
                      <a
                        href={book.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-6 text-center rounded-full bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-white font-bold py-3 transition-all duration-300 shadow"
                      >
                        Unduh E-Book (PDF)
                      </a>
                    ) : (
                      <a
                        href={`https://api.whatsapp.com/send?phone=6281334455616&text=Halo%20Allia%20Kids%2C%20saya%20tertarik%20untuk%20mengunduh%20E-Book%20${encodeURIComponent(book.title)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-6 text-center rounded-full bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-white font-bold py-3 transition-all duration-300 shadow"
                      >
                        Dapatkan E-Book Gratis
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
