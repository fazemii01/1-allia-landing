"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  id?: number;
  name: string;
  role: string;
  message: string;
  avatar_url: string | null;
  rating: number;
}

const STATIC_TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ibu Alifah',
    role: 'Orang Tua dari Alifah (3 Tahun)',
    message: 'Sangat bersyukur bertemu terapis di Allia Kids. Alifah yang tadinya speech delay berat, sekarang setelah 3 bulan terapi wicara perkembangannya pesat sekali, sudah mulai merangkai kalimat pendek dan komunikatif.',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200',
    rating: 5
  },
  {
    name: 'Bapak Rian',
    role: 'Orang Tua dari Fatih (5 Tahun)',
    message: 'Metode hipnoterapi anak di Allia Kids luar biasa membantu mengatasi trauma makan nasi anak saya. Sebelumnya sangat susah makan karbohidrat, sekarang nafsu makannya membaik dan mau makan nasi lagi.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    rating: 5
  },
  {
    name: 'Ibu Nabila',
    role: 'Orang Tua dari Rayhan (4 Tahun)',
    message: 'Terapis perilaku sangat sabar membimbing Rayhan yang hiperaktif. Sekarang fokus belajarnya meningkat pesat dan emosinya jauh lebih stabil saat diajak beraktivitas di rumah maupun di sekolah.',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
    rating: 5
  }
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const BASE_API = rawApiUrl.endsWith("/api") ? rawApiUrl : `${rawApiUrl}/api`;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${BASE_API}/testimonials`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setTestimonials(data);
          } else {
            setTestimonials(STATIC_TESTIMONIALS);
          }
        } else {
          setTestimonials(STATIC_TESTIMONIALS);
        }
      } catch (err) {
        console.warn("Gagal memuat testimoni dari API, menggunakan data fallback", err);
        setTestimonials(STATIC_TESTIMONIALS);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, [BASE_API]);

  const getImageUrl = (url: string | null) => {
    if (!url) return "";
    if (url.startsWith("http")) {
      return url.replace("http://194.233.91.132:19000", "https://storage.alliago.id");
    }
    return `${rawApiUrl.replace("/api", "")}${url}`;
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 lg:px-10 mb-32">
        <div className="text-center mb-12">
          <div className="h-4 bg-slate-100 rounded w-24 mx-auto mb-4 animate-pulse" />
          <div className="h-8 bg-slate-100 rounded w-80 mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-3xl border border-grey-200 bg-white p-6 shadow-sm flex flex-col gap-4 animate-pulse">
              <div className="h-4 bg-slate-100 rounded w-1/3" />
              <div className="h-4 bg-slate-100 rounded w-full" />
              <div className="h-4 bg-slate-100 rounded w-5/6" />
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-slate-100" />
                <div className="flex-1">
                  <div className="h-4 bg-slate-100 rounded w-2/3" />
                  <div className="h-3 bg-slate-100 rounded w-1/2 mt-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-wellme-secondary-light/35 py-24 mb-32 border-y border-grey-150">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="text-center mb-16">
          <span className="w-fit text-xs font-bold bg-white text-wellme-primary px-3.5 py-1.5 rounded-full border border-grey-100 uppercase tracking-wider mb-4 inline-block shadow-sm">
            Kisah Sukses Orang Tua
          </span>
          <h2 className="text-wellme-primary-gradient text-3xl lg:text-4xl font-extrabold mb-4">
            Apa Kata Mereka?
          </h2>
          <p className="text-sm lg:text-base text-grey-400 font-semibold max-w-2xl mx-auto leading-relaxed">
            Cerita tulus dari para orang tua yang memercayakan tumbuh kembang buah hatinya bersama praktisi dan terapis Allia Kids.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-grey-200/80 bg-white p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300 relative group"
            >
              <div>
                {/* Five Star Rating */}
                <div className="flex gap-1 mb-5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < t.rating ? "currentColor" : "none"}
                      className={i < t.rating ? "text-amber-400" : "text-grey-200"}
                    />
                  ))}
                </div>

                {/* Message */}
                <p className="text-sm text-grey-500 font-medium italic leading-relaxed mb-8 relative">
                  &ldquo;{t.message}&rdquo;
                </p>
              </div>

              {/* User Avatar Info */}
              <div className="flex items-center gap-4 border-t border-grey-100 pt-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-wellme-100 shrink-0 border border-wellme-100/50">
                  {t.avatar_url ? (
                    <img
                      src={getImageUrl(t.avatar_url)}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-wellme-primary/10 text-wellme-primary font-bold text-base uppercase">
                      {t.name.slice(0, 2)}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-extrabold text-wellme-primary truncate">{t.name}</h4>
                  <p className="text-xs text-grey-450 font-semibold truncate">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
