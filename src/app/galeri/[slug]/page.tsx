"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function GaleriDetail({ params }: PageProps) {
  const { slug } = use(params);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [otherItems, setOtherItems] = useState<any[]>([]);

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
    const fetchAlbumDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_API}/edukasi/slug/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setItem(data);
        }

        // Recommendations
        const listRes = await fetch(`${BASE_API}/edukasi?category=galeri`);
        if (listRes.ok) {
          const all = await listRes.json();
          setOtherItems(all.filter((g: any) => g.slug !== slug).slice(0, 3));
        }
      } catch (err) {
        console.error("Gagal memuat detail galeri", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbumDetail();
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
    if (!url) return "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=300";
    if (url.startsWith("http")) {
      return url.replace("http://194.233.91.132:19000", "https://storage.alliago.id");
    }
    return `${BASE_IMAGE_URL}${url}`;
  };

  // Parse photos
  let photos: any[] = [];
  if (item && item.description) {
    try {
      const parsed = JSON.parse(item.description);
      if (Array.isArray(parsed)) {
        photos = parsed;
      }
    } catch (e) {
      // ignore
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-white">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-wellme-primary border-r-2" />
          <p className="text-grey-400 mt-4 font-semibold">Memuat Galeri...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-white">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-20">
          <h1 className="text-4xl font-extrabold text-wellme-primary mb-4">Galeri Tidak Ditemukan</h1>
          <p className="text-grey-400 mb-8 font-semibold">Maaf, dokumentasi kegiatan yang Anda cari tidak tersedia.</p>
          <Link href="/galeri" className="rounded-full bg-wellme-primary text-white font-bold px-8 py-3 hover:bg-wellme-secondary transition-all">
            Kembali ke Galeri
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

          <div className="flex items-center gap-2 text-xs font-bold text-grey-400 mb-8 uppercase tracking-wider">
            <Link href="/" className="hover:text-wellme-primary transition-colors">Beranda</Link>
            <span>/</span>
            <Link href="/galeri" className="hover:text-wellme-primary transition-colors">Galeri</Link>
            <span>/</span>
            <span className="text-wellme-primary truncate max-w-[200px] sm:max-w-xs">{item.title}</span>
          </div>

          <div
            className={`hidden xl:flex fixed left-8 top-[40%] -translate-y-1/2 flex-col items-center gap-3.5 z-40 bg-white/60 backdrop-blur-md p-3 rounded-full border border-grey-200/50 shadow-sm transition-all duration-500 ease-in-out ${
              showShare
                ? "opacity-100 translate-x-0 pointer-events-auto"
                : "opacity-0 -translate-x-12 pointer-events-none"
            }`}
          >
            <span className="text-[9px] font-extrabold text-grey-400 uppercase tracking-widest [writing-mode:vertical-lr] rotate-180 mb-1 select-none">
              SHARE
            </span>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(item.title + " " + currentUrl)}`}
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
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=${encodeURIComponent(currentUrl)}`}
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-6 lg:p-10 border border-grey-200 shadow-sm flex flex-col gap-6">
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-xs font-bold text-wellme-secondary uppercase tracking-wider">
                    <span className="bg-[#EBF3FC] px-3.5 py-1.5 rounded-full border border-grey-100">Galeri</span>
                    <span className="text-grey-300">•</span>
                    <span className="text-grey-400 font-semibold">
                      {new Date(item.created_at).toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                    </span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-wellme-primary leading-tight">
                  {item.title}
                </h1>

                <div className="flex xl:hidden items-center gap-3 border-y border-grey-100 py-3 my-2">
                  <span className="text-xs font-bold text-grey-400 uppercase tracking-wider">Bagikan:</span>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(item.title + " " + currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm"
                  >
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.27 4.88L2 22l5.3-.99C8.7 21.6 10.3 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12.004 2zm0 18c-1.52 0-2.98-.38-4.29-1.07l-.3-.16-3.18.59.61-3.08-.18-.31c-.78-1.34-1.2-2.88-1.2-4.47 0-4.69 3.82-8.5 8.5-8.5s8.5 3.81 8.5 8.5-3.82 8.5-8.5 8.5zm4.67-6.23c-.25-.13-1.5-.74-1.74-.83-.23-.09-.4-.13-.57.13-.17.26-.66.83-.81.99-.15.17-.3.19-.55.07-1.1-.55-1.92-1.02-2.63-2.24-.19-.32.19-.3.55-.99.09-.17.04-.33-.02-.46-.07-.13-.57-1.37-.78-1.87-.2-.5-.4-.43-.56-.44h-.47c-.17 0-.44.06-.67.3-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.25 1.05.41 1.41.52.6.19 1.15.16 1.58.1.48-.07 1.5-.61 1.71-1.2.2-.58.2-1.09.14-1.2-.06-.11-.23-.17-.48-.3z" />
                    </svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=${encodeURIComponent(currentUrl)}`}
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

                <div className="rounded-2xl overflow-hidden bg-slate-100 border border-grey-150 shadow-inner max-w-full">
                  <img
                    src={getImageUrl(item.cover_url)}
                    alt={item.title}
                    className="w-full h-auto max-h-[500px] object-cover mx-auto cursor-zoom-in hover:opacity-95 transition-opacity"
                    onClick={() => setSelectedImage(getImageUrl(item.cover_url))}
                  />
                </div>

                {photos.length > 0 && (
                  <div className="flex flex-col gap-4 mt-4">
                    <h4 className="font-extrabold text-wellme-primary text-sm uppercase tracking-wide border-b border-grey-100 pb-2">
                      Dokumentasi Foto ({photos.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {photos.map((img, idx) => (
                        <div
                          key={idx}
                          className="group rounded-2xl overflow-hidden bg-white border border-grey-200 shadow-sm hover:shadow transition-all flex flex-col cursor-zoom-in"
                          onClick={() => setSelectedImage(getImageUrl(img.src))}
                        >
                          <div className="h-44 overflow-hidden border-b border-grey-100">
                            <img
                              src={getImageUrl(img.src)}
                              alt={img.alt || item.title}
                              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                            />
                          </div>
                          {img.caption && (
                            <div className="p-3 bg-slate-50/50">
                              <p className="text-xs text-grey-450 font-bold leading-normal">
                                {img.caption}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">

              <div className="bg-wellme-primary-gradient rounded-3xl p-6 lg:p-8 text-white border border-wellme-primary flex flex-col gap-5 shadow-md">
                <h3 className="text-xl lg:text-2xl font-extrabold leading-snug">
                  Ingin Mengikuti Kegiatan Kami?
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-semibold">
                  Dapatkan informasi lengkap mengenai pendaftaran kelas stimulasi, bimbel jari matik, atau sesi terapi tumbuh kembang gratis di sekolah Anda.
                </p>
                <hr className="border-white/20" />
                <a
                  href="https://api.whatsapp.com/send?phone=6281334455616&text=Halo%20Allia%20Kids%2C%20saya%20tertarik%20dengan%20kegiatan%20tumbuh%20kembang%20anak."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white hover:bg-wellme-secondary-light text-wellme-primary font-bold py-3.5 text-center transition-all duration-300 shadow-md hover:scale-102 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  Hubungi Admin Allia Kids
                </a>
              </div>

              {otherItems.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-grey-200 shadow-sm flex flex-col gap-5">
                  <h4 className="font-extrabold text-wellme-primary border-b border-grey-100 pb-3">
                    Dokumentasi Lainnya
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {otherItems.map((oth) => (
                      <Link key={oth.id} href={`/galeri/${oth.slug}`} className="flex gap-4 group">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-grey-150">
                          <img src={getImageUrl(oth.cover_url)} alt={oth.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="flex flex-col justify-center font-semibold">
                          <h5 className="font-bold text-xs sm:text-sm text-wellme-primary group-hover:text-wellme-secondary transition-colors line-clamp-2 leading-snug">
                            {oth.title}
                          </h5>
                          <span className="text-[9px] font-bold text-grey-300 uppercase tracking-wider mt-1">
                             {new Date(oth.created_at).toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
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

      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-white text-xs font-bold px-5 py-3 rounded-full shadow-xl z-50 animate-bounce flex items-center gap-1.5">
          <span className="text-green-400">✓</span> Tautan Berhasil Disalin!
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-slate-900/95 backdrop-blur-md z-55 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-0 right-0 -mt-12 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Preview Dokumentasi"
              className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
