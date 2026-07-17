"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Galeri() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const BASE_API = rawApiUrl.endsWith("/api") ? rawApiUrl : `${rawApiUrl}/api`;
  const BASE_IMAGE_URL = rawApiUrl.replace("/api", "");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch(`${BASE_API}/edukasi?category=galeri`);
        if (res.ok) {
          const data = await res.json();
          setAlbums(data);
        }
      } catch (err) {
        console.error("Gagal memuat galeri", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  const getImageUrl = (url?: string) => {
    if (!url) return "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=300";
    if (url.startsWith("http")) {
      return url.replace("http://194.233.91.132:19000", "https://backend.jaribakat.com");
    }
    return `${BASE_IMAGE_URL}${url}`;
  };

  const getPhotoCount = (description?: string) => {
    if (!description) return 0;
    try {
      const photos = JSON.parse(description);
      if (Array.isArray(photos)) return photos.length;
    } catch (e) {
      // ignore
    }
    return 0;
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Header */}
        <section className="bg-wellme-100/30 py-16 lg:py-24 border-b border-grey-150 text-center">
          <div className="container mx-auto px-4 lg:px-10">
            <span className="w-fit text-xs font-bold bg-[#EBF3FC] text-wellme-primary px-3.5 py-1.5 rounded-full border border-grey-100 uppercase tracking-wider mb-4 inline-block">
              Dokumentasi Kegiatan
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary mb-6">
              Galeri Kegiatan Allia Kids
            </h1>
            <p className="text-grey-400 font-medium text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Melihat lebih dekat keceriaan buah hati Anda selama mengikuti kelas stimulasi, bimbel jari matik, dan sesi hipnoterapi.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-10">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-3xl border border-grey-200 bg-white p-4 shadow-sm flex flex-col gap-4 animate-pulse">
                    <div className="h-[250px] w-full bg-slate-100 rounded-2xl" />
                    <div className="h-6 bg-slate-100 rounded w-2/3 mx-auto mt-2" />
                  </div>
                ))}
              </div>
            ) : albums.length === 0 ? (
              <div className="text-center text-grey-400 py-12 font-semibold">
                Belum ada galeri kegiatan yang tersedia saat ini.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {albums.map((item) => (
                  <Link
                    key={item.id}
                    href={`/galeri/${item.slug}`}
                    className="rounded-3xl border border-grey-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group block"
                  >
                    <div className="h-[250px] w-full overflow-hidden relative">
                      <img
                        src={getImageUrl(item.cover_url)}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-wellme-primary text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                          {getPhotoCount(item.description)} Foto
                        </span>
                      </div>
                    </div>
                    <div className="p-5 text-center flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-grey-300 uppercase tracking-wider">
                        {new Date(item.created_at).toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                      </span>
                      <h3 className="font-bold text-base text-wellme-primary group-hover:text-wellme-secondary transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
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
