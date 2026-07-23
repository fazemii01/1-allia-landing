"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClipboardIcon, CloseIcon } from "@/components/icons";
import { patientsApi } from "@/lib/api";

export default function TesPsikologi() {
  const router = useRouter();

  // Active Real States
  const [userState, setUserState] = useState<'unauthenticated' | 'authenticated_no_bookings' | 'authenticated_has_bookings'>('unauthenticated');
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [activeBookings, setActiveBookings] = useState<string[]>([]);
  const [testHistory, setTestHistory] = useState<{ testTitle: string; date: string; result: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Active quiz state
  const [activeQuiz, setActiveQuiz] = useState<null | number>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizStep, setQuizStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const logged = localStorage.getItem("isLoggedIn");
      if (logged === "true") {
        const storedParent = localStorage.getItem("parentName") || "Orang Tua";
        const token = localStorage.getItem("token") || "";
        const storedHistory = localStorage.getItem("testHistory");

        setParentName(storedParent);
        
        const DEFAULT_TEST_HISTORY = [
          {
            testTitle: "Skrining Tumbuh Kembang Anak (SDIDTK)",
            date: new Date().toLocaleDateString("id-ID"),
            result: "Sesuai / Bagus",
          },
          {
            testTitle: "Kuesioner Masalah Perilaku & Emosi Anak",
            date: "2026-07-10",
            result: "Sesuai / Bagus",
          }
        ];

        setParentName(storedParent);
        
        if (storedHistory) {
          try {
            const parsed = JSON.parse(storedHistory);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setTestHistory(parsed);
            } else {
              setTestHistory(DEFAULT_TEST_HISTORY);
            }
          } catch (e) {
            setTestHistory(DEFAULT_TEST_HISTORY);
          }
        } else {
          setTestHistory(DEFAULT_TEST_HISTORY);
        }

        // Fetch real active therapies from backend
        async function fetchMyTherapies() {
          try {
            setLoading(true);
            const data = await patientsApi.getMyActiveTherapies(token);
            if (data && data.length > 0) {
              // Extract child details from the first patient record
              const primaryChild = data[0];
              setChildName(primaryChild.nama_lengkap);
              setChildAge(String(primaryChild.usia));
              
              // Extract all registered therapies
              const therapies = data.map((p) => p.jenis_terapi).filter(Boolean);
              setActiveBookings(therapies);

              if (therapies.length > 0) {
                setUserState('authenticated_has_bookings');
              } else {
                setUserState('authenticated_no_bookings');
              }
            } else {
              // No patients registered under this parent yet
              setChildName(localStorage.getItem("childName") || "Si Kecil");
              setChildAge(localStorage.getItem("childAge") || "3");
              setUserState('authenticated_no_bookings');
            }
          } catch (err) {
            console.error("Gagal memuat data terapi dari server:", err);
            // Fallback to local storage if API fails (for offline resilience)
            const storedChild = localStorage.getItem("childName") || "Si Kecil";
            const storedAge = localStorage.getItem("childAge") || "3";
            setChildName(storedChild);
            setChildAge(storedAge);
            
            const storedBookings = localStorage.getItem("activeBookings");
            if (storedBookings) {
              try {
                const parsedBookings = JSON.parse(storedBookings);
                setActiveBookings(parsedBookings);
                if (parsedBookings.length > 0) {
                  setUserState('authenticated_has_bookings');
                } else {
                  setUserState('authenticated_no_bookings');
                }
              } catch (e) {
                setUserState('authenticated_no_bookings');
              }
            } else {
              setUserState('authenticated_no_bookings');
            }
          } finally {
            setLoading(false);
          }
        }

        fetchMyTherapies();
      } else {
        setUserState('unauthenticated');
        setLoading(false);
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("parentName");
      localStorage.removeItem("whatsapp");
      localStorage.removeItem("email");
      localStorage.removeItem("childName");
      localStorage.removeItem("childAge");
      localStorage.removeItem("activeBookings");
      localStorage.removeItem("testHistory");
    }
    setUserState('unauthenticated');
    setParentName("");
    setChildName("");
    setChildAge("");
    setActiveBookings([]);
    setTestHistory([]);
  };

  const tests = [
    {
      title: "Skrining Tumbuh Kembang Anak (SDIDTK)",
      description: "Asesmen tahapan motorik kasar, gerak halus, kognitif, dan kemandirian sosial anak usia 1-5 tahun.",
      duration: "10 menit",
      category: "Skrining Tumbuh Kembang / Terapi Wicara",
      questions: [
        "Apakah anak dapat berdiri dengan satu kaki selama beberapa detik tanpa jatuh?",
        "Apakah anak dapat merangkai 3 sampai 4 kata dalam berbicara secara jelas?",
        "Apakah anak dapat menyusun balok atau memegang alat tulis dengan benar?",
        "Apakah anak sudah dapat makan sendiri secara mandiri tanpa banyak tumpah?",
        "Apakah anak aktif berinteraksi dan bermain bersama teman sebayanya (tidak menyendiri)?",
      ],
    },
    {
      title: "Kuesioner Masalah Perilaku & Emosi Anak",
      description: "Deteksi dini potensi hambatan emosional, kecemasan berlebih, tantrum ekstrem, atau kesulitan pemusatan perhatian.",
      duration: "10 menit",
      category: "Hipnoterapi Anak / Terapi Perilaku",
      questions: [
        "Apakah anak sering terlihat sangat gelisah, impulsif, atau sulit fokus dalam waktu singkat?",
        "Apakah anak sering mengalami ledakan emosi / tantrum berlebih yang agresif (memukul, melempar)?",
        "Apakah anak tampak cemas berlebih, takut berpisah dengan orang tua, atau takut bersosialisasi?",
        "Apakah anak menunjukkan minat berulang (repetitif) yang tidak biasa atau menolak perubahan rutinitas?",
        "Apakah anak tampak malas belajar atau mengalami kesulitan besar dalam merespons instruksi sederhana?",
      ],
    },
    {
      title: "Tes Gaya Belajar Buah Hati (V-A-K)",
      description: "Temukan metode belajar dan stimulasi bermain yang paling pas: Visual, Auditori, atau Kinestetik.",
      duration: "8 menit",
      category: "Analisis Sidik Jari Bakat",
      questions: [
        "Anak lebih mudah memahami instruksi lewat gambar/buku bergambar daripada dijelaskan secara verbal.",
        "Anak senang bersenandung, berbicara sendiri saat bermain, dan sangat peka terhadap intonasi suara.",
        "Anak tidak bisa diam lama, menyukai permainan fisik, dan senang menyentuh/membongkar mainannya.",
        "Anak cepat menirukan ucapan orang lain atau mudah menghafal lagu yang baru didengarnya.",
        "Anak lebih menyukai kegiatan menggambar/mewarnai daripada mendengarkan dongeng panjang.",
      ],
    },
  ];

  const handleStartQuiz = (index: number) => {
    setActiveQuiz(index);
    setQuizAnswers({});
    setQuizStep(0);
    setShowResult(false);
    setQuizStarted(false);
  };

  const handleAnswer = (score: number) => {
    if (activeQuiz === null) return;
    const currentAnswers = { ...quizAnswers, [quizStep]: score };
    setQuizAnswers(currentAnswers);
    
    if (quizStep < tests[activeQuiz].questions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const resultObj = calculateResult(indexToRatio(Object.values(currentAnswers)));
      // Add to history
      const newHistory = [
        {
          testTitle: tests[activeQuiz].title,
          date: new Date().toLocaleDateString("id-ID"),
          result: resultObj.label,
        },
        ...testHistory,
      ];
      setTestHistory(newHistory);
      if (typeof window !== "undefined") {
        localStorage.setItem("testHistory", JSON.stringify(newHistory));
      }
      setShowResult(true);
    }
  };

  const indexToRatio = (answers: number[]) => {
    const total = answers.reduce((a, b) => a + b, 0);
    const maxPossible = (activeQuiz !== null ? tests[activeQuiz].questions.length : 1) * 3;
    return total / maxPossible;
  };

  const calculateResult = (ratio: number) => {
    if (ratio < 0.35) return { label: "Sesuai / Bagus", desc: "Tahapan tumbuh kembang dan emosi anak berada dalam rentang normal yang sesuai usianya. Tetap berikan stimulasi positif di rumah!", color: "text-green-primary bg-green-light" };
    if (ratio < 0.7) return { label: "Meragukan / Perlu Stimulasi", desc: "Ada beberapa indikasi perkembangan anak yang memerlukan stimulasi tambahan atau latihan rutin bersama orang tua.", color: "text-yellow-primary bg-yellow-light" };
    return { label: "Perlu Perhatian Lebih", desc: "Ditemukan beberapa indikasi hambatan perkembangan atau perilaku. Silakan konsultasikan lebih lanjut bersama terapis Allia Kids untuk deteksi dini.", color: "text-red-primary bg-red-light" };
  };

  const activeResult = () => {
    return calculateResult(indexToRatio(Object.values(quizAnswers)));
  };

  // Determine which tests are unlocked based on active bookings
  const getUnlockedTests = () => {
    const unlocked: { test: typeof tests[0]; originalIndex: number }[] = [];
    
    tests.forEach((t, idx) => {
      if (idx === 0 && (
        activeBookings.includes("Terapi Wicara") || 
        activeBookings.includes("Layanan Terapi Wicara") || 
        activeBookings.includes("Skrining Tumbuh Kembang") || 
        activeBookings.includes("Skrining Tumbuh Kembang Anak")
      )) {
        unlocked.push({ test: t, originalIndex: idx });
      }
      if (idx === 1 && (
        activeBookings.includes("Hipnoterapi Anak") || 
        activeBookings.includes("Hipnoterapi Anak & Dewasa") || 
        activeBookings.includes("Terapi Perilaku") || 
        activeBookings.includes("Layanan Terapi Perilaku")
      )) {
        unlocked.push({ test: t, originalIndex: idx });
      }
      if (idx === 2 && (
        activeBookings.includes("Analisis Sidik Jari Bakat") || 
        activeBookings.includes("Sidik Jari Bakat")
      )) {
        unlocked.push({ test: t, originalIndex: idx });
      }
    });

    return unlocked;
  };

  if (!isMounted) return null;

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-20 pb-20">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-wellme-primary"></div>
            <p className="text-sm text-grey-caption font-semibold">Memuat data tumbuh kembang...</p>
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
        {/* Header Section */}
        <header className="py-20 bg-wellme-100/30 border-b border-grey-150">
          <div className="container mx-auto px-4 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
              <div className="lg:col-span-7 flex flex-col gap-4 text-center lg:text-left">
                <span className="text-xs text-wellme-primary font-bold bg-[#EBF3FC] py-1.5 px-3.5 rounded-full w-fit mx-auto lg:mx-0 border border-grey-100 uppercase tracking-wider">
                  Cek Perkembangan Anak
                </span>
                <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary leading-tight">
                  Pantau Milestone & <br />Tumbuh Kembang Si Kecil
                </h1>
                <p className="text-grey-400 text-sm lg:text-base font-semibold max-w-xl leading-relaxed mx-auto lg:mx-0">
                  Layanan skrining psikologis dan tumbuh kembang eksklusif untuk mendeteksi dini pencapaian emosi, bicara, motorik, serta gaya belajar bawaan anak.
                </p>
                {userState !== "unauthenticated" && (
                  <button
                    onClick={handleLogout}
                    className="w-fit mx-auto lg:mx-0 rounded-full border border-red-primary text-red-primary hover:bg-red-light font-bold px-5 py-2 text-xs transition-all mt-4"
                  >
                    Keluar Akun
                  </button>
                )}
              </div>
              <div className="lg:col-span-5 flex justify-center">
                <div className="max-w-[420px] rounded-3xl overflow-hidden shadow-lg border border-white">
                  <img
                    src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=600"
                    alt="Cek Perkembangan Allia Kids"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic State views */}
        <section className="container mx-auto px-4 lg:px-10 py-16">
          {/* STEP 1: UNAUTHENTICATED VIEW */}
          {userState === "unauthenticated" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
              {/* Features List */}
              <div className="lg:col-span-7 bg-wellme-100/30 border border-grey-150 rounded-3xl p-8 flex flex-col justify-between">
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl lg:text-2xl font-extrabold text-wellme-primary">
                    Manfaat Portal Cek Perkembangan
                  </h3>
                  <div className="flex flex-col gap-5">
                    {[
                      {
                        title: "Skrining Deteksi Dini",
                        desc: "Akses kuesioner SDIDTK, kuesioner masalah perilaku emosi, dan tes gaya belajar bawaan anak secara digital.",
                      },
                      {
                        title: "Rekomendasi Stimulasi Harian",
                        desc: "Dapatkan tips bimbingan parenting harian berdasarkan tingkat milestones tumbuh kembang anak Anda.",
                      },
                      {
                        title: "Riwayat & Progress Grafik",
                        desc: "Pantau perkembangan emosional dan verbal si kecil dari waktu ke waktu secara historis dan teratur.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <span className="w-6 h-6 rounded-full bg-wellme-primary text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                        <div className="flex flex-col gap-0.5">
                          <h4 className="font-bold text-sm text-wellme-primary">{item.title}</h4>
                          <p className="text-xs text-grey-caption font-semibold leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 text-[11px] text-grey-caption font-semibold">
                  *Akses instrumen skrining terbuka otomatis setelah Anda mem-booking sesi layanan Allia Kids.
                </div>
              </div>

              {/* Login / Lock Card */}
              <div className="lg:col-span-5 bg-white rounded-3xl border border-grey-200 p-8 shadow-md flex flex-col justify-center items-center text-center gap-6">
                <div className="w-16 h-16 rounded-full bg-wellme-100 flex items-center justify-center text-wellme-primary">
                  <ClipboardIcon size={32} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-extrabold text-wellme-primary">Akses Dibatasi</h3>
                  <p className="text-xs text-grey-400 font-semibold leading-relaxed px-2">
                    Silakan masuk atau daftarkan akun orang tua terlebih dahulu untuk mengakses menu Cek Perkembangan ini.
                  </p>
                </div>
                <button
                  onClick={() => router.push("/register")}
                  className="w-full rounded-xl bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-white font-bold py-3.5 shadow transition-all cursor-pointer text-center text-sm"
                >
                  Daftar Akun Sekarang &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: AUTHENTICATED BUT NO ACTIVE BOOKINGS */}
          {userState === "authenticated_no_bookings" && (
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
              {/* Profile Bar */}
              <div className="bg-[#EBF3FC]/50 border border-grey-100 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-extrabold text-wellme-primary">Selamat Datang, {parentName}!</h3>
                  <p className="text-xs text-grey-caption font-semibold mt-0.5">Pantau tumbuh kembang dan aktivitas terapi buah hati Anda secara realtime.</p>
                </div>
                <span className="text-xs font-extrabold bg-[#FF735C]/10 text-[#FF735C] px-3.5 py-1.5 rounded-full">
                  Status: Belum Terdaftar Terapi
                </span>
              </div>

              {/* Informative Warning */}
              <div className="bg-yellow-light border border-yellow-primary/30 p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-center md:items-start">
                <span className="w-10 h-10 rounded-full bg-yellow-primary/10 text-yellow-primary flex items-center justify-center font-bold text-xl shrink-0 mt-0.5">!</span>
                <div className="flex flex-col gap-1 text-center md:text-left">
                  <h4 className="font-bold text-wellme-primary">Instrumen Skrining Belum Terbuka</h4>
                  <p className="text-sm text-grey-400 font-semibold leading-relaxed">
                    Kuesioner Cek Perkembangan (SDIDTK, perilaku emosional, dan gaya belajar) hanya dapat diisi secara berkala apabila anak Anda terdaftar aktif dalam program terapi Allia Kids.
                  </p>
                </div>
              </div>

              {/* Premium Call to Action Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-white border border-grey-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col gap-3 mb-6">
                    <span className="text-xs font-bold text-wellme-secondary uppercase tracking-wider">Formulir Digital</span>
                    <h4 className="font-extrabold text-xl text-wellme-primary">Daftarkan Sesi Asesmen / Terapi</h4>
                    <p className="text-xs text-grey-caption font-semibold leading-relaxed">
                      Lengkapi data tumbuh kembang anak Anda melalui formulir pendaftaran terpadu untuk menjadwalkan sesi konsultasi pertama bersama psikolog & terapis kami.
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/apply")}
                    className="w-full text-center text-sm font-bold py-3.5 rounded-xl bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-white transition-all cursor-pointer shadow-sm"
                  >
                    Mulai Pendaftaran Terapi &rarr;
                  </button>
                </div>

                <div className="bg-white border border-grey-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col gap-3 mb-6">
                    <span className="text-xs font-bold text-green-primary uppercase tracking-wider">Layanan Cepat</span>
                    <h4 className="font-extrabold text-xl text-wellme-primary">Konsultasi WhatsApp</h4>
                    <p className="text-xs text-grey-caption font-semibold leading-relaxed">
                      Hubungi Customer Service kami secara instan untuk menanyakan info program belajar, ketersediaan jadwal terapis, biaya sesi, atau keluhan seputar tumbuh kembang anak.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Admin%20Allia%20Kids,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20terapi%20anak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center text-sm font-bold py-3.5 rounded-xl border border-green-primary text-green-primary hover:bg-green-light transition-all block"
                  >
                    Hubungi Admin (WhatsApp)
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: AUTHENTICATED AND HAS ACTIVE BOOKINGS */}
          {userState === "authenticated_has_bookings" && (
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Diagnostics Panel */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                {/* Profile Bar */}
                <div className="bg-[#EBF3FC]/50 border border-grey-100 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-extrabold text-wellme-primary">Selamat Datang, {parentName}!</h3>
                    <p className="text-xs text-grey-caption font-semibold mt-0.5">Profil Anak: <span className="text-wellme-secondary font-bold">{childName}</span> ({childAge} Tahun)</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-extrabold bg-green-light text-green-primary px-3.5 py-1 rounded-full">
                      Status: Terapi Aktif
                    </span>
                  </div>
                </div>

                {/* Active Services List */}
                <div className="bg-white border border-grey-200 rounded-3xl p-6 shadow-sm">
                  <h4 className="font-extrabold text-wellme-primary mb-3 text-sm uppercase tracking-wider">Program Terapi Terdaftar</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeBookings.map((b, idx) => (
                      <span key={idx} className="bg-wellme-100 text-wellme-primary text-xs font-bold px-3 py-1.5 rounded-full border border-grey-150">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Unlocked Screening Instruments */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-extrabold text-wellme-primary">Instrumen Skrining Terbuka</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {getUnlockedTests().map(({ test, originalIndex }) => (
                      <div
                        key={originalIndex}
                        className="rounded-2xl border border-grey-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                      >
                        <div className="flex flex-col gap-2 max-w-xl">
                          <span className="text-[10px] font-bold text-wellme-secondary uppercase tracking-wider">{test.category}</span>
                          <h4 className="font-extrabold text-lg text-wellme-primary">{test.title}</h4>
                          <p className="text-sm text-grey-400 font-semibold leading-relaxed">{test.description}</p>
                          <div className="text-xs text-grey-400 font-bold bg-white-wellme py-1 px-3 rounded-full w-fit">
                            Estimasi: {test.duration}
                          </div>
                        </div>

                        <button
                          onClick={() => handleStartQuiz(originalIndex)}
                          className="rounded-xl bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-white font-bold px-6 py-3 text-sm shrink-0 shadow-sm cursor-pointer"
                        >
                          Mulai Skrining
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: History panel */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="bg-white border border-grey-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-lg text-wellme-primary mb-4">Riwayat Cek Perkembangan</h3>
                    
                    {testHistory.length === 0 ? (
                      <div className="text-center py-10 flex flex-col items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-grey-100 flex items-center justify-center text-grey-400">
                          <ClipboardIcon size={20} />
                        </div>
                        <p className="text-xs text-grey-400 font-semibold leading-relaxed">Belum ada riwayat pengerjaan tes.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {testHistory.map((h, idx) => (
                          <div key={idx} className="border-b border-grey-100 pb-3 last:border-0 last:pb-0">
                            <h4 className="font-bold text-sm text-wellme-primary leading-tight">{h.testTitle}</h4>
                            <div className="flex justify-between items-center mt-2 text-xs font-semibold text-grey-400">
                              <span>{h.date}</span>
                              <span className="text-wellme-secondary font-bold">{h.result}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Direct Link to Full Portal Progress */}
                  <div className="border-t border-grey-100 pt-4 mt-6 flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-grey-caption">Ingin melihat rekam medis & evaluasi terapis?</span>
                    <button
                      onClick={() => router.push("/portal?tab=perkembangan")}
                      className="w-full text-center text-xs font-bold py-2.5 rounded-xl border border-wellme-primary text-wellme-primary hover:bg-[#EBF3FC] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Lihat Progress Sesi di Portal &rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Interactive Quiz Modal */}
        {activeQuiz !== null && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 lg:p-8 shadow-2xl relative border border-grey-200 animate-zoom-in max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setActiveQuiz(null)}
                className="absolute top-5 right-5 p-1 rounded-full text-grey-400 hover:bg-grey-100 transition-colors z-10"
              >
                <CloseIcon size={24} />
              </button>

              {!quizStarted ? (
                /* Pre-start clarification screen */
                <div className="text-center flex flex-col items-center gap-5 pt-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow border border-grey-100 mb-2">
                    <img
                      src={activeQuiz === 0 ? "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=200" : activeQuiz === 1 ? "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=200" : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"}
                      alt={tests[activeQuiz].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h2 className="text-2xl font-extrabold text-wellme-primary">
                    {tests[activeQuiz].title}
                  </h2>
                  
                  <p className="text-sm text-grey-400 font-semibold leading-relaxed px-2 text-justify">
                    {tests[activeQuiz].title} ini <strong>TIDAK ditujukan untuk mendiagnosis gangguan psikologis</strong>, namun untuk membantu mengenali kondisimu. Mendiagnosis diri sendiri sebelum ke profesional bukanlah tindakan yang bijak. Apabila ada gejala yang mengganggumu, segera konsultasikan hal ini dengan psikolog/psikiater untuk mendapatkan diagnosis yang sesuai dan dapat dipertanggungjawabkan ya. Mengetahui kondisi diri serta mendapatkan bantuan dari profesional yang tepat adalah langkah awal menuju mental yang sehat! :)
                  </p>

                  <button
                    type="button"
                    onClick={() => setQuizStarted(true)}
                    className="rounded-full bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-white font-bold px-10 py-3.5 shadow-md hover:scale-105 transition-transform duration-200"
                  >
                    Mulai Tes
                  </button>

                  <div className="mt-4 border border-wellme-secondary/30 bg-wellme-secondary/5 p-5 rounded-2xl text-left w-full flex flex-col gap-3">
                    <div className="flex gap-3 items-start text-xs font-semibold text-grey-500 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-wellme-primary text-white flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                      <span>Tes ini BUKAN untuk mendiagnosis gangguan psikologis, melainkan hanya untuk memberi gambaran kondisi dirimu saat ini.</span>
                    </div>
                    <div className="flex gap-3 items-start text-xs font-semibold text-grey-500 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-wellme-primary text-white flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                      <span>Tidak ada jawaban benar dan salah. Pilih saja satu yang paling menggambarkan kamu!</span>
                    </div>
                    <div className="flex gap-3 items-start text-xs font-semibold text-grey-500 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-wellme-primary text-white flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                      <span>Hindari memilih jawaban netral untuk hasil yang lebih maksimal.</span>
                    </div>
                  </div>
                </div>
              ) : !showResult ? (
                <div>
                  {/* Step Indicators */}
                  <div className="flex items-center justify-between text-xs font-bold text-grey-400 mb-6">
                    <span className="uppercase text-wellme-primary">
                      {tests[activeQuiz].title}
                    </span>
                    <span>
                      Pertanyaan {quizStep + 1} dari {tests[activeQuiz].questions.length}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-grey-150 h-2 rounded-full mb-8 overflow-hidden">
                    <div
                      className="bg-wellme-secondary h-full transition-all duration-300"
                      style={{
                        width: `${((quizStep + 1) / tests[activeQuiz].questions.length) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Question Text */}
                  <h3 className="text-xl lg:text-2xl font-extrabold text-wellme-primary leading-snug mb-8">
                    {tests[activeQuiz].questions[quizStep]}
                  </h3>

                  {/* Choice Buttons */}
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "Sama sekali tidak / Tidak pernah", score: 0 },
                      { label: "Kadang-kadang / Jarang", score: 1 },
                      { label: "Sering / Cukup mengganggu", score: 2 },
                      { label: "Sangat sering / Sangat mengganggu", score: 3 },
                    ].map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAnswer(opt.score)}
                        className="w-full text-left p-4 rounded-xl border border-grey-200 hover:border-wellme-primary hover:bg-wellme-100/20 text-sm font-semibold text-grey-500 hover:text-wellme-primary transition-all duration-200 cursor-pointer"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center pt-4">
                  <div className="w-16 h-16 rounded-full bg-wellme-100 flex items-center justify-center text-wellme-primary mx-auto mb-6">
                    <ClipboardIcon size={32} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-wellme-primary mb-2">
                    Hasil Analisis Awal
                  </h3>
                  <p className="text-sm text-grey-400 font-semibold mb-6">
                    Berdasarkan respon yang Anda berikan, berikut adalah gambaran indikator si kecil:
                  </p>

                  <div className={`text-lg font-bold py-3 px-6 rounded-full w-fit mx-auto mb-6 ${activeResult().color}`}>
                    Indikasi: {activeResult().label}
                  </div>

                  <p className="text-sm text-grey-500 font-medium leading-relaxed max-w-md mx-auto mb-8">
                    {activeResult().desc}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/apply"
                      onClick={() => setActiveQuiz(null)}
                      className="rounded-xl bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-white font-bold px-6 py-3 transition-all duration-300 shadow-sm text-center"
                    >
                      Konsultasi dengan Terapis
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleStartQuiz(activeQuiz)}
                      className="rounded-xl border border-grey-300 hover:bg-grey-100 text-grey-500 font-bold px-6 py-3 transition-all"
                    >
                      Ulangi Tes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
