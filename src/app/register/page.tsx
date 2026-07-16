"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { authApi } from "@/lib/api";

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
        className={`border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold bg-white flex justify-between items-center cursor-pointer select-none transition-all hover:border-grey-300 ${
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

export default function Register() {
  const router = useRouter();

  const [parentName, setParentName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("3");
  const [childTempatLahir, setChildTempatLahir] = useState("");
  const [childTanggalLahir, setChildTanggalLahir] = useState("");
  const [childJenisKelamin, setChildJenisKelamin] = useState("laki-laki");

  const [isMounted, setIsMounted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const logged = localStorage.getItem("isLoggedIn");
      if (logged === "true") {
        router.push("/tespsikologi");
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!parentName || !whatsapp || !email || !password) return;

    try {
      setLoading(true);
      const res = await authApi.register({
        name: parentName,
        whatsapp,
        email,
        password,
        child_name: childName,
        child_age: parseInt(childAge),
        child_tempat_lahir: childTempatLahir,
        child_tanggal_lahir: childTanggalLahir,
        child_jenis_kelamin: childJenisKelamin,
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("parentName", res.user.name);
        localStorage.setItem("whatsapp", res.user.whatsapp);
        if (res.user.email) {
          localStorage.setItem("email", res.user.email);
        }
        localStorage.setItem("childName", childName || "Anak");
        localStorage.setItem("childAge", childAge || "3");
        localStorage.setItem("childTempatLahir", childTempatLahir);
        localStorage.setItem("childTanggalLahir", childTanggalLahir);
        localStorage.setItem("childJenisKelamin", childJenisKelamin);
        localStorage.setItem("activeBookings", JSON.stringify([]));
        localStorage.setItem("testHistory", JSON.stringify([]));
      }

      router.push("/tespsikologi");
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal melakukan registrasi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />

      <main className="flex-grow pt-24 flex items-center justify-center bg-wellme-100/20 py-16">
        <div className="max-w-xl w-full mx-4 bg-white rounded-3xl border border-grey-200 p-8 shadow-md">
          <div className="text-center mb-8 flex flex-col gap-2">
            <span className="text-xs text-wellme-primary font-bold bg-[#EBF3FC] py-1.5 px-3.5 rounded-full w-fit mx-auto border border-grey-100 uppercase tracking-wider">
              Registrasi Portal Allia Kids
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-wellme-primary">Daftar Akun Orang Tua</h2>
            <p className="text-sm text-grey-400 font-semibold leading-relaxed">
              Daftarkan diri Anda dan si kecil untuk dapat memantau tumbuh kembang, emosi, serta memesan sesi konsultasi/terapi.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-500 rounded-2xl p-4 text-xs font-semibold mb-6 flex items-start gap-2.5">
              <span className="text-sm">⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-wellme-primary">Nama Orang Tua</label>
              <input
                type="text"
                required
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Contoh: Ibu Rina Amalia"
                className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-wellme-primary">Nomor WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Contoh: 081334455616"
                  className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-wellme-primary">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Contoh: rina@mail.com"
                  className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-wellme-primary">Password</label>
              <input
                type="password"
                required
                minLength={4}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 4 karakter"
                className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-wellme-primary">Nama Buah Hati</label>
                <input
                  type="text"
                  required
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Contoh: Rian"
                  className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-wellme-primary">Usia Anak (Tahun)</label>
                <select
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  className="border border-grey-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold cursor-pointer"
                >
                  <option value="1">1 Tahun</option>
                  <option value="2">2 Tahun</option>
                  <option value="3">3 Tahun</option>
                  <option value="4">4 Tahun</option>
                  <option value="5">5 Tahun</option>
                  <option value="6">Lebih dari 5 Tahun</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-wellme-primary">Tempat Lahir Anak</label>
                <input
                  type="text"
                  required
                  value={childTempatLahir}
                  onChange={(e) => setChildTempatLahir(e.target.value)}
                  placeholder="Contoh: Lumajang"
                  className="border border-grey-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-wellme-primary">Tanggal Lahir Anak</label>
                <CustomDatePicker
                  value={childTanggalLahir}
                  onChange={(date) => setChildTanggalLahir(date)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-wellme-primary">Jenis Kelamin Anak</label>
              <div className="flex gap-4">
                {["laki-laki", "perempuan"].map((gender) => (
                  <label key={gender} className="flex items-center gap-2 cursor-pointer font-semibold text-sm text-grey-500 capitalize">
                    <input
                      type="radio"
                      name="childJenisKelamin"
                      value={gender}
                      checked={childJenisKelamin === gender}
                      onChange={() => setChildJenisKelamin(gender)}
                      className="accent-wellme-primary w-4 h-4 cursor-pointer"
                    />
                    {gender}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-white font-bold py-3.5 transition-all mt-4 shadow cursor-pointer text-center disabled:opacity-50"
            >
              {loading ? "Mendaftar..." : "Daftar Akun & Lanjutkan ➔"}
            </button>

            <div className="text-center mt-4">
              <p className="text-xs text-grey-400 font-semibold">
                Sudah memiliki akun?{" "}
                <Link href="/login" className="text-wellme-primary font-bold hover:underline">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
