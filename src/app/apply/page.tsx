"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { layananApi, LayananItem } from "@/lib/api";

const STATIC_LAYANAN: LayananItem[] = [
  {
    id: 1,
    slug: "hipnoterapi-anak",
    title: "Hipnoterapi Anak & Dewasa",
    description: "Pendekatan hipnosleep/relaksasi emosi untuk mengatasi tantrum berlebih, fobia makanan (takut nasi), atau trauma.",
    image_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600",
    stats: { durasi_sesi: "90 Menit", format_layanan: "Tatap Muka", mulai_dari: "Rp 550.000" },
    mengapa_memilih: [],
    isu_permasalahan: [],
    programs: [
      { title: "Terapi Emosi & Perilaku", desc: "Membantu anak mengelola emosi negatif seperti marah, sedih, takut, atau trauma secara aman.", harga: "Rp 550.000 / Sesi" },
      { title: "Terapi Konsentrasi & Fokus Belajar", desc: "Meningkatkan kemampuan anak dalam berkonsentrasi, menghafal, dan menyerap pelajaran sekolah.", harga: "Rp 550.000 / Sesi" },
      { title: "Terapi Percaya Diri & Sosialisasi", desc: "Membantu anak mengatasi rasa malu, minder, rendah diri, atau takut bersosialisasi.", harga: "Rp 550.000 / Sesi" },
      { title: "Terapi Gangguan Tidur & Mimpi Buruk", desc: "Mengatasi masalah susah tidur, sering terbangun di malam hari, ketakutan tidur sendiri.", harga: "Rp 550.000 / Sesi" },
      { title: "Terapi Pengendalian Kebiasaan Buruk", desc: "Membantu anak menghentikan kebiasaan seperti menggigit kuku, ngompol, mengisap jempol.", harga: "Rp 550.000 / Sesi" },
      { title: "Terapi Kecemasan & Fobia", desc: "Mengatasi ketakutan berlebih terhadap sekolah, dokter, kegelapan, hewan, atau situasi sosial.", harga: "Rp 550.000 / Sesi" },
    ],
    is_active: true,
    sort_order: 1,
  },
  {
    id: 2,
    slug: "terapi-wicara",
    title: "Layanan Terapi Wicara",
    description: "Dirancang untuk mengatasi hambatan bicara, kosa kata terbatas, artikulasi, dan gangguan bahasa (Speech Delay).",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600",
    stats: { durasi_sesi: "60 Menit", format_layanan: "Offline & Online", mulai_dari: "Rp 150.000" },
    mengapa_memilih: [],
    isu_permasalahan: [],
    programs: [
      { title: "Terapi Wicara Umum", desc: "Evaluasi dan stimulasi kosa kata & komunikasi verbal anak.", harga: "Rp 150.000 / Sesi" },
      { title: "Artikulasi & Kejelasan Bicara (Cadel)", desc: "Melatih kejelasan pengucapan konsonan dan vokal.", harga: "Rp 150.000 / Sesi" },
      { title: "Mengatasi Gagap / Stuttering", desc: "Melatih kelancaran ritme bicar dan pernapasan.", harga: "Rp 150.000 / Sesi" },
      { title: "Hambatan Motorik Mulut (Oro-motor)", desc: "Latihan kekuatan otot bibir, lidah, dan rahang.", harga: "Rp 150.000 / Sesi" },
    ],
    is_active: true,
    sort_order: 2,
  },
  {
    id: 3,
    slug: "terapi-perilaku",
    title: "Terapi Perilaku",
    description: "Pendampingan khusus untuk stimulasi fokus, interaksi sosial, regulasi emosi, dan penanganan anak ADHD/Autisme.",
    image_url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600",
    stats: { durasi_sesi: "60 Menit", format_layanan: "Offline", mulai_dari: "Rp 200.000" },
    mengapa_memilih: [],
    isu_permasalahan: [],
    programs: [
      { title: "Terapi Perilaku & Sensori", desc: "Modifikasi perilaku hiperaktif dan ketaatan instruksi.", harga: "Rp 200.000 / Sesi" },
      { title: "Bimbingan Fokus & Atensi", desc: "Melatih daya tahan konsentrasi dan keheningan duduk.", harga: "Rp 200.000 / Sesi" },
    ],
    is_active: true,
    sort_order: 3,
  },
  {
    id: 4,
    slug: "tumbuh-kembang",
    title: "Skrining Tumbuh Kembang",
    description: "Pemeriksaan komprehensif oleh tim praktisi untuk mendeteksi dini milestone perkembangan fisik, bahasa, dan kognitif.",
    image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600",
    stats: { durasi_sesi: "45 Menit", format_layanan: "Offline", mulai_dari: "Rp 250.000" },
    mengapa_memilih: [],
    isu_permasalahan: [],
    programs: [
      { title: "Skrining Tumbuh Kembang Lengkap", desc: "Evaluasi motorik, wicara, emosi, dan sosial anak.", harga: "Rp 250.000 / Sesi" },
    ],
    is_active: true,
    sort_order: 4,
  },
];

// Custom scrollable dropdown to limit height to 6 items and match premium aesthetics
const CustomDropdown = ({
  value,
  options,
  onChange
}: {
  value: string | number;
  options: { val: string | number; label: string }[];
  onChange: (val: string | number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.val === value);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-[11px] font-bold text-wellme-primary bg-slate-50 border border-grey-150 rounded-lg py-1.5 px-2.5 focus:outline-none cursor-pointer flex items-center gap-1 hover:bg-slate-100 transition-all select-none"
      >
        <span>{selectedOption ? selectedOption.label : value}</span>
        <svg className="w-3 h-3 text-grey-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 z-60 w-32 max-h-[160px] overflow-y-auto bg-white border border-grey-150 rounded-xl shadow-lg py-1 scrollbar-thin">
          {options.map((opt) => (
            <div
              key={opt.val}
              onClick={() => {
                onChange(opt.val);
                setIsOpen(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold cursor-pointer hover:bg-[#EBF3FC] hover:text-wellme-primary text-center transition-colors ${
                opt.val === value ? "bg-[#EBF3FC] text-wellme-primary font-bold" : "text-grey-500"
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Premium Custom Date Picker Component with custom styleable Calendar popup
const CustomDatePicker = ({ value, onChange, disabled }: { value: string; onChange: (date: string) => void; disabled?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) return d;
    }
    return new Date();
  });
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setCurrentDate(d);
      }
    }
  }, [value]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Set birth years range up to current year
  const years = Array.from({ length: 25 }, (_, i) => 2026 - i);

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => {
    const d = new Date(y, m, 1).getDay();
    return d === 0 ? 6 : d - 1; // Mon = 0, Tue = 1, ..., Sun = 6
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const selectDate = (dayNum: number) => {
    const selected = new Date(year, month, dayNum);
    const formatted = `${selected.getFullYear()}-${String(selected.getMonth() + 1).padStart(2, '0')}-${String(selected.getDate()).padStart(2, '0')}`;
    onChange(formatted);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const gridCells = [];
  for (let i = 0; i < firstDay; i++) {
    gridCells.push(<div key={`empty-${i}`} className="w-8 h-8" />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isSelected = value && new Date(value).getDate() === d && new Date(value).getMonth() === month && new Date(value).getFullYear() === year;
    gridCells.push(
      <button
        key={`day-${d}`}
        type="button"
        onClick={() => selectDate(d)}
        className={`w-8 h-8 rounded-full text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
          isSelected
            ? "bg-wellme-primary text-white"
            : "hover:bg-[#EBF3FC] hover:text-wellme-primary text-grey-500"
        }`}
      >
        {d}
      </button>
    );
  }

  const formatDisplay = (val: string) => {
    if (!val) return "";
    const d = new Date(val);
    if (isNaN(d.getTime())) return "";
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`border border-grey-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold bg-white flex justify-between items-center cursor-pointer select-none transition-all hover:border-grey-300 ${
          disabled ? "bg-slate-50 text-grey-400 cursor-not-allowed border-grey-150" : ""
        }`}
      >
        <span>{formatDisplay(value) || "Pilih Tanggal Lahir"}</span>
        <svg className="w-5 h-5 text-grey-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute bottom-[calc(100%+6px)] left-0 z-50 w-72 bg-white rounded-2xl border border-grey-150 shadow-xl p-4 origin-bottom animate-zoom-in">
          <div className="flex justify-between items-center gap-2 mb-3">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-grey-500 font-bold transition-all cursor-pointer"
            >
              &larr;
            </button>
            <div className="flex gap-1.5 items-center">
              <CustomDropdown
                value={month}
                options={months.map((m, idx) => ({ val: idx, label: m }))}
                onChange={(val) => setCurrentDate(new Date(year, val as number, 1))}
              />
              <CustomDropdown
                value={year}
                options={years.map((y) => ({ val: y, label: y.toString() }))}
                onChange={(val) => setCurrentDate(new Date(val as number, month, 1))}
              />
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-grey-500 font-bold transition-all cursor-pointer"
            >
              &rarr;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-grey-450 uppercase mb-2 border-b border-grey-100 pb-1">
            <div>Sn</div>
            <div>Sl</div>
            <div>Rb</div>
            <div>Km</div>
            <div>Jm</div>
            <div>Sb</div>
            <div>Mg</div>
          </div>

          <div className="grid grid-cols-7 gap-1 justify-items-center">
            {gridCells}
          </div>
        </div>
      )}
    </div>
  );
};

export const isWicaraService = (jenis: string | undefined | null): boolean => {
  if (!jenis || typeof jenis !== "string") return false;
  const lower = jenis.toLowerCase();
  return lower === "terapi_wicara" || lower === "terapi-wicara" || lower.includes("wicara");
};

function ApplyPageContent() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [isReadOnlyUser, setIsReadOnlyUser] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    nama_lengkap: "",
    usia: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    email_ortu: "",
    no_telepon: "",
    nama_ayah: "",
    nama_ibu: "",
    alamat: "",
    // Step 2
    jenis_terapi: "",
    program: "",
    // Step 3
    pendidikan_anak: "",
    relasi_sosial: "",
    relasi_dengan_ibu: "",
    relasi_dengan_saudara: "",
    // Step 4A: Terapi Wicara
    masalah_bicara: "",
    sudah_berapa_lama_wicara: "",
    dalam_penanganan_lain: "0",
    nama_penanganan_lain: "",
    bahasa_sehari_hari_wicara: "",
    gangguan_utama: [] as string[],
    keluhan_lainnya: "",
    pengurus_utama_wicara: [] as string[],
    masalah_kehamilan_wicara: "0",
    detail_masalah_kehamilan_wicara: "",
    riwayat_keterlambatan: "0",
    detail_keterlambatan: "",
    harapan_terapi_wicara: "",
    pernah_trauma_wicara: "0",
    detail_trauma_wicara: "",
    pernah_terapi_sebelumnya: "0",
    ada_kekhawatiran_terapi: "0",
    detail_kekhawatiran: "",
    // Step 4B: Hipoterapi
    keluhan_utama: [] as string[],
    penjelasan_keluhan: "",
    sudah_berapa_lama_hipo: "",
    dalam_penanganan_dokter: "0",
    nama_dokter: "",
    pengurus_utama_hipo: [] as string[],
    bahasa_sehari_hari_hipo: "",
    masalah_kehamilan_hipo: "0",
    detail_masalah_kehamilan_hipo: "",
    pernah_trauma_hipo: "0",
    detail_trauma_hipo: "",
    harapan_terapi_hipo: "",
    tempat_favorit: [] as string[],
    hobby: [] as string[],
    pernah_hipnoterapi: "0",
    ada_ketakutan_terapi: "0",
    detail_ketakutan: "",
    // Step 5
    declarationAccepted: false,
  });

  const [dbLayanan, setDbLayanan] = useState<LayananItem[]>(STATIC_LAYANAN);

  useEffect(() => {
    async function loadLayanan() {
      try {
        const list = await layananApi.getAll();
        if (list && list.length > 0) {
          setDbLayanan(list);
        }
      } catch (err) {
        console.warn("Gagal memuat layanan dari backend, menggunakan data fallback.", err);
      }
    }
    loadLayanan();
  }, []);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const logged = localStorage.getItem("isLoggedIn");
      
      // Read query params manually to avoid Suspense requirement of useSearchParams
      const params = new URLSearchParams(window.location.search);
      const queryCategory = params.get("category") || params.get("layanan");
      const queryProgram = params.get("program");

      setFormData((prev) => {
        const updated = { ...prev };
        if (logged === "true") {
          updated.nama_lengkap = localStorage.getItem("childName") || "";
          updated.usia = localStorage.getItem("childAge") || "";
          updated.email_ortu = localStorage.getItem("email") || "";
          updated.no_telepon = localStorage.getItem("whatsapp") || "";
          updated.tempat_lahir = localStorage.getItem("childTempatLahir") || "";
          updated.tanggal_lahir = localStorage.getItem("childTanggalLahir") || "";
          updated.jenis_kelamin = localStorage.getItem("childJenisKelamin") || "";
          setIsReadOnlyUser(true);
        }
        if (queryCategory) {
          const matched = dbLayanan.find(
            (l) =>
              l.slug === queryCategory ||
              l.id.toString() === queryCategory ||
              (l.slug && queryCategory.includes(l.slug)) ||
              (l.slug === "terapi-wicara" && (queryCategory === "terapi_wicara" || queryCategory === "terapi-wicara")) ||
              (l.slug === "hipnoterapi-anak" && (queryCategory === "hipoterapi" || queryCategory === "hipnoterapi"))
          );
          updated.jenis_terapi = matched ? matched.slug : queryCategory;
        }
        if (queryProgram) {
          updated.program = queryProgram;
        }
        return updated;
      });
    }
  }, [dbLayanan]);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxGroupChange = (groupName: string, value: string) => {
    setFormData((prev) => {
      const raw = prev[groupName as keyof typeof prev];
      const currentValues = Array.isArray(raw) ? raw : [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      return { ...prev, [groupName]: newValues };
    });
  };

  const handleYNSelect = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setValidationError("");
    // Basic validation
    if (step === 1) {
      if (
        !formData.nama_lengkap ||
        !formData.usia ||
        !formData.jenis_kelamin ||
        !formData.tempat_lahir ||
        !formData.tanggal_lahir ||
        !formData.email_ortu ||
        !formData.no_telepon ||
        !formData.nama_ayah ||
        !formData.nama_ibu ||
        !formData.alamat
      ) {
        setValidationError("Harap lengkapi semua bidang yang bertanda bintang (*)");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
    if (step === 2) {
      if (!formData.jenis_terapi) {
        setValidationError("Harap pilih salah satu program terapi");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (!formData.program) {
        setValidationError("Harap pilih salah satu program spesifik dari daftar");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
    if (step === 3) {
      if (
        !formData.pendidikan_anak ||
        !formData.relasi_sosial ||
        !formData.relasi_dengan_ibu ||
        !formData.relasi_dengan_saudara
      ) {
        setValidationError("Harap lengkapi semua evaluasi relasi anak");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
    if (step === 4) {
      if (isWicaraService(formData.jenis_terapi)) {
        if (
          !formData.masalah_bicara ||
          !formData.sudah_berapa_lama_wicara ||
          !formData.bahasa_sehari_hari_wicara ||
          formData.gangguan_utama.length === 0 ||
          formData.pengurus_utama_wicara.length === 0 ||
          !formData.harapan_terapi_wicara
        ) {
          setValidationError("Harap lengkapi pertanyaan wajib (*) pada formulir Terapi Wicara");
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      } else {
        if (
          formData.keluhan_utama.length === 0 ||
          !formData.penjelasan_keluhan ||
          !formData.sudah_berapa_lama_hipo ||
          formData.pengurus_utama_hipo.length === 0 ||
          !formData.bahasa_sehari_hari_hipo ||
          !formData.harapan_terapi_hipo ||
          formData.tempat_favorit.length === 0 ||
          formData.hobby.length === 0
        ) {
          setValidationError("Harap lengkapi pertanyaan wajib (*) pada formulir Detail Terapi");
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setValidationError("");
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    if (!formData.declarationAccepted) {
      setValidationError("Harap setujui pernyataan konfirmasi data.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const selectedLayanan = dbLayanan.find(
        (l) =>
          l.slug === formData.jenis_terapi ||
          l.id.toString() === formData.jenis_terapi ||
          (l.slug === "terapi-wicara" && formData.jenis_terapi === "terapi_wicara") ||
          (l.slug === "hipnoterapi-anak" && formData.jenis_terapi === "hipoterapi")
      );
      const titleLayanan = selectedLayanan ? selectedLayanan.title : formData.jenis_terapi;
      const payload = {
        ...formData,
        jenis_terapi: `${titleLayanan}: ${formData.program || titleLayanan}`
      };
      
      const res = await fetch(`${baseUrl}/api/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("HTTP error " + res.status);
      }

      if (typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true") {
        localStorage.setItem("childTempatLahir", formData.tempat_lahir);
        localStorage.setItem("childTanggalLahir", formData.tanggal_lahir);
        localStorage.setItem("childJenisKelamin", formData.jenis_kelamin);
      }

      router.push("/portal?tab=tagihan");
    } catch (err) {
      console.warn("Backend API not reachable. Saving to local storage fallback...", err);

      if (typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true") {
        localStorage.setItem("childTempatLahir", formData.tempat_lahir);
        localStorage.setItem("childTanggalLahir", formData.tanggal_lahir);
        localStorage.setItem("childJenisKelamin", formData.jenis_kelamin);
      }

      const selectedLayanan = dbLayanan.find(
        (l) =>
          l.slug === formData.jenis_terapi ||
          l.id.toString() === formData.jenis_terapi ||
          (l.slug === "terapi-wicara" && formData.jenis_terapi === "terapi_wicara") ||
          (l.slug === "hipnoterapi-anak" && formData.jenis_terapi === "hipoterapi")
      );
      const titleLayanan = selectedLayanan ? selectedLayanan.title : formData.jenis_terapi;

      // Offline fallback: Save in localStorage so user still gets redirected
      const pendingSubmissions = JSON.parse(localStorage.getItem("pending_applies") || "[]");
      pendingSubmissions.push({
        id: Date.now(),
        submittedAt: new Date().toISOString(),
        ...formData,
        jenis_terapi: `${titleLayanan}: ${formData.program || titleLayanan}`
      });
      localStorage.setItem("pending_applies", JSON.stringify(pendingSubmissions));

      router.push("/portal?tab=tagihan");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Brand/Heading */}
          <div className="text-center mb-8 flex flex-col gap-2">
            <span className="text-xs text-wellme-primary font-bold bg-[#EBF3FC] py-1.5 px-3.5 rounded-full w-fit mx-auto border border-grey-100 uppercase tracking-wider">
              Portal Pendaftaran Terapi
            </span>
            <h1 className="text-3xl font-extrabold text-wellme-primary">Formulir Allia Kids</h1>
            <p className="text-sm text-grey-400 font-semibold leading-relaxed">
              Daftarkan putra-putri Anda untuk mengikuti program stimulasi tumbuh kembang
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="bg-white rounded-3xl p-6 border border-grey-200 shadow-sm mb-6">
            <div className="flex justify-between items-center relative mb-4">
              {[
                { s: 1, label: "Identitas" },
                { s: 2, label: "Program" },
                { s: 3, label: "Kondisi" },
                { s: 4, label: "Detail" },
                { s: 5, label: "Review" },
              ].map((item) => (
                <div key={item.s} className="flex flex-col items-center flex-1 relative z-10">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      step >= item.s
                        ? "bg-wellme-primary text-white shadow-md shadow-wellme-primary/20"
                        : "bg-grey-100 text-grey-400"
                    }`}
                  >
                    {item.s}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-2 transition-colors ${
                      step === item.s ? "text-wellme-primary" : "text-grey-300"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
              {/* Connector line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-grey-100 -z-0" />
              <div
                className="absolute top-4 left-0 h-0.5 bg-wellme-primary transition-all duration-500 -z-0"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Form Wrapper */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-grey-200 shadow-sm flex flex-col gap-6">
            {validationError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between animate-pulse">
                <span>⚠️ {validationError}</span>
                <button
                  type="button"
                  onClick={() => setValidationError("")}
                  className="text-red-500 hover:text-red-700 font-bold ml-2 cursor-pointer text-sm"
                >
                  ✕
                </button>
              </div>
            )}
            
            {/* ==================== STEP 1: IDENTITAS ==================== */}
            {step === 1 && (
              <div className="flex flex-col gap-5">
                <div className="border-b border-grey-100 pb-3">
                  <h3 className="text-lg font-extrabold text-wellme-primary">Identitas Anak & Orang Tua</h3>
                  <p className="text-xs text-grey-400 font-semibold">Lengkapi data primer di bawah ini</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Nama Lengkap Anak <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="nama_lengkap"
                    required
                    disabled={isReadOnlyUser}
                    value={formData.nama_lengkap}
                    onChange={handleInputChange}
                    placeholder="Nama lengkap anak"
                    className={`border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold ${isReadOnlyUser ? "bg-slate-50 text-grey-400 cursor-not-allowed border-grey-150" : ""}`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Usia (Tahun) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      name="usia"
                      required
                      min={1}
                      max={30}
                      disabled={isReadOnlyUser}
                      value={formData.usia}
                      onChange={handleInputChange}
                      placeholder="Contoh: 3"
                      className={`border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold ${isReadOnlyUser ? "bg-slate-50 text-grey-400 cursor-not-allowed border-grey-150" : ""}`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Jenis Kelamin <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      {["laki-laki", "perempuan"].map((gender) => (
                        <button
                          key={gender}
                          type="button"
                          onClick={() => !isReadOnlyUser && setFormData((prev) => ({ ...prev, jenis_kelamin: gender }))}
                          className={`flex-1 py-3 text-sm font-bold border rounded-xl transition-all capitalize ${
                            formData.jenis_kelamin === gender
                              ? "border-wellme-primary bg-[#EBF3FC] text-wellme-primary"
                              : "border-grey-200 hover:border-grey-300 text-grey-400"
                          } ${isReadOnlyUser ? "bg-slate-50 text-grey-400 cursor-not-allowed border-grey-150" : ""}`}
                        >
                          {gender === "laki-laki" ? "♂ Laki-laki" : "♀ Perempuan"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Tempat Lahir <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="tempat_lahir"
                      required
                      disabled={isReadOnlyUser}
                      value={formData.tempat_lahir}
                      onChange={handleInputChange}
                      placeholder="Contoh: Lumajang"
                      className={`border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold ${isReadOnlyUser ? "bg-slate-50 text-grey-400 cursor-not-allowed border-grey-150" : ""}`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Tanggal Lahir <span className="text-red-500">*</span></label>
                    <CustomDatePicker
                      value={formData.tanggal_lahir}
                      onChange={(date) => setFormData((prev) => ({ ...prev, tanggal_lahir: date }))}
                      disabled={isReadOnlyUser}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Email Orang Tua <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      name="email_ortu"
                      required
                      disabled={isReadOnlyUser}
                      value={formData.email_ortu}
                      onChange={handleInputChange}
                      placeholder="email@contoh.com"
                      className={`border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold ${isReadOnlyUser ? "bg-slate-50 text-grey-400 cursor-not-allowed border-grey-150" : ""}`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">No. WhatsApp <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      name="no_telepon"
                      required
                      disabled={isReadOnlyUser}
                      value={formData.no_telepon}
                      onChange={handleInputChange}
                      placeholder="Contoh: 081334455616"
                      className={`border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold ${isReadOnlyUser ? "bg-slate-50 text-grey-400 cursor-not-allowed border-grey-150" : ""}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Nama Lengkap Ayah <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="nama_ayah"
                      required
                      value={formData.nama_ayah}
                      onChange={handleInputChange}
                      placeholder="Nama ayah kandung"
                      className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Nama Lengkap Ibu <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="nama_ibu"
                      required
                      value={formData.nama_ibu}
                      onChange={handleInputChange}
                      placeholder="Nama ibu kandung"
                      className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Alamat Lengkap Rumah <span className="text-red-500">*</span></label>
                  <textarea
                    name="alamat"
                    required
                    value={formData.alamat}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Contoh: Jalan Merdeka No. 12, Kel. Tompokersan, Kec. Lumajang"
                    className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold resize-none"
                  />
                </div>
              </div>
            )}

            {/* ==================== STEP 2: PROGRAM TERAPI ==================== */}
            {step === 2 && (
              <div className="flex flex-col gap-5">
                <div className="border-b border-grey-100 pb-3">
                  <h3 className="text-lg font-extrabold text-wellme-primary">Pilih Program Terapi</h3>
                  <p className="text-xs text-grey-400 font-semibold">Tentukan jenis pendampingan yang dibutuhkan anak</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  {dbLayanan.map((prog) => {
                    const getIcon = (item: LayananItem) => {
                      if ((item as any).category?.icon) return (item as any).category.icon;
                      const s = item.slug?.toLowerCase() || item.title?.toLowerCase() || "";
                      if (s.includes("wicara")) return "🗣️";
                      if (s.includes("hipno") || s.includes("hipo")) return "🧠";
                      if (s.includes("perilaku")) return "🎯";
                      if (s.includes("tumbuh") || s.includes("skrining")) return "📏";
                      if (s.includes("sidik")) return "👆";
                      if (s.includes("jari")) return "✋";
                      return "🩺";
                    };

                    const isSelected =
                      formData.jenis_terapi === prog.slug ||
                      formData.jenis_terapi === prog.id.toString() ||
                      (prog.slug === "terapi-wicara" && formData.jenis_terapi === "terapi_wicara") ||
                      (prog.slug === "hipnoterapi-anak" && formData.jenis_terapi === "hipoterapi");

                    return (
                      <button
                        key={prog.id || prog.slug}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, jenis_terapi: prog.slug, program: "" }))}
                        className={`flex flex-col items-center text-center p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "border-wellme-primary bg-[#EBF3FC] shadow-md shadow-wellme-primary/10"
                            : "border-grey-200 hover:border-grey-300 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-4xl mb-4">{getIcon(prog)}</span>
                        <h4 className="font-extrabold text-wellme-primary mb-2 text-base">{prog.title}</h4>
                        <p className="text-xs text-grey-400 font-semibold leading-relaxed line-clamp-3">{prog.description}</p>
                      </button>
                    );
                  })}
                </div>

                {formData.jenis_terapi && (() => {
                  const selectedLayanan = dbLayanan.find(
                    (l) =>
                      l.slug === formData.jenis_terapi ||
                      l.id.toString() === formData.jenis_terapi ||
                      (l.slug === "terapi-wicara" && formData.jenis_terapi === "terapi_wicara") ||
                      (l.slug === "hipnoterapi-anak" && formData.jenis_terapi === "hipoterapi")
                  );

                  const programs = selectedLayanan?.programs || [];

                  return (
                    <div className="mt-4 p-6 bg-slate-50 border border-grey-200 rounded-3xl animate-fadeIn flex flex-col gap-3">
                      <label className="block text-sm font-extrabold text-wellme-primary">
                        Pilih Program Spesifik *
                      </label>
                      <select
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-grey-200 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-wellme-primary cursor-pointer text-grey-500"
                      >
                        <option value="">
                          -- Pilih Program {selectedLayanan ? selectedLayanan.title : "Terapi"} --
                        </option>
                        {programs.length > 0 ? (
                          programs.map((p, idx) => (
                            <option key={idx} value={p.title}>
                              {p.title} {p.harga ? `(${p.harga})` : ""}
                            </option>
                          ))
                        ) : (
                          <option value={selectedLayanan?.title || "Program Terapi Umum"}>
                            {selectedLayanan?.title || "Program Terapi Umum"}
                          </option>
                        )}
                      </select>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ==================== STEP 3: DATA KEADAAN ANAK ==================== */}
            {step === 3 && (
              <div className="flex flex-col gap-5">
                <div className="border-b border-grey-100 pb-3">
                  <h3 className="text-lg font-extrabold text-wellme-primary">Data Keadaan Umum Anak</h3>
                  <p className="text-xs text-grey-400 font-semibold">Berikan gambaran singkat relasi dan pendidikan anak</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Pendidikan Anak <span className="text-red-500">*</span></label>
                  <select
                    name="pendidikan_anak"
                    required
                    value={formData.pendidikan_anak}
                    onChange={handleInputChange}
                    className="border border-grey-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                  >
                    <option value="">— Pilih Jenjang Pendidikan —</option>
                    <option value="Belum Sekolah">Belum Sekolah / Di Rumah</option>
                    <option value="PAUD">PAUD</option>
                    <option value="TK">Taman Kanak-Kanak (TK)</option>
                    <option value="SD">Sekolah Dasar (SD)</option>
                    <option value="SMP">Sekolah Menengah Pertama (SMP)</option>
                  </select>
                </div>

                {[
                  { name: "relasi_sosial", label: "Relasi Sosial Anak dengan Teman Sebaya" },
                  { name: "relasi_dengan_ibu", label: "Hubungan/Relasi Anak dengan Ibu" },
                  { name: "relasi_dengan_saudara", label: "Hubungan/Relasi Anak dengan Saudara (Kakak/Adik)" },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">{field.label} <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      {["baik", "lumayan", "buruk"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleYNSelect(field.name, option)}
                          className={`flex-1 py-2.5 text-xs font-bold border rounded-xl transition-all capitalize ${
                            formData[field.name as keyof typeof formData] === option
                              ? option === "baik"
                                ? "border-green-500 bg-green-50 text-green-600"
                                : option === "lumayan"
                                ? "border-wellme-primary bg-[#EBF3FC] text-wellme-primary"
                                : "border-red-500 bg-red-50 text-red-600"
                              : "border-grey-200 hover:border-grey-300 text-grey-400"
                          }`}
                        >
                          {option === "baik" ? "✅ Baik" : option === "lumayan" ? "〰️ Lumayan" : "❌ Buruk"}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ==================== STEP 4A: DETAIL FORMULIR TERAPI WICARA ==================== */}
            {step === 4 && isWicaraService(formData.jenis_terapi) && (
              <div className="flex flex-col gap-5">
                <div className="border-b border-grey-100 pb-3">
                  <h3 className="text-lg font-extrabold text-wellme-primary">Formulir Khusus Terapi Wicara</h3>
                  <p className="text-xs text-grey-400 font-semibold">Tolong jawab dengan kondisi aktual anak</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Masalah bicara/komunikasi yang dikeluhkan <span className="text-red-500">*</span></label>
                  <textarea
                    name="masalah_bicara"
                    required
                    rows={3}
                    value={formData.masalah_bicara}
                    onChange={handleInputChange}
                    placeholder="Contoh: Belum bisa merangkai 2 kata, kosa kata masih sangat terbatas..."
                    className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Sudah Berapa Lama Keluhan Ini? <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="sudah_berapa_lama_wicara"
                      required
                      value={formData.sudah_berapa_lama_wicara}
                      onChange={handleInputChange}
                      placeholder="Contoh: 6 bulan / 1 tahun"
                      className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Bahasa Sehari-hari Anak <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="bahasa_sehari_hari_wicara"
                      required
                      value={formData.bahasa_sehari_hari_wicara}
                      onChange={handleInputChange}
                      placeholder="Contoh: Bahasa Indonesia & Jawa"
                      className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Sedang penanganan terapis/dokter lain?</label>
                    <div className="flex gap-2">
                      {[
                        { val: "1", text: "Ya" },
                        { val: "0", text: "Tidak" },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => handleYNSelect("dalam_penanganan_lain", item.val)}
                          className={`flex-1 py-3 text-xs font-bold border rounded-xl transition-all ${
                            formData.dalam_penanganan_lain === item.val
                              ? "border-wellme-primary bg-[#EBF3FC] text-wellme-primary"
                              : "border-grey-200 hover:border-grey-300 text-grey-400"
                          }`}
                        >
                          {item.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.dalam_penanganan_lain === "1" && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Nama Dokter & RS/Klinik</label>
                      <input
                        type="text"
                        name="nama_penanganan_lain"
                        value={formData.nama_penanganan_lain}
                        onChange={handleInputChange}
                        placeholder="Nama tempat & spesialis"
                        className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Gangguan Utama yang Dirasakan <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Sulit bicara",
                      "Sulit merangkai kata",
                      "Malas berbicara",
                      "Takut berbicara",
                      "Artikulasi tidak jelas",
                      "Kosa kata terbatas",
                      "Sulit menyampaikan keinginan",
                    ].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => handleCheckboxGroupChange("gangguan_utama", g)}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                          formData.gangguan_utama.includes(g)
                            ? "bg-[#EBF3FC] border-wellme-primary text-wellme-primary"
                            : "bg-white border-grey-200 text-grey-400 hover:border-grey-300"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Pengurus Utama Anak Sehari-hari <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {["Ayah", "Ibu", "Kakek", "Nenek", "Baby Sitter", "Lainnya"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handleCheckboxGroupChange("pengurus_utama_wicara", p)}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                          formData.pengurus_utama_wicara.includes(p)
                            ? "bg-[#EBF3FC] border-wellme-primary text-wellme-primary"
                            : "bg-white border-grey-200 text-grey-400 hover:border-grey-300"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prenatal Problems */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Masalah saat kehamilan/kandungan?</label>
                    <div className="flex gap-2">
                      {[
                        { val: "1", text: "Ya" },
                        { val: "0", text: "Tidak" },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => handleYNSelect("masalah_kehamilan_wicara", item.val)}
                          className={`flex-1 py-3 text-xs font-bold border rounded-xl transition-all ${
                            formData.masalah_kehamilan_wicara === item.val
                              ? "border-wellme-primary bg-[#EBF3FC] text-wellme-primary"
                              : "border-grey-200 hover:border-grey-300 text-grey-400"
                          }`}
                        >
                          {item.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.masalah_kehamilan_wicara === "1" && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Detail Masalah Kehamilan</label>
                      <input
                        type="text"
                        name="detail_masalah_kehamilan_wicara"
                        value={formData.detail_masalah_kehamilan_wicara}
                        onChange={handleInputChange}
                        placeholder="Contoh: Lahir prematur, keracunan ketuban, dll"
                        className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                      />
                    </div>
                  )}
                </div>

                {/* Development Milestones History */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Keluarga dengan riwayat terlambat bicara?</label>
                    <div className="flex gap-2">
                      {[
                        { val: "1", text: "Ya" },
                        { val: "0", text: "Tidak" },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => handleYNSelect("riwayat_keterlambatan", item.val)}
                          className={`flex-1 py-3 text-xs font-bold border rounded-xl transition-all ${
                            formData.riwayat_keterlambatan === item.val
                              ? "border-wellme-primary bg-[#EBF3FC] text-wellme-primary"
                              : "border-grey-200 hover:border-grey-300 text-grey-400"
                          }`}
                        >
                          {item.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.riwayat_keterlambatan === "1" && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Jelaskan Siapa</label>
                      <input
                        type="text"
                        name="detail_keterlambatan"
                        value={formData.detail_keterlambatan}
                        onChange={handleInputChange}
                        placeholder="Contoh: Om dari pihak ayah dulu lambat bicara"
                        className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                      />
                    </div>
                  )}
                </div>

                {/* Trauma */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Pernah mengalami trauma/ketakutan?</label>
                    <div className="flex gap-2">
                      {[
                        { val: "1", text: "Ya" },
                        { val: "0", text: "Tidak" },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => handleYNSelect("pernah_trauma_wicara", item.val)}
                          className={`flex-1 py-3 text-xs font-bold border rounded-xl transition-all ${
                            formData.pernah_trauma_wicara === item.val
                              ? "border-wellme-primary bg-[#EBF3FC] text-wellme-primary"
                              : "border-grey-200 hover:border-grey-300 text-grey-400"
                          }`}
                        >
                          {item.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.pernah_trauma_wicara === "1" && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Detail Trauma Anak</label>
                      <input
                        type="text"
                        name="detail_trauma_wicara"
                        value={formData.detail_trauma_wicara}
                        onChange={handleInputChange}
                        placeholder="Contoh: Takut suara blender, trauma jatuh"
                        className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                      />
                    </div>
                  )}
                </div>

                {/* Hope & Goal */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Harapan setelah terapi dijalankan <span className="text-red-500">*</span></label>
                  <textarea
                    name="harapan_terapi_wicara"
                    required
                    rows={2}
                    value={formData.harapan_terapi_wicara}
                    onChange={handleInputChange}
                    placeholder="Contoh: Berharap anak bisa lancar bersosialisasi dan bicaranya jelas..."
                    className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold resize-none"
                  />
                </div>
              </div>
            )}

            {/* ==================== STEP 4B: DETAIL FORMULIR HIPOTERAPI / GENERAL TERAPI ==================== */}
            {step === 4 && !isWicaraService(formData.jenis_terapi) && (
              <div className="flex flex-col gap-5">
                <div className="border-b border-grey-100 pb-3">
                  <h3 className="text-lg font-extrabold text-wellme-primary">
                    Formulir Khusus {dbLayanan.find(l => l.slug === formData.jenis_terapi || l.id.toString() === formData.jenis_terapi)?.title || "Detail Terapi"}
                  </h3>
                  <p className="text-xs text-grey-400 font-semibold">Tolong jawab dengan kondisi aktual anak</p>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Keluhan Emosi yang Dominan <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Marah",
                      "Cemas",
                      "Sedih",
                      "Bosan",
                      "Tidak Bisa Fokus",
                      "Kecewa",
                      "Takut",
                      "Sakit Hati",
                      "Kesepian",
                      "Gampang Sakit",
                      "Lainnya",
                    ].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => handleCheckboxGroupChange("keluhan_utama", g)}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                          formData.keluhan_utama.includes(g)
                            ? "bg-[#EBF3FC] border-wellme-primary text-wellme-primary"
                            : "bg-white border-grey-200 text-grey-400 hover:border-grey-300"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Penjelasan Singkat Permasalahan Anak <span className="text-red-500">*</span></label>
                  <textarea
                    name="penjelasan_keluhan"
                    required
                    rows={3}
                    value={formData.penjelasan_keluhan}
                    onChange={handleInputChange}
                    placeholder="Jelaskan kondisi emosi anak (seperti tantrum melempar barang, takut nasi, dll)..."
                    className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Sudah Berapa Lama Keluhan Ini? <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="sudah_berapa_lama_hipo"
                      required
                      value={formData.sudah_berapa_lama_hipo}
                      onChange={handleInputChange}
                      placeholder="Contoh: 3 bulan / 1 tahun"
                      className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Bahasa Sehari-hari Anak <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="bahasa_sehari_hari_hipo"
                      required
                      value={formData.bahasa_sehari_hari_hipo}
                      onChange={handleInputChange}
                      placeholder="Contoh: Bahasa Indonesia & Jawa"
                      className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Sedang penanganan dokter/psikolog?</label>
                    <div className="flex gap-2">
                      {[
                        { val: "1", text: "Ya" },
                        { val: "0", text: "Tidak" },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => handleYNSelect("dalam_penanganan_dokter", item.val)}
                          className={`flex-1 py-3 text-xs font-bold border rounded-xl transition-all ${
                            formData.dalam_penanganan_dokter === item.val
                              ? "border-wellme-primary bg-[#EBF3FC] text-wellme-primary"
                              : "border-grey-200 hover:border-grey-300 text-grey-400"
                          }`}
                        >
                          {item.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.dalam_penanganan_dokter === "1" && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Nama Dokter/Psikolog</label>
                      <input
                        type="text"
                        name="nama_dokter"
                        value={formData.nama_dokter}
                        onChange={handleInputChange}
                        placeholder="Nama spesialis & instansi"
                        className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Pengurus Utama Anak Sehari-hari <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {["Ayah", "Ibu", "Kakek", "Nenek", "Baby Sitter", "Lainnya"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handleCheckboxGroupChange("pengurus_utama_hipo", p)}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                          formData.pengurus_utama_hipo.includes(p)
                            ? "bg-[#EBF3FC] border-wellme-primary text-wellme-primary"
                            : "bg-white border-grey-200 text-grey-400 hover:border-grey-300"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Places */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Tempat Favorit Anak <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {["Taman", "Pegunungan", "Sekolah", "Taman Bermain", "Pantai", "Danau", "Rumah", "Lainnya"].map((pl) => (
                      <button
                        key={pl}
                        type="button"
                        onClick={() => handleCheckboxGroupChange("tempat_favorit", pl)}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                          formData.tempat_favorit.includes(pl)
                            ? "bg-[#EBF3FC] border-wellme-primary text-wellme-primary"
                            : "bg-white border-grey-200 text-grey-400 hover:border-grey-300"
                        }`}
                      >
                        {pl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hobbies */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Hobi/Kegiatan Favorit Anak <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Bermain HP/Gadget",
                      "Menonton TV",
                      "Bermain Game",
                      "Menggambar",
                      "Bermain dengan teman",
                      "Olahraga",
                      "Membaca Buku",
                      "Mendengarkan Musik",
                      "Bermain hewan peliharaan",
                      "Bermain alat musik",
                      "Lainnya",
                    ].map((hb) => (
                      <button
                        key={hb}
                        type="button"
                        onClick={() => handleCheckboxGroupChange("hobby", hb)}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                          formData.hobby.includes(hb)
                            ? "bg-[#EBF3FC] border-wellme-primary text-wellme-primary"
                            : "bg-white border-grey-200 text-grey-400 hover:border-grey-300"
                        }`}
                      >
                        {hb}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hope & Goal */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-wellme-primary uppercase tracking-wide">Harapan setelah terapi dijalankan <span className="text-red-500">*</span></label>
                  <textarea
                    name="harapan_terapi_hipo"
                    required
                    rows={2}
                    value={formData.harapan_terapi_hipo}
                    onChange={handleInputChange}
                    placeholder="Contoh: Berharap emosi anak lebih stabil dan berani makan nasi..."
                    className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold resize-none"
                  />
                </div>
              </div>
            )}

            {/* ==================== STEP 5: REVIEW ==================== */}
            {step === 5 && (
              <div className="flex flex-col gap-5">
                <div className="border-b border-grey-100 pb-3">
                  <h3 className="text-lg font-extrabold text-wellme-primary">Konfirmasi Pendaftaran</h3>
                  <p className="text-xs text-grey-400 font-semibold">Tolong tinjau kembali data di bawah ini sebelum mengirim</p>
                </div>

                <div className="bg-slate-50 border border-grey-150 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 text-sm font-semibold text-grey-500">
                  <div className="grid grid-cols-2 gap-y-2 border-b border-grey-200 pb-3">
                    <span className="text-grey-300 uppercase tracking-wide text-[10px]">Nama Lengkap</span>
                    <span className="text-wellme-primary font-bold text-right">{formData.nama_lengkap}</span>

                    <span className="text-grey-300 uppercase tracking-wide text-[10px]">Usia</span>
                    <span className="text-wellme-primary font-bold text-right">{formData.usia} Tahun</span>

                    <span className="text-grey-300 uppercase tracking-wide text-[10px]">Program Terapi</span>
                    <span className="text-wellme-primary font-bold text-right capitalize">
                      {(() => {
                        const sel = dbLayanan.find(l => l.slug === formData.jenis_terapi || l.id.toString() === formData.jenis_terapi);
                        return sel ? `${sel.title} - ${formData.program}` : `${formData.jenis_terapi}: ${formData.program}`;
                      })()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 border-b border-grey-200 pb-3">
                    <span className="text-grey-300 uppercase tracking-wide text-[10px]">Nama Orang Tua (Ibu)</span>
                    <span className="text-wellme-primary font-bold text-right">{formData.nama_ibu}</span>

                    <span className="text-grey-300 uppercase tracking-wide text-[10px]">WhatsApp</span>
                    <span className="text-wellme-primary font-bold text-right">{formData.no_telepon}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-grey-300 uppercase tracking-wide text-[10px]">Alamat Rumah</span>
                    <span className="text-wellme-primary font-bold text-justify leading-relaxed">{formData.alamat}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 mt-4 border border-grey-150 p-4 rounded-2xl bg-wellme-100/10">
                  <input
                    type="checkbox"
                    id="declarationAccepted"
                    checked={formData.declarationAccepted}
                    onChange={(e) => setFormData((prev) => ({ ...prev, declarationAccepted: e.target.checked }))}
                    className="w-5 h-5 accent-wellme-primary mt-0.5"
                  />
                  <label htmlFor="declarationAccepted" className="text-xs text-grey-400 font-semibold leading-relaxed cursor-pointer select-none">
                    Saya menyatakan bahwa data yang diisi di atas adalah <strong>benar</strong> dan saya bersedia dihubungi oleh tim administrasi Allia Kids.
                  </label>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-grey-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="rounded-xl border border-grey-200 hover:border-grey-300 text-grey-400 hover:text-wellme-primary font-bold px-6 py-3 text-sm transition-all"
                >
                  &larr; Kembali
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="rounded-xl bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-white font-bold px-8 py-3 text-sm shadow transition-all hover:scale-102 cursor-pointer"
                >
                  Lanjut &rarr;
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-wellme-primary hover:bg-wellme-secondary text-white font-bold px-10 py-3.5 text-sm shadow transition-all hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Formulir Pendaftaran"}
                </button>
              )}
            </div>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-wellme-primary">Memuat...</div>}>
      <ApplyPageContent />
    </Suspense>
  );
}

