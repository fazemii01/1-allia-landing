"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { galleryData } from "@/lib/data";

interface GalleryItem {
  id?: number;
  slug: string;
  title: string;
  cover_url?: string;
  img?: string;
  description?: string;
  desc?: string;
  created_at?: string;
  date?: string;
}

export default function GallerySection() {
  const [albums, setAlbums] = useState<GalleryItem[]>([]);
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
          if (Array.isArray(data) && data.length > 0) {
            setAlbums(data.slice(0, 3));
          } else {
            setAlbums(galleryData.slice(0, 3));
          }
        } else {
          setAlbums(galleryData.slice(0, 3));
        }
      } catch (err) {
        console.warn("Gagal memuat galeri dari API, menggunakan data fallback", err);
        setAlbums(galleryData.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, [BASE_API]);

  const getImageUrl = (coverUrl?: string, imgUrl?: string) => {
    const url = coverUrl || imgUrl;
    if (!url) return "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=600";
    if (url.startsWith("http")) {
      return url.replace("http://194.233.91.132:19000", "https://storage.alliago.id");
    }
    return `${BASE_IMAGE_URL}${url}`;
  };

  const getPhotoCount = (description?: string, desc?: string) => {
    const textContent = description || desc || "";
    if (!textContent) return 0;
    try {
      const photos = JSON.parse(textContent);
      if (Array.isArray(photos)) return photos.length;
    } catch (e) {
      // ignore
    }
    return 2; // fallback count
  };

  const getFormattedDate = (createdAt?: string, staticDate?: string) => {
    if (createdAt) {
      return new Date(createdAt).toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      });
    }
    return staticDate || "Maret 2026";
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 lg:px-10 mb-32">
        <div className="text-center mb-12">
          <div className="h-4 bg-slate-100 rounded w-24 mx-auto mb-4 animate-pulse" />
          <div className="h-8 bg-slate-100 rounded w-80 mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-grey-200 bg-white p-4 shadow-sm flex flex-col gap-4 animate-pulse">
              <div className="h-[250px] w-full bg-slate-100 rounded-2xl" />
              <div className="h-6 bg-slate-100 rounded w-2/3 mx-auto mt-2 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 lg:px-10 mb-32">
      <div className="text-center mb-12">
        <span className="w-fit text-xs font-bold bg-[#EBF3FC] text-wellme-primary px-3.5 py-1.5 rounded-full border border-grey-100 uppercase tracking-wider mb-4 inline-block">
          Dokumentasi Kegiatan
        </span>
        <h2 className="text-wellme-primary-gradient text-3xl lg:text-4xl font-extrabold mb-4">
          Galeri Kegiatan Allia Kids
        </h2>
        <p className="text-sm lg:text-base text-grey-400 font-semibold max-w-2xl mx-auto leading-relaxed">
          Melihat lebih dekat keceriaan buah hati Anda selama mengikuti kelas stimulasi, bimbel jari matik, dan sesi terapi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {albums.map((item, idx) => (
          <Link
            key={item.slug + idx}
            href={`/galeri/${item.slug}`}
            className="rounded-3xl border border-grey-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group block"
          >
            <div className="h-[250px] w-full overflow-hidden relative">
              <img
                src={getImageUrl(item.cover_url, item.img)}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-wellme-primary text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                  {getPhotoCount(item.description, item.desc)} Foto
                </span>
              </div>
            </div>
            <div className="p-5 text-center flex flex-col gap-2">
              <span className="text-[10px] font-bold text-grey-300 uppercase tracking-wider">
                {getFormattedDate(item.created_at, item.date)}
              </span>
              <h3 className="font-extrabold text-base text-wellme-primary group-hover:text-wellme-secondary transition-colors line-clamp-1">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/galeri"
          className="inline-flex items-center gap-2 border border-grey-200 hover:border-wellme-primary text-grey-500 hover:text-wellme-primary font-bold px-6 py-3 rounded-full text-xs transition-all duration-300"
        >
          Lihat Semua Galeri
        </Link>
      </div>
    </section>
  );
}
