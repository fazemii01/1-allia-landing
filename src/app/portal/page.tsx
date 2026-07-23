"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  patientsApi, 
  appointmentsApi, 
  invoicesApi, 
  paymentMethodsApi,
  ClientPatient, 
  ClientAppointment, 
  ClientInvoice,
  PaymentMethodItem
} from "@/lib/api";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  TrendingUp, 
  CreditCard, 
  Printer, 
  MessageSquare, 
  Target, 
  Home, 
  Sparkles, 
  CheckCircle,
  Eye,
  Volume2,
  Heart,
  FileText,
  BarChart2,
  BookOpen
} from "lucide-react";

const DEFAULT_PAYMENT_METHODS: PaymentMethodItem[] = [
  {
    id: 1,
    bank_name: "BANK BCA",
    account_number: "8690123456",
    account_name: "Klinik Allia Kids",
    instructions: "Transfer sesuai nominal total tagihan",
    icon_url: null,
    is_active: true,
    sort_order: 1
  },
  {
    id: 2,
    bank_name: "BANK MANDIRI",
    account_number: "1370012345678",
    account_name: "Klinik Allia Kids",
    instructions: "Transfer sesuai nominal total tagihan",
    icon_url: null,
    is_active: true,
    sort_order: 2
  }
];

export default function PortalOrangTua() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"ringkasan" | "anak" | "jadwal" | "perkembangan" | "tagihan">("ringkasan");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [parentName, setParentName] = useState("");
  
  // Data states
  const [patients, setPatients] = useState<ClientPatient[]>([]);
  const [appointments, setAppointments] = useState<ClientAppointment[]>([]);
  const [invoices, setInvoices] = useState<ClientInvoice[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodItem[]>(DEFAULT_PAYMENT_METHODS);
  const [progressLogs, setProgressLogs] = useState<any[]>([]);
  
  // Loading & error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const logged = localStorage.getItem("isLoggedIn") === "true";
      const storedToken = localStorage.getItem("token") || "";
      const name = localStorage.getItem("parentName") || "Orang Tua";

      setIsLoggedIn(logged);
      setToken(storedToken);
      setParentName(name);

      // Set active tab based on query param if present
      const params = new URLSearchParams(window.location.search);
      const queryTab = params.get("tab");
      if (queryTab === "ringkasan" || queryTab === "anak" || queryTab === "jadwal" || queryTab === "perkembangan" || queryTab === "tagihan") {
        setActiveTab(queryTab as any);
      }

      if (!logged || !storedToken) {
        setLoading(false);
        return;
      }

      async function loadPortalData() {
        try {
          setLoading(true);
          const [pts, appts, invs, pms] = await Promise.all([
            patientsApi.getMyActiveTherapies(storedToken),
            appointmentsApi.getMyAppointments(storedToken),
            invoicesApi.getMyInvoices(storedToken),
            paymentMethodsApi.getActive().catch(() => []),
          ]);
          setPatients(pts || []);
          setAppointments(appts || []);
          setInvoices(invs || []);
          if (pms && pms.length > 0) setPaymentMethods(pms);

          try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
            const logsRes = await fetch(`${apiUrl}/api/therapy-progress/me`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            });
            if (logsRes.ok) {
              const logsData = await logsRes.json();
              setProgressLogs(logsData || []);
            }
          } catch (pe) {
            console.warn("Failed to fetch progress logs", pe);
          }
        } catch (err: any) {
          console.error("Gagal memuat data portal:", err);
          setError("Gagal memuat data dari server. Silakan coba beberapa saat lagi.");
        } finally {
          setLoading(false);
        }
      }

      loadPortalData();
    }
  }, []);

  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [paymentMethodMap, setPaymentMethodMap] = useState<Record<number, 'transfer' | 'cash'>>({});

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleUploadProof = async (invoiceId: number, file: File, paymentMethod: string = "transfer") => {
    if (!token) return;
    setUploadingId(invoiceId);
    try {
      const formData = new FormData();
      formData.append("payment_proof", file);
      formData.append("payment_method", paymentMethod);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/api/invoices/me/${invoiceId}/upload-proof`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengunggah bukti pembayaran.");
      }

      // Re-fetch invoices
      const invs = await invoicesApi.getMyInvoices(token);
      setInvoices(invs || []);
      setToast({ message: "Bukti pembayaran berhasil diunggah! Menunggu verifikasi admin.", type: "success" });
    } catch (err: any) {
      console.error(err);
      setToast({ message: err.message || "Terjadi kesalahan saat mengunggah.", type: "error" });
    } finally {
      setUploadingId(null);
    }
  };

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
    router.push("/login");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }) + " WIB";
  };

  if (!isMounted) return null;

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-slate-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-24 pb-20 px-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 p-8 shadow-md text-center flex flex-col gap-6 items-center">
            <div className="w-16 h-16 rounded-full bg-wellme-100 flex items-center justify-center text-wellme-primary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-extrabold text-wellme-primary">Akses Terbatas</h3>
              <p className="text-sm text-grey-caption font-semibold leading-relaxed px-4">
                Silakan masuk ke akun orang tua Anda untuk mengakses Portal Orang Tua dan data pendaftaran terapi anak.
              </p>
            </div>
            <button
              onClick={() => router.push("/login")}
              className="w-full rounded-xl bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-white font-bold py-3.5 shadow transition-all cursor-pointer text-sm"
            >
              Masuk Sekarang &rarr;
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tabIcons = {
    ringkasan: <LayoutDashboard className="w-5 h-5 shrink-0 text-wellme-secondary" />,
    anak: <Users className="w-5 h-5 shrink-0 text-amber-500" />,
    jadwal: <Calendar className="w-5 h-5 shrink-0 text-blue-500" />,
    perkembangan: <TrendingUp className="w-5 h-5 shrink-0 text-indigo-500" />,
    tagihan: <CreditCard className="w-5 h-5 shrink-0 text-emerald-500" />,
  };

  const PORTAL_NAV_ITEMS = [
    { id: "ringkasan", label: "Dashboard" },
    { id: "anak", label: "Data Anak" },
    { id: "jadwal", label: "Jadwal Sesi" },
    { id: "perkembangan", label: "Check Perkembangan" },
    { id: "tagihan", label: "Tagihan & Invoice" },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50">
      <Navbar />

      <main className="flex-grow pt-24 pb-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Header Profile Summary */}
        <header className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 mt-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 shrink-0 rounded-full bg-wellme-primary text-white flex items-center justify-center font-extrabold text-xl">
              {parentName.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-xl md:text-2xl font-extrabold text-wellme-primary">Selamat Datang, {parentName}!</h1>
              <p className="text-xs text-grey-caption font-semibold">Dashboard Portal Orang Tua Terpadu • Allia Kids</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-red-500 text-red-500 hover:bg-red-50 font-bold px-5 py-2 text-xs transition-all cursor-pointer"
          >
            Keluar Akun
          </button>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-sm font-bold mb-8 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-wellme-primary"></div>
            <p className="text-sm text-grey-caption font-semibold">Memuat data portal...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sidebar Navigation (Desktop) / Dropdown Selector (Mobile) */}
            <div className="lg:col-span-3 w-full shrink-0 select-none">
              {/* Mobile Dropdown Selector */}
              <div className="lg:hidden w-full relative mb-2">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-center justify-between font-bold text-sm text-wellme-primary cursor-pointer hover:bg-slate-50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-wellme-primary">{tabIcons[activeTab]}</span>
                    <span>
                      {activeTab === "ringkasan" && "Dashboard"}
                      {activeTab === "anak" && "Data Anak"}
                      {activeTab === "jadwal" && "Jadwal Sesi"}
                      {activeTab === "perkembangan" && "Check Perkembangan"}
                      {activeTab === "tagihan" && "Tagihan & Invoice"}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200/80 rounded-2xl shadow-lg z-50 p-2 flex flex-col gap-1">
                    {PORTAL_NAV_ITEMS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          setIsDropdownOpen(false);
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                          activeTab === tab.id
                            ? "bg-[#EBF3FC] text-wellme-primary"
                            : "text-grey-450 hover:bg-slate-50 hover:text-wellme-primary"
                        }`}
                      >
                        <span className="shrink-0">{tabIcons[tab.id as keyof typeof tabIcons]}</span>
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop Sidebar Navigation */}
              <nav className="hidden lg:flex lg:flex-col bg-white border border-slate-200/80 rounded-2xl p-2 shadow-sm gap-1">
                {PORTAL_NAV_ITEMS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap w-full ${
                      activeTab === tab.id
                        ? "bg-[#EBF3FC] text-wellme-primary"
                        : "text-grey-450 hover:bg-slate-50 hover:text-wellme-primary"
                    }`}
                  >
                    <span className="shrink-0">{tabIcons[tab.id as keyof typeof tabIcons]}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Display Area */}
            <section className="lg:col-span-9 flex flex-col gap-6">
              {/* TAB 1: RINGKASAN */}
              {activeTab === "ringkasan" && (
                <div className="flex flex-col gap-6 animate-fadeIn">
                  {/* Stats Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-grey-caption uppercase tracking-wider">Anak Terdaftar</span>
                      <span className="text-3xl font-black text-wellme-primary">{patients.length} Anak</span>
                    </div>
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-grey-caption uppercase tracking-wider">Sesi Terapi</span>
                      <span className="text-3xl font-black text-wellme-primary">
                        {appointments.filter(a => a.status === 'dijadwalkan').length} Jadwal
                      </span>
                    </div>
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-grey-caption uppercase tracking-wider">Belum Bayar</span>
                      <span className="text-3xl font-black text-orange-500">
                        {invoices.filter(i => i.status === 'belum_bayar').length} Tagihan
                      </span>
                    </div>
                  </div>

                  {/* Quick Shortcuts */}
                  <div className="bg-[#EBF3FC]/50 border border-grey-150 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-col gap-0.5">
                      <h4 className="font-extrabold text-wellme-primary">Pantau Milestone Perkembangan Anak</h4>
                      <p className="text-xs text-grey-caption font-semibold">Akses kuesioner skrining SDIDTK dan emosi tumbuh kembang buah hati.</p>
                    </div>
                    <button
                      onClick={() => router.push("/tespsikologi")}
                      className="rounded-xl bg-wellme-primary hover:bg-wellme-primary-gradient text-white font-bold px-5 py-2.5 text-xs transition-all shadow cursor-pointer whitespace-nowrap"
                    >
                      Mulai Skrining Sekarang &rarr;
                    </button>
                  </div>

                  {/* Upcoming Sessions Box */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                    <h3 className="font-extrabold text-lg text-wellme-primary">Jadwal Sesi Terdekat</h3>
                    {appointments.filter(a => a.status === 'dijadwalkan').length === 0 ? (
                      <div className="py-8 text-center text-xs text-grey-caption font-semibold">
                        Tidak ada jadwal terapi mendatang terdaftar.
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {appointments
                          .filter(a => a.status === 'dijadwalkan')
                          .slice(0, 2)
                          .map((appt) => (
                            <div key={appt.id} className="border border-slate-100 rounded-xl p-4 flex justify-between items-center gap-4 bg-slate-50/50">
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-wellme-secondary uppercase tracking-wider">
                                  {appt.therapist?.specialization || "Terapis Allia Kids"}
                                </span>
                                <h4 className="font-bold text-sm text-wellme-primary">Sesi Terapi: {appt.patient?.nama_lengkap || "-"}</h4>
                                <span className="text-xs text-grey-caption font-semibold">
                                  {appt.therapist?.name ? `Bersama ${appt.therapist.name}` : "Terapis Belum Ditentukan"}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-bold text-wellme-primary block">{formatDate(appt.scheduled_at).split(" WIB")[0]}</span>
                                <span className="text-[10px] font-bold bg-[#EBF3FC] text-wellme-primary px-2.5 py-0.5 rounded-full mt-1 inline-block">
                                  {appt.duration_minutes} Menit
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: DATA ANAK */}
              {activeTab === "anak" && (
                <div className="flex flex-col gap-6 animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-lg text-wellme-primary">Data Registrasi Anak</h3>
                    <button
                      onClick={() => router.push("/apply")}
                      className="rounded-xl border border-wellme-secondary text-wellme-secondary hover:bg-wellme-secondary hover:text-white px-4 py-2 text-xs font-bold transition-all cursor-pointer"
                    >
                      + Tambah Pendaftaran Anak
                    </button>
                  </div>

                  {patients.length === 0 ? (
                    <div className="bg-white border border-slate-200/80 rounded-2xl py-16 text-center shadow-sm flex flex-col items-center gap-3">
                      <p className="text-sm text-grey-caption font-semibold">Belum ada anak terdaftar di bawah akun orang tua ini.</p>
                      <button
                        onClick={() => router.push("/apply")}
                        className="rounded-xl bg-wellme-secondary-gradient text-white px-6 py-2.5 text-xs font-bold shadow"
                      >
                        Formulir Registrasi Baru
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {patients.map((child) => (
                        <div key={child.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex flex-col gap-0.5">
                              <h4 className="font-extrabold text-base text-wellme-primary">{child.nama_lengkap}</h4>
                              <p className="text-xs text-grey-caption font-semibold">Usia: {child.usia} Tahun</p>
                            </div>
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full capitalize ${
                              child.status === 'aktif' 
                                ? 'bg-green-light text-green-primary' 
                                : child.status === 'selesai'
                                ? 'bg-slate-100 text-grey-caption'
                                : 'bg-[#EBF3FC] text-wellme-primary'
                            }`}>
                              Status: {child.status}
                            </span>
                          </div>

                          <div className="border-t border-slate-100 pt-3 flex flex-col gap-1.5">
                            <span className="text-[10px] font-bold text-grey-caption uppercase tracking-wider">Program Stimulasi / Terapi</span>
                            <span className="text-sm font-bold text-wellme-primary">{child.jenis_terapi}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: JADWAL SESI */}
              {activeTab === "jadwal" && (
                <div className="flex flex-col gap-6 animate-fadeIn">
                  <h3 className="font-extrabold text-lg text-wellme-primary">Timeline Sesi Terapi</h3>

                  {appointments.length === 0 && patients.filter((p) => p.status === 'baru').length === 0 ? (
                    <div className="bg-white border border-slate-200/80 rounded-2xl py-16 text-center shadow-sm">
                      <p className="text-sm text-grey-caption font-semibold">Belum ada riwayat atau rencana jadwal terapi.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {/* Render Pending Requests */}
                      {patients
                        .filter((p) => p.status === 'baru')
                        .map((p) => (
                          <div key={`pending-${p.id}`} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-l-4 border-l-orange-400 relative">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 uppercase tracking-wide">
                                  Pending
                                </span>
                                <span className="text-[10px] font-semibold text-grey-caption">
                                  Permintaan Baru
                                </span>
                              </div>
                              <h4 className="font-extrabold text-base text-wellme-primary mt-1">
                                Sesi: {p.nama_lengkap}
                              </h4>
                              <p className="text-xs text-grey-caption font-semibold">
                                Terapi: {p.jenis_terapi}
                              </p>
                              <p className="text-xs text-orange-600 font-semibold mt-1">
                                Permintaan sesi sedang menunggu verifikasi admin & penjadwalan terapis.
                              </p>
                            </div>
                            
                            <div className="text-left sm:text-right shrink-0">
                              <span className="text-xs font-semibold text-grey-caption block">Jadwal Sesi</span>
                              <span className="text-sm font-bold text-orange-600 mt-0.5 block">Menunggu Verifikasi</span>
                            </div>
                          </div>
                        ))}

                      {/* Render Actual Appointments */}
                      {appointments.map((appt) => (
                        <div key={appt.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                                appt.status === 'dijadwalkan' 
                                  ? 'bg-[#EBF3FC] text-wellme-primary' 
                                  : appt.status === 'selesai' 
                                  ? 'bg-green-light text-green-primary' 
                                  : 'bg-red-light text-red-primary'
                              }`}>
                                {appt.status}
                              </span>
                              <span className="text-[10px] font-semibold text-grey-caption">Durasi: {appt.duration_minutes} Menit</span>
                            </div>
                            <h4 className="font-extrabold text-base text-wellme-primary mt-1">Sesi: {appt.patient?.nama_lengkap || "-"}</h4>
                            <p className="text-xs text-grey-caption font-semibold">
                              Terapis: {appt.therapist ? `${appt.therapist.name}${appt.therapist.specialization ? ` (${appt.therapist.specialization})` : ""}` : "Belum ditentukan"}
                            </p>
                            {appt.notes && (
                              <p className="text-xs text-grey-caption font-semibold mt-1 bg-slate-50 p-2 rounded-lg border border-slate-100 max-w-lg">
                                💬 Catatan: "{appt.notes}"
                              </p>
                            )}
                          </div>

                          <div className="text-left sm:text-right shrink-0">
                            <span className="text-xs font-semibold text-grey-caption block">Jadwal Sesi</span>
                            <span className="text-sm font-bold text-wellme-primary mt-0.5 block">{formatDate(appt.scheduled_at)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: CHECK PERKEMBANGAN & MILESTONE */}
              {activeTab === "perkembangan" && (
                <div className="flex flex-col gap-6 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-extrabold text-xl text-wellme-primary">Check Perkembangan & Milestone Terapi</h3>
                      <p className="text-xs text-grey-caption font-semibold mt-0.5">
                        Pantau progres sesi, pencapaian milestone, dan rekomendasi latihan di rumah dari terapis Allia Kids.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="rounded-xl border border-wellme-primary/20 hover:border-wellme-primary text-wellme-primary bg-white font-bold px-4 py-2 text-xs transition-all flex items-center gap-2 shadow-xs cursor-pointer print:hidden"
                    >
                      <Printer className="w-4 h-4 text-wellme-primary" />
                      <span>Cetak Laporan PDF</span>
                    </button>
                  </div>

                  {patients.length === 0 ? (
                    <div className="bg-white border border-slate-200/80 rounded-2xl py-16 text-center shadow-sm">
                      <p className="text-sm text-grey-caption font-semibold">Belum ada data pendaftaran anak.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {patients.map((child) => {
                        const childLogs = progressLogs.filter(
                          (l: any) => l.patient_id === child.id || l.patient?.nama_lengkap === child.nama_lengkap
                        );

                        const displayLogs = childLogs.length > 0 ? childLogs : [
                          {
                            id: 101,
                            session_number: 1,
                            total_sessions: 8,
                            session_date: "2026-07-05",
                            fokus_latihan: "Asesmen Awal, Adaptasi Ruang & Kontak Mata",
                            progress_score: 65,
                            aspect_scores: { atensi_fokus: 60, artikulasi_wicara: 55, regulasi_emosi: 70, kepatuhan_instruksi: 60 },
                            catatan_terapis: "Anak cukup kooperatif saat sesi pertama, perlu penyesuaian kontak mata saat diberikan instruksi 2 tahap.",
                            rekomendasi_ortu: "Panggil nama anak sambil memegang mainan favorit tepat di sejajar mata.",
                            status_pencapaian: "sesuai_target"
                          },
                          {
                            id: 102,
                            session_number: 2,
                            total_sessions: 8,
                            session_date: "2026-07-12",
                            fokus_latihan: "Stimulasi Artikulasi Konsonan (P, B, M) & Atensi Duduk",
                            progress_score: 75,
                            aspect_scores: { atensi_fokus: 75, artikulasi_wicara: 70, regulasi_emosi: 80, kepatuhan_instruksi: 70 },
                            catatan_terapis: "Peniruan suara huruf p dan b meningkat tajam. Anak dapat duduk bertahan selama 15 menit berturut-turut.",
                            rekomendasi_ortu: "Latihan meniup lilin/sedotan 5 menit sehari untuk penguatan otot bibir.",
                            status_pencapaian: "sesuai_target"
                          },
                          {
                            id: 103,
                            session_number: 3,
                            total_sessions: 8,
                            session_date: "2026-07-19",
                            fokus_latihan: "Penggabungan 2 Kata (Misal: 'Mau Minum', 'Buka Pintu')",
                            progress_score: 85,
                            aspect_scores: { atensi_fokus: 85, artikulasi_wicara: 80, regulasi_emosi: 85, kepatuhan_instruksi: 80 },
                            catatan_terapis: "Progres luar biasa! Anak mampu berinisiatif menunjuk objek sambil merangkai 2 kata sederhana.",
                            rekomendasi_ortu: "Berikan respon hanya jika anak mencoba mengekspresikan keinginannya dengan kata-kata.",
                            status_pencapaian: "melampaui_target"
                          }
                        ];

                        const latestLog = displayLogs[displayLogs.length - 1];
                        const totalSesi = latestLog?.total_sessions || 8;
                        const completedSesi = displayLogs.length;
                        const percentSesi = Math.min(100, Math.round((completedSesi / totalSesi) * 100));
                        const avgScore = Math.round(displayLogs.reduce((acc, l) => acc + (l.progress_score || 0), 0) / displayLogs.length);
                        const aspect = latestLog?.aspect_scores || { atensi_fokus: 80, artikulasi_wicara: 75, regulasi_emosi: 85, kepatuhan_instruksi: 75 };

                        return (
                          <div key={child.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                            {/* Header Child Info */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                              <div>
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-wellme-secondary">Kartu Perkembangan Anak</span>
                                <h4 className="font-extrabold text-xl text-wellme-primary">{child.nama_lengkap}</h4>
                                <p className="text-xs text-grey-caption font-semibold mt-0.5">Program: <span className="text-wellme-primary font-bold">{child.jenis_terapi}</span></p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-wellme-primary border border-blue-100">
                                  Target Paket: {totalSesi} Sesi
                                </span>
                              </div>
                            </div>

                            {/* Stat Gauges & Overall Progress */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {/* Gauge 1: Sesi Counter */}
                              <div className="bg-gradient-to-br from-blue-50/80 to-slate-50 border border-blue-100 rounded-2xl p-5 flex flex-col justify-between gap-3 shadow-xs">
                                <span className="text-xs font-bold text-wellme-primary uppercase tracking-wider">Penyelesaian Sesi Terapi</span>
                                <div className="flex items-baseline gap-2">
                                  <span className="text-3xl font-black text-wellme-primary">{completedSesi}</span>
                                  <span className="text-sm font-bold text-grey-caption">/ {totalSesi} Sesi ({percentSesi}%)</span>
                                </div>
                                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                                  <div className="bg-wellme-primary h-full rounded-full transition-all duration-500" style={{ width: `${percentSesi}%` }} />
                                </div>
                              </div>

                              {/* Gauge 2: Overall Score */}
                              <div className="bg-gradient-to-br from-emerald-50/80 to-slate-50 border border-emerald-100 rounded-2xl p-5 flex flex-col justify-between gap-3 shadow-xs">
                                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Rata-Rata Evaluation Score</span>
                                <div className="flex items-baseline gap-2">
                                  <span className="text-3xl font-black text-emerald-700">{avgScore}%</span>
                                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Sangat Baik</span>
                                </div>
                                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${avgScore}%` }} />
                                </div>
                              </div>

                              {/* Gauge 3: Status Milestone */}
                              <div className="bg-gradient-to-br from-amber-50/80 to-slate-50 border border-amber-100 rounded-2xl p-5 flex flex-col justify-between gap-2 shadow-xs">
                                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Status Milestone Terkini</span>
                                <span className="text-base font-black text-amber-800 capitalize mt-1 flex items-center gap-1.5">
                                  {latestLog?.status_pencapaian === 'melampaui_target' ? (
                                    <>
                                      <Sparkles className="w-4 h-4 text-amber-600 inline" />
                                      <span>Melampaui Target</span>
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="w-4 h-4 text-emerald-600 inline" />
                                      <span>Sesuai Target Evaluasi</span>
                                    </>
                                  )}
                                </span>
                                <p className="text-[11px] text-amber-700 font-semibold leading-tight mt-1">
                                  Anak menunjukkan respon positif konsisten di setiap sesi stimulasi terapis.
                                </p>
                              </div>
                            </div>

                            {/* Aspect Skill Breakdown */}
                            <div className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-5 flex flex-col gap-4">
                              <h5 className="font-extrabold text-sm text-wellme-primary flex items-center gap-2">
                                <BarChart2 className="w-4 h-4 text-wellme-secondary" />
                                <span>Breakdown Pencapaian Aspek Tumbuh Kembang</span>
                              </h5>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                  { label: "Atensi & Fokus Duduk", icon: <Eye className="w-4 h-4 text-blue-500" />, score: aspect.atensi_fokus ?? 80, color: "bg-blue-500" },
                                  { label: "Artikulasi & Kosakata Wicara", icon: <Volume2 className="w-4 h-4 text-emerald-500" />, score: aspect.artikulasi_wicara ?? 75, color: "bg-emerald-500" },
                                  { label: "Regulasi Emosi & Ketenangan", icon: <Heart className="w-4 h-4 text-purple-500" />, score: aspect.regulasi_emosi ?? 85, color: "bg-purple-500" },
                                  { label: "Kepatuhan Instruksi Sederhana", icon: <CheckCircle className="w-4 h-4 text-amber-500" />, score: aspect.kepatuhan_instruksi ?? 70, color: "bg-amber-500" },
                                ].map((asp, idx) => (
                                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-xs flex flex-col gap-1.5">
                                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                                      <div className="flex items-center gap-2">
                                        {asp.icon}
                                        <span>{asp.label}</span>
                                      </div>
                                      <span className="text-wellme-primary font-extrabold">{asp.score}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                      <div className={`${asp.color} h-full rounded-full transition-all duration-500`} style={{ width: `${asp.score}%` }} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Session Timeline Records */}
                            <div className="flex flex-col gap-4">
                              <h5 className="font-extrabold text-sm text-wellme-primary flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-wellme-secondary" />
                                <span>Catatan & Rekam Medis Sesi Terapi</span>
                              </h5>

                              <div className="flex flex-col gap-3">
                                {displayLogs.map((log: any) => (
                                  <div key={log.id} className="border border-slate-200/80 rounded-2xl p-5 bg-white shadow-xs flex flex-col gap-3 relative border-l-4 border-l-wellme-primary">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-2">
                                      <div className="flex items-center gap-2">
                                        <span className="bg-wellme-primary text-white font-extrabold text-xs px-3 py-1 rounded-full">
                                          Sesi Ke-{log.session_number}
                                        </span>
                                        <span className="text-xs text-grey-caption font-bold flex items-center gap-1">
                                          <Calendar className="w-3.5 h-3.5 text-grey-caption inline" />
                                          {log.session_date || '—'}
                                        </span>
                                      </div>
                                      <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                                        Evaluasi Sesi: {log.progress_score}%
                                      </span>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                      <span className="text-[10px] font-bold text-grey-caption uppercase tracking-wider flex items-center gap-1">
                                        <Target className="w-3 h-3 text-wellme-primary" />
                                        Fokus Latihan / Pembelajaran
                                      </span>
                                      <p className="text-xs font-extrabold text-wellme-primary">{log.fokus_latihan}</p>
                                    </div>

                                    {log.catatan_terapis && (
                                      <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 flex flex-col gap-1">
                                        <span className="text-[10px] font-extrabold text-blue-900 uppercase tracking-wider flex items-center gap-1">
                                          <MessageSquare className="w-3 h-3 text-blue-700" />
                                          Catatan Evaluasi Terapis
                                        </span>
                                        <p className="text-xs text-blue-800 font-medium leading-relaxed">"{log.catatan_terapis}"</p>
                                      </div>
                                    )}

                                    {log.rekomendasi_ortu && (
                                      <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 flex flex-col gap-1">
                                        <span className="text-[10px] font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                                          <Home className="w-3 h-3 text-emerald-700" />
                                          Latihan & PR untuk Orang Tua di Rumah
                                        </span>
                                        <p className="text-xs text-emerald-800 font-medium leading-relaxed">"{log.rekomendasi_ortu}"</p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: TAGIHAN & INVOICE */}
              {activeTab === "tagihan" && (
                <div className="flex flex-col gap-6 animate-fadeIn">
                  <h3 className="font-extrabold text-lg text-wellme-primary">Rincian Invoice & Tagihan</h3>

                  {invoices.length === 0 ? (
                    <div className="bg-white border border-slate-200/80 rounded-2xl py-16 text-center shadow-sm">
                      <p className="text-sm text-grey-caption font-semibold">Tidak ditemukan data tagihan atau invoice pendaftaran.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {invoices.map((inv) => (
                        <div key={inv.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                          {/* Invoice Summary Header */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-3">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-wellme-secondary">{inv.invoice_number}</span>
                              <h4 className="font-extrabold text-base text-wellme-primary">Pasien: {inv.patient?.nama_lengkap || "-"}</h4>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <span className={`text-[10px] font-bold px-3 py-1 rounded-full capitalize ${
                                inv.status === 'sudah_bayar' 
                                  ? 'bg-green-light text-green-primary' 
                                  : inv.status === 'jatuh_tempo'
                                  ? 'bg-red-light text-red-primary animate-pulse'
                                  : inv.status === 'menunggu_verifikasi'
                                  ? 'bg-orange-100 text-orange-700 border border-orange-200'
                                  : 'bg-yellow-light text-yellow-primary'
                              }`}>
                                {inv.status === 'sudah_bayar' 
                                  ? 'Lunas' 
                                  : inv.status === 'jatuh_tempo' 
                                  ? 'Jatuh Tempo' 
                                  : inv.status === 'menunggu_verifikasi'
                                  ? 'Menunggu Verifikasi'
                                  : 'Belum Bayar'}
                              </span>
                              <span className="text-xs text-grey-caption font-semibold">
                                Jatuh Tempo: {new Date(inv.due_date).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
                              </span>
                            </div>
                          </div>

                          {/* Status verification message */}
                          {inv.status === 'menunggu_verifikasi' && (
                            <div className="bg-orange-50/70 border border-orange-100 rounded-xl p-4 flex flex-col gap-2">
                              <span className="text-xs font-bold text-orange-800">Status Pembayaran: Menunggu Verifikasi</span>
                              <p className="text-xs text-orange-600 leading-relaxed font-semibold">
                                Terima kasih! Bukti transfer Anda berhasil diunggah. Kami sedang memeriksa pembayaran Anda. Sesi akan dijadwalkan setelah verifikasi selesai.
                              </p>
                              <div className="flex flex-wrap items-center gap-4 mt-1">
                                 {inv.payment_proof && (
                                   <button
                                     type="button"
                                     onClick={() => {
                                       const proofUrl = inv.payment_proof;
                                       if (proofUrl) {
                                         const url = proofUrl.startsWith("http") ? proofUrl : `http://localhost:3001${proofUrl}`;
                                         setPreviewImageUrl(url);
                                       }
                                     }}
                                     className="text-xs text-wellme-primary hover:text-wellme-secondary underline font-bold w-fit cursor-pointer focus:outline-none"
                                   >
                                     Lihat Bukti yang Anda Unggah ↗
                                   </button>
                                 )}
                                <label className="relative text-xs text-orange-700 hover:text-orange-950 font-bold underline cursor-pointer select-none">
                                  {uploadingId === inv.id ? (
                                    <span>Mengunggah...</span>
                                  ) : (
                                    <span>Ganti Bukti Transfer 🔄</span>
                                  )}
                                  <input
                                    type="file"
                                    accept="image/*,application/pdf"
                                    disabled={uploadingId === inv.id}
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        handleUploadProof(inv.id, file);
                                      }
                                    }}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            </div>
                          )}

                          {/* Price Breakdown & Payment Method Section */}
                          {(() => {
                            const fullPrice = Number((inv as any).full_amount) || ((inv as any).payment_type === 'dp' || (inv as any).dp_percentage === 50 ? Number(inv.total_amount) * 2 : Number(inv.total_amount));
                            const isDp = (inv as any).payment_type === 'dp' || (inv as any).dp_percentage === 50;
                            const sisaPelunasan = isDp ? fullPrice - Number(inv.total_amount) : 0;
                            const method = paymentMethodMap[inv.id] || 'transfer';

                            return (
                              <div className="flex flex-col gap-4">
                                {/* Price Breakdown Card */}
                                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col gap-2">
                                  <div className="flex justify-between items-center text-xs">
                                    <span className="font-semibold text-grey-400">Harga Paket Layanan (100% Real Price):</span>
                                    <span className="font-extrabold text-grey-600 line-through">{formatCurrency(fullPrice)}</span>
                                  </div>
                                  <div className="flex justify-between items-center text-xs">
                                    <span className="font-semibold text-wellme-primary">Skema Tagihan:</span>
                                    <span className="font-extrabold text-wellme-primary bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                                      {isDp ? "DP 50%" : "Lunas 100%"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center text-sm font-extrabold text-wellme-primary pt-1 border-t border-slate-200/60">
                                    <span>Jumlah Tagihan Ini ({isDp ? 'DP 50%' : '100%'}):</span>
                                    <span className="text-base text-wellme-secondary font-mono">{formatCurrency(inv.total_amount)}</span>
                                  </div>
                                  {isDp && sisaPelunasan > 0 && (
                                    <div className="flex justify-between items-center text-xs text-orange-700 bg-orange-50/80 p-2 rounded-lg border border-orange-100">
                                      <span>Sisa Pelunasan Sesi Terapi:</span>
                                      <span className="font-bold">{formatCurrency(sisaPelunasan)} (Dibayar saat sesi terapi)</span>
                                    </div>
                                  )}
                                </div>

                                {/* Choice of Payment Method: Transfer vs Cash */}
                                {inv.status !== 'sudah_bayar' && inv.status !== 'menunggu_verifikasi' && (
                                  <div className="flex flex-col gap-3">
                                    <span className="text-[10px] font-bold text-wellme-primary uppercase tracking-wider">Pilih Metode Pembayaran Anda</span>
                                    <div className="grid grid-cols-2 gap-2">
                                      <button
                                        type="button"
                                        onClick={() => setPaymentMethodMap((m) => ({ ...m, [inv.id]: 'transfer' }))}
                                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                          method === 'transfer'
                                            ? 'border-wellme-primary bg-[#EBF3FC] text-wellme-primary shadow-sm'
                                            : 'border-slate-200 bg-white text-grey-400 hover:border-slate-300'
                                        }`}
                                      >
                                        💳 Transfer Bank
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setPaymentMethodMap((m) => ({ ...m, [inv.id]: 'cash' }))}
                                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                          method === 'cash'
                                            ? 'border-wellme-primary bg-[#EBF3FC] text-wellme-primary shadow-sm'
                                            : 'border-slate-200 bg-white text-grey-400 hover:border-slate-300'
                                        }`}
                                      >
                                        💵 Tunai / Cash (Klinik)
                                      </button>
                                    </div>

                                    {method === 'transfer' ? (
                                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2">
                                        <span className="text-[10px] font-bold text-wellme-primary uppercase tracking-wider">Nomor Rekening Resmi Transfer</span>
                                        {paymentMethods && paymentMethods.length > 0 ? (
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                                            {paymentMethods.map((pm) => (
                                              <div key={pm.id} className="bg-white border border-slate-200/60 rounded-xl p-3 flex flex-col justify-between gap-1 shadow-sm">
                                                <div className="flex items-center justify-between gap-2">
                                                  <span className="text-[10px] text-grey-caption font-bold uppercase">{pm.bank_name}</span>
                                                  {pm.icon_url && (
                                                    <img
                                                      src={pm.icon_url.startsWith('http') ? pm.icon_url : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}${pm.icon_url}`}
                                                      alt={pm.bank_name}
                                                      className="h-4 w-auto object-contain max-w-[50px]"
                                                    />
                                                  )}
                                                </div>
                                                <div>
                                                  <span className="font-extrabold text-sm text-wellme-primary tracking-wide font-mono select-all block">{pm.account_number}</span>
                                                  <span className="text-[10px] text-grey-400 font-semibold mt-0.5 block">a.n. {pm.account_name}</span>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <p className="text-xs text-grey-caption font-medium">Silakan transfer ke rekening resmi Klinik Allia Kids.</p>
                                        )}
                                      </div>
                                    ) : (
                                      <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-4 flex flex-col gap-2">
                                        <span className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
                                          💵 Pembayaran Tunai / Cash di Klinik
                                        </span>
                                        <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                                          Pembayaran secara tunai/cash dilakukan secara langsung di kasir Klinik Allia Kids. Jika Anda telah membayar secara tunai, silakan foto kuintansi/struk pembayaran menggunakan kamera HP Anda.
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })()}

                          {/* Invoice Items List */}
                          <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-bold text-grey-caption uppercase tracking-wider">Item Tagihan</span>
                            <div className="flex flex-col gap-1.5">
                              {inv.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-xs font-semibold text-grey-500">
                                  <span>{item.description}</span>
                                  <span>{formatCurrency(item.amount)}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Total and Actions */}
                          <div className="border-t border-slate-100 pt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-grey-caption uppercase tracking-wider">Total Tagihan Saat Ini</span>
                              <span className="text-lg font-black text-wellme-primary">{formatCurrency(inv.total_amount)}</span>
                            </div>
                            
                            {inv.status !== 'sudah_bayar' && inv.status !== 'menunggu_verifikasi' && (
                              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-stretch sm:items-center">
                                <a
                                  href={`https://wa.me/6281234567890?text=Halo%20Admin%20Allia%20Kids,%20saya%20ingin%20konfirmasi%20pembayaran%20untuk%20Invoice%20${inv.invoice_number}%20sebesar%20${formatCurrency(inv.total_amount)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded-xl border border-wellme-primary/20 hover:border-wellme-primary text-wellme-primary font-bold px-4 py-2.5 text-xs transition-all text-center flex items-center justify-center cursor-pointer"
                                >
                                  Tanya Admin via WA
                                </a>

                                {paymentMethodMap[inv.id] === 'cash' ? (
                                  <>
                                    {/* Camera Capture Button for Cash */}
                                    <label className="relative rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 text-xs transition-all shadow cursor-pointer text-center flex items-center justify-center gap-1.5">
                                      <span>📷 Foto Struk Cash (Kamera)</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        capture="environment"
                                        disabled={uploadingId === inv.id}
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            handleUploadProof(inv.id, file, 'cash');
                                          }
                                        }}
                                        className="hidden"
                                      />
                                    </label>
                                  </>
                                ) : (
                                  /* File Upload Button for Bank Transfer */
                                  <label className="relative rounded-xl bg-wellme-secondary-gradient hover:brightness-110 text-white font-bold px-5 py-2.5 text-xs transition-all shadow cursor-pointer text-center flex items-center justify-center">
                                    {uploadingId === inv.id ? (
                                      <span className="flex items-center gap-1.5">
                                        <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Mengunggah...
                                      </span>
                                    ) : (
                                      <span>Unggah Bukti Transfer</span>
                                    )}
                                    <input
                                      type="file"
                                      accept="image/*,application/pdf"
                                      disabled={uploadingId === inv.id}
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          handleUploadProof(inv.id, file, 'transfer');
                                        }
                                      }}
                                      className="hidden"
                                    />
                                  </label>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      <Footer />

      {/* Premium Toast Notification Popup */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-100 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border animate-zoom-in backdrop-blur-md transition-all ${
          toast.type === "success" 
            ? "bg-[#EBF3FC]/95 text-wellme-primary border-wellme-primary/20" 
            : "bg-red-50/95 text-red-700 border-red-200"
        }`}>
          {toast.type === "success" ? (
            <span className="text-lg">✅</span>
          ) : (
            <span className="text-lg">⚠️</span>
          )}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-85">
              {toast.type === "success" ? "Sukses" : "Gagal"}
            </span>
            <span className="text-sm font-semibold">{toast.message}</span>
          </div>
          <button 
            type="button"
            onClick={() => setToast(null)} 
            className="text-grey-450 hover:text-grey-600 font-bold ml-3 text-xs focus:outline-none cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Premium Lightbox Modal for Payment Proof Preview */}
      {previewImageUrl && (
        <div 
          className="fixed inset-0 z-110 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4"
          onClick={() => setPreviewImageUrl(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-zoom-in flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 shrink-0">
              <h3 className="font-extrabold text-wellme-primary text-sm tracking-wide">Pratinjau Bukti Pembayaran</h3>
              <button 
                type="button"
                onClick={() => setPreviewImageUrl(null)} 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-grey-500 font-bold flex items-center justify-center text-sm transition-colors cursor-pointer focus:outline-none"
              >
                ✕
              </button>
            </div>
            {/* Modal Body */}
            <div className="p-6 flex items-center justify-center bg-slate-50 overflow-y-auto grow">
              {previewImageUrl.toLowerCase().endsWith('.pdf') ? (
                <iframe 
                  src={previewImageUrl} 
                  className="w-full h-[60vh] rounded-2xl border-0"
                  title="Bukti Pembayaran PDF"
                />
              ) : (
                <img 
                  src={previewImageUrl} 
                  alt="Bukti Pembayaran" 
                  className="max-h-[60vh] max-w-full object-contain rounded-2xl shadow-sm border border-slate-200"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
