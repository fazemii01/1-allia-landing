"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Artikel() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const BASE_API = rawApiUrl.endsWith("/api") ? rawApiUrl : `${rawApiUrl}/api`;
  const BASE_IMAGE_URL = rawApiUrl.replace("/api", "");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${BASE_API}/edukasi?category=artikel`);
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (err) {
        console.error("Gagal memuat artikel", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const getArticlePreview = (description?: string) => {
    if (!description) return "";
    try {
      const blocks = JSON.parse(description);
      if (Array.isArray(blocks)) {
        const firstPara = blocks.find((b: any) => b.type === "paragraph");
        if (firstPara) {
          const text = firstPara.text || firstPara.content || "";
          return text.slice(0, 160) + (text.length > 160 ? "..." : "");
        }
      }
    } catch (e) {
      return description.slice(0, 160) + (description.length > 160 ? "..." : "");
    }
    return "";
  };

  const getReadTime = (description?: string) => {
    if (!description) return "3 min read";
    try {
      const blocks = JSON.parse(description);
      if (Array.isArray(blocks)) {
        const text = blocks.map((b: any) => b.text || b.content || "").join(" ");
        const words = text.trim().split(/\s+/).length;
        const time = Math.max(1, Math.ceil(words / 200));
        return `${time} menit baca`;
      }
    } catch (e) {
      // ignore
    }
    return "3 menit baca";
  };

  const getImageUrl = (url?: string) => {
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
              Edukasi & Tips
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary mb-6">
              Artikel & Wawasan Parenting
            </h1>
            <p className="text-grey-400 font-medium text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Kumpulan artikel edukasi dan panduan praktis dari psikolog klinis anak dan praktisi tumbuh kembang Allia Kids.
            </p>
          </div>
        </section>

        {/* Articles List */}
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
                    <div className="h-5 bg-slate-100 rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center text-grey-400 py-12 font-semibold">
                Belum ada artikel yang tersedia saat ini.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="rounded-3xl border border-grey-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <Link href={`/artikel/${art.slug}`} className="h-[200px] w-full border-b border-grey-100 block overflow-hidden">
                        <img src={getImageUrl(art.cover_url)} alt={art.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                      </Link>
                      <div className="p-6 flex flex-col gap-3">
                        <div className="flex justify-between items-center text-xs font-bold text-wellme-secondary">
                          <span className="bg-[#EBF3FC] px-2.5 py-1 rounded-full border border-grey-100">Parenting</span>
                          <div className="flex items-center gap-1.5 text-grey-400">
                            <span>{new Date(art.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                            <span>•</span>
                            <span className="lowercase font-bold text-wellme-primary">{getReadTime(art.description)}</span>
                          </div>
                        </div>
                        <Link href={`/artikel/${art.slug}`}>
                          <h3 className="font-extrabold text-lg text-wellme-primary leading-tight group-hover:text-wellme-secondary transition-colors line-clamp-2">
                            {art.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-grey-400 font-semibold leading-relaxed line-clamp-3">
                          {getArticlePreview(art.description)}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2">
                      <Link href={`/artikel/${art.slug}`} className="text-xs font-bold text-wellme-primary hover:text-wellme-secondary flex items-center gap-1">
                        Baca Selengkapnya &rarr;
                      </Link>
                    </div>
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
