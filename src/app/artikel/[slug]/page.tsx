"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ArtikelDetail({ params }: PageProps) {
  const { slug } = use(params);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [otherArticles, setOtherArticles] = useState<any[]>([]);

  const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const BASE_API = rawApiUrl.endsWith("/api") ? rawApiUrl : `${rawApiUrl}/api`;
  const BASE_IMAGE_URL = rawApiUrl.replace("/api", "");

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_API}/edukasi/slug/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setArticle(data);
        }

        // Recommendations
        const listRes = await fetch(`${BASE_API}/edukasi?category=artikel`);
        if (listRes.ok) {
          const all = await listRes.json();
          setOtherArticles(all.filter((a: any) => a.slug !== slug).slice(0, 2));
        }
      } catch (err) {
        console.error("Gagal memuat detail artikel", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticleDetail();
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const showShare = scrollProgress > 3;

  const getImageUrl = (url?: string) => {
    if (!url) return "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300";
    if (url.startsWith("http")) {
      return url.replace("http://194.233.91.132:19000", "https://storage.alliago.id");
    }
    return `${BASE_IMAGE_URL}${url}`;
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

  // Parse blocks
  let contentBlocks: any[] = [];
  if (article && article.description) {
    try {
      const parsed = JSON.parse(article.description);
      if (Array.isArray(parsed)) {
        contentBlocks = parsed;
      }
    } catch (e) {
      // Fallback
      contentBlocks = [{ type: "paragraph", content: article.description }];
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-white">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-wellme-primary border-r-2" />
          <p className="text-grey-400 mt-4 font-semibold">Memuat Artikel...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-white">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-20">
          <h1 className="text-4xl font-extrabold text-wellme-primary mb-4">Artikel Tidak Ditemukan</h1>
          <p className="text-grey-400 mb-8 font-semibold">Maaf, artikel yang Anda cari tidak tersedia.</p>
          <Link href="/artikel" className="rounded-full bg-wellme-primary text-white font-bold px-8 py-3 hover:bg-wellme-secondary transition-all">
            Kembali ke Artikel
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50 relative">
      <div
        className="fixed top-0 left-0 h-1.5 bg-wellme-secondary z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-10 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-bold text-grey-400 mb-8 uppercase tracking-wider">
            <Link href="/" className="hover:text-wellme-primary transition-colors">Beranda</Link>
            <span>/</span>
            <Link href="/artikel" className="hover:text-wellme-primary transition-colors">Artikel</Link>
            <span>/</span>
            <span className="text-wellme-primary truncate max-w-[200px] sm:max-w-xs">{article.title}</span>
          </div>

          {/* Fixed Share Widget */}
          <div
            className={`hidden xl:flex fixed left-8 top-[40%] -translate-y-1/2 flex-col items-center gap-3.5 z-40 bg-white/60 backdrop-blur-md p-3 rounded-full border border-grey-200/50 shadow-sm transition-all duration-500 ease-in-out ${
              showShare ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-12 pointer-events-none"
            }`}
          >
            <span className="text-[9px] font-extrabold text-grey-400 uppercase tracking-widest [writing-mode:vertical-lr] rotate-180 mb-1 select-none">
              SHARE
            </span>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + " " + currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#25D366] hover:brightness-110 text-white flex items-center justify-center shadow transition-all hover:scale-110 cursor-pointer"
              title="Bagikan ke WhatsApp"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.27 4.88L2 22l5.3-.99C8.7 21.6 10.3 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12.004 2zm0 18c-1.52 0-2.98-.38-4.29-1.07l-.3-.16-3.18.59.61-3.08-.18-.31c-.78-1.34-1.2-2.88-1.2-4.47 0-4.69 3.82-8.5 8.5-8.5s8.5 3.81 8.5 8.5-3.82 8.5-8.5 8.5zm4.67-6.23c-.25-.13-1.5-.74-1.74-.83-.23-.09-.4-.13-.57.13-.17.26-.66.83-.81.99-.15.17-.3.19-.55.07-1.1-.55-1.92-1.02-2.63-2.24-.19-.32.19-.3.55-.99.09-.17.04-.33-.02-.46-.07-.13-.57-1.37-.78-1.87-.2-.5-.4-.43-.56-.44h-.47c-.17 0-.44.06-.67.3-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.25 1.05.41 1.41.52.6.19 1.15.16 1.58.1.48-.07 1.5-.61 1.71-1.2.2-.58.2-1.09.14-1.2-.06-.11-.23-.17-.48-.3z" />
              </svg>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#000000] hover:brightness-110 text-white flex items-center justify-center shadow transition-all hover:scale-110 cursor-pointer"
              title="Bagikan ke X"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <button
              onClick={handleCopyLink}
              className="w-9 h-9 rounded-full bg-white border border-grey-200 hover:border-grey-300 text-grey-400 hover:text-wellme-primary flex items-center justify-center shadow transition-all hover:scale-110 cursor-pointer"
              title="Salin Tautan"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <article className="bg-white rounded-3xl p-6 lg:p-10 border border-grey-200 shadow-sm">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-wellme-secondary mb-4 uppercase tracking-wider">
                  <span className="bg-[#EBF3FC] px-3.5 py-1.5 rounded-full border border-grey-100">Parenting</span>
                  <span className="text-grey-300">•</span>
                  <span className="text-grey-400 font-semibold">
                    {new Date(article.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  <span className="text-grey-300">•</span>
                  <span className="text-grey-400 font-bold bg-[#F8FAFC] border border-grey-200 py-1 px-2.5 rounded-full lowercase">
                    {getReadTime(article.description)}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-wellme-primary mb-6 leading-tight">
                  {article.title}
                </h1>

                {/* Mobile/Tablet Share Row */}
                <div className="flex xl:hidden items-center gap-3 border-y border-grey-100 py-3 my-5">
                  <span className="text-xs font-bold text-grey-400 uppercase tracking-wider">Bagikan:</span>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + " " + currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm"
                  >
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.27 4.88L2 22l5.3-.99C8.7 21.6 10.3 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12.004 2zm0 18c-1.52 0-2.98-.38-4.29-1.07l-.3-.16-3.18.59.61-3.08-.18-.31c-.78-1.34-1.2-2.88-1.2-4.47 0-4.69 3.82-8.5 8.5-8.5s8.5 3.81 8.5 8.5-3.82 8.5-8.5 8.5zm4.67-6.23c-.25-.13-1.5-.74-1.74-.83-.23-.09-.4-.13-.57.13-.17.26-.66.83-.81.99-.15.17-.3.19-.55.07-1.1-.55-1.92-1.02-2.63-2.24-.19-.32.19-.3.55-.99.09-.17.04-.33-.02-.46-.07-.13-.57-1.37-.78-1.87-.2-.5-.4-.43-.56-.44h-.47c-.17 0-.44.06-.67.3-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.25 1.05.41 1.41.52.6.19 1.15.16 1.58.1.48-.07 1.5-.61 1.71-1.2.2-.58.2-1.09.14-1.2-.06-.11-.23-.17-.48-.3z" />
                    </svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#000000] text-white flex items-center justify-center shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="w-8 h-8 rounded-full bg-white border border-grey-200 text-grey-400 flex items-center justify-center shadow-sm cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </button>
                </div>

                {/* Hero Image */}
                <div className="rounded-2xl overflow-hidden aspect-video border border-grey-150 mb-8 shadow-sm">
                  <img src={getImageUrl(article.cover_url)} alt={article.title} className="w-full h-full object-cover" />
                </div>

                {/* Rich Content Blocks Renderer */}
                <div className="prose max-w-none text-grey-500 font-medium text-sm sm:text-base leading-relaxed flex flex-col gap-6">
                  {contentBlocks.map((block, index) => {
                    const content = block.content || block.text;

                    if (block.type === "paragraph" && content) {
                      return (
                        <div key={index} className="text-justify whitespace-pre-line leading-relaxed">
                          {content.split("\n").map((line: string, lineIdx: number) => {
                            if (line.startsWith("*")) {
                              return (
                                <div key={lineIdx} className="flex gap-2.5 items-start pl-4 my-1.5">
                                  <span className="text-wellme-secondary font-bold shrink-0">•</span>
                                  <span>{line.replace("*", "").trim()}</span>
                                </div>
                              );
                            }
                            return <p key={lineIdx} className="mb-2">{line}</p>;
                          })}
                        </div>
                      );
                    }

                    if (block.type === "heading" && content) {
                      return (
                        <h2
                          key={index}
                          className="text-xl sm:text-2xl font-extrabold text-wellme-primary mt-8 mb-2 border-l-4 border-wellme-secondary pl-3.5 leading-snug"
                        >
                          {content}
                        </h2>
                      );
                    }

                    if (block.type === "quote" && content) {
                      return (
                        <blockquote
                          key={index}
                          className="bg-slate-50 border-l-4 border-wellme-primary px-6 py-4.5 rounded-r-2xl italic font-bold text-grey-500 my-6 shadow-sm leading-relaxed"
                        >
                          “{content}”
                        </blockquote>
                      );
                    }

                    if (block.type === "image" && block.src) {
                      return (
                        <div key={index} className="flex flex-col items-center gap-2 my-6">
                          <div className="rounded-2xl overflow-hidden border border-grey-150 shadow-sm max-w-full">
                            <img
                              src={getImageUrl(block.src)}
                              alt={block.alt || "Gambar Ilustrasi"}
                              className="w-full h-auto object-cover max-h-[450px]"
                            />
                          </div>
                          {block.caption && (
                            <span className="text-xs text-grey-400 font-bold text-center">
                              {block.caption}
                            </span>
                          )}
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              </article>
            </div>

            {/* Right Sidebar Column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Sidebar Booking Card */}
              <div className="bg-wellme-primary-gradient rounded-3xl p-6 lg:p-8 text-white border border-wellme-primary flex flex-col gap-5 shadow-md">
                <h3 className="text-xl lg:text-2xl font-extrabold leading-snug">
                  Butuh Pendampingan Untuk Sikecil?
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-semibold">
                  Terapis wicara, perilaku, dan praktisi hipnoterapi bersertifikat kami siap membantu mengatasi speech delay, tantrum, fobia, dan emosi anak secara profesional.
                </p>
                <hr className="border-white/20" />
                <a
                  href="https://api.whatsapp.com/send?phone=6281334455616&text=Halo%20Allia%20Kids%2C%20saya%20ingin%20berkonsultasi%20mengenai%20tumbuh%20kembang%20anak."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white hover:bg-wellme-secondary-light text-wellme-primary font-bold py-3.5 text-center transition-all duration-300 shadow-md hover:scale-102 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.835-3.328c1.693.977 3.498 1.488 5.348 1.49h.005c5.688 0 10.316-4.597 10.32-10.248.001-2.738-1.055-5.311-2.973-7.23S14.737 1.83c-5.69 0-10.319 4.601-10.324 10.252-.002 1.884.502 3.722 1.46 5.385L2.148 21.82l4.744-1.148zm11.236-7.378c-.3-.15-1.77-.874-2.046-.975-.276-.102-.477-.152-.676.15-.199.3-.773.976-.948 1.177-.175.2-.35.225-.65.075-.3-.15-1.264-.467-2.408-1.484-.89-.795-1.492-1.778-1.667-2.078-.175-.3-.018-.462.13-.61.135-.133.3-.349.45-.525.15-.175.2-.299.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.629-.926-2.229-.244-.589-.493-.51-.676-.52-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.026-1.05 2.5 0 1.475 1.075 2.899 1.225 3.1 1.05 1.4 2.84 2.8 5.6 3.8 2.76 1 2.76.667 3.26.617.5-.05 1.77-.725 2.02-1.425.25-.7.25-1.3 0-1.425-.075-.125-.275-.2-.575-.35z" />
                  </svg>
                  Tanya Lewat WhatsApp
                </a>
              </div>

              {/* Sidebar Recommendation Grid */}
              {otherArticles.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-grey-200 shadow-sm flex flex-col gap-5">
                  <h4 className="font-extrabold text-wellme-primary border-b border-grey-100 pb-3">
                    Artikel Menarik Lainnya
                  </h4>
                  <div className="flex flex-col gap-4">
                    {otherArticles.map((art) => (
                      <Link key={art.id} href={`/artikel/${art.slug}`} className="flex gap-4 group">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-grey-150">
                          <img src={getImageUrl(art.cover_url)} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h5 className="font-bold text-sm text-wellme-primary group-hover:text-wellme-secondary transition-colors line-clamp-2 leading-snug">
                            {art.title}
                          </h5>
                          <span className="text-[10px] font-bold text-grey-300 uppercase tracking-wider">
                            {new Date(art.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Copy Link Toast Notification */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-white text-xs font-bold px-5 py-3 rounded-full shadow-xl z-50 animate-bounce flex items-center gap-1.5">
          <span className="text-green-400">✓</span> Tautan Berhasil Disalin!
        </div>
      )}

      <Footer />
    </div>
  );
}
