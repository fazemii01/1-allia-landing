"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { articlesData } from "@/lib/data";

interface Article {
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

export default function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([]);
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
          // Take the latest 3 articles
          if (Array.isArray(data) && data.length > 0) {
            setArticles(data.slice(0, 3));
          } else {
            // Fallback to static articles data
            setArticles(articlesData.slice(0, 3));
          }
        } else {
          setArticles(articlesData.slice(0, 3));
        }
      } catch (err) {
        console.warn("Gagal memuat artikel dari API, menggunakan data fallback", err);
        setArticles(articlesData.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [BASE_API]);

  const getArticlePreview = (description?: string, desc?: string) => {
    const textContent = description || desc || "";
    if (!textContent) return "";
    try {
      const blocks = JSON.parse(textContent);
      if (Array.isArray(blocks)) {
        const firstPara = blocks.find((b: any) => b.type === "paragraph");
        if (firstPara) {
          const text = firstPara.text || firstPara.content || "";
          return text.slice(0, 120) + (text.length > 120 ? "..." : "");
        }
      }
    } catch (e) {
      // flat text
    }
    return textContent.slice(0, 120) + (textContent.length > 120 ? "..." : "");
  };

  const getImageUrl = (coverUrl?: string, imgUrl?: string) => {
    const url = coverUrl || imgUrl;
    if (!url) return "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600";
    if (url.startsWith("http")) {
      return url.replace("http://194.233.91.132:19000", "https://storage.alliago.id");
    }
    return `${BASE_IMAGE_URL}${url}`;
  };

  const getFormattedDate = (createdAt?: string, staticDate?: string) => {
    if (createdAt) {
      return new Date(createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
    return staticDate || "Juli 2026";
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
            <div key={i} className="rounded-3xl border border-grey-200 bg-white p-6 shadow-sm flex flex-col gap-4 animate-pulse">
              <div className="h-[200px] w-full bg-slate-100 rounded-2xl" />
              <div className="h-6 bg-slate-100 rounded w-3/4" />
              <div className="h-4 bg-slate-100 rounded w-full" />
              <div className="h-4 bg-slate-100 rounded w-5/6" />
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
          Parenting & Tips
        </span>
        <h2 className="text-wellme-primary-gradient text-3xl lg:text-4xl font-extrabold mb-4">
          Artikel Edukasi Terbaru
        </h2>
        <p className="text-sm lg:text-base text-grey-400 font-semibold max-w-2xl mx-auto leading-relaxed">
          Wawasan praktis seputar tumbuh kembang anak, terapi wicara, dan tips parenting dari psikolog klinis & terapis kami.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {articles.map((art, idx) => (
          <div
            key={art.slug + idx}
            className="rounded-3xl border border-grey-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <Link href={`/artikel/${art.slug}`} className="h-[200px] w-full border-b border-grey-100 block overflow-hidden">
                <img
                  src={getImageUrl(art.cover_url, art.img)}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
              </Link>
              <div className="p-6 flex flex-col gap-3">
                <div className="flex justify-between items-center text-[10px] font-bold text-wellme-secondary">
                  <span className="bg-[#EBF3FC] px-2.5 py-1 rounded-full border border-grey-100 uppercase tracking-wider">Parenting</span>
                  <div className="flex items-center gap-1.5 text-grey-400">
                    <span>{getFormattedDate(art.created_at, art.date)}</span>
                  </div>
                </div>
                <Link href={`/artikel/${art.slug}`}>
                  <h3 className="font-extrabold text-base text-wellme-primary leading-tight group-hover:text-wellme-secondary transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                </Link>
                <p className="text-xs text-grey-400 font-semibold leading-relaxed line-clamp-3">
                  {getArticlePreview(art.description, art.desc)}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <Link href={`/artikel/${art.slug}`} className="text-xs font-bold text-wellme-primary hover:text-wellme-secondary flex items-center gap-1 transition-colors">
                Baca Selengkapnya &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/artikel"
          className="inline-flex items-center gap-2 border border-grey-200 hover:border-wellme-primary text-grey-500 hover:text-wellme-primary font-bold px-6 py-3 rounded-full text-xs transition-all duration-300"
        >
          Lihat Semua Artikel
        </Link>
      </div>
    </section>
  );
}
