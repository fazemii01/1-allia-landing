"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { authApi } from "@/lib/api";

export default function Login() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState(""); // Email or Whatsapp
  const [password, setPassword] = useState("");
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

    if (!identifier || !password) return;

    try {
      setLoading(true);

      // Determine if identifier is an email
      const isEmail = identifier.includes("@");
      const payload = isEmail
        ? { email: identifier, password }
        : { whatsapp: identifier, password };

      const res = await authApi.login(payload);

      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("parentName", res.user.name);
        localStorage.setItem("whatsapp", res.user.whatsapp);
        if (res.user.email) {
          localStorage.setItem("email", res.user.email);
        }

        // Save child details returned from backend
        localStorage.setItem("childName", (res.user as any).child_name || "Anak");
        localStorage.setItem("childAge", String((res.user as any).child_age || "3"));
        localStorage.setItem("childTempatLahir", (res.user as any).child_tempat_lahir || "");
        localStorage.setItem("childTanggalLahir", (res.user as any).child_tanggal_lahir || "");
        localStorage.setItem("childJenisKelamin", (res.user as any).child_jenis_kelamin || "");

        if (!localStorage.getItem("activeBookings")) {
          localStorage.setItem("activeBookings", JSON.stringify([]));
        }
        if (!localStorage.getItem("testHistory")) {
          localStorage.setItem("testHistory", JSON.stringify([]));
        }
      }

      router.push("/tespsikologi");
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal masuk. Silakan cek kembali email/nomor WhatsApp dan password Anda.");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />

      <main className="flex-grow pt-24 flex items-center justify-center bg-wellme-100/20 py-16">
        <div className="max-w-md w-full mx-4 bg-white rounded-3xl border border-grey-200 p-8 shadow-md">
          
          <div className="text-center mb-8 flex flex-col gap-2">
            <span className="text-xs text-wellme-primary font-bold bg-[#EBF3FC] py-1.5 px-3.5 rounded-full w-fit mx-auto border border-grey-100 uppercase tracking-wider">
              Portal Allia Kids
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-wellme-primary">Masuk Akun</h2>
            <p className="text-sm text-grey-400 font-semibold leading-relaxed">
              Masuk kembali untuk mengakses pemantauan tumbuh kembang anak dan riwayat konsultasi.
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
              <label className="text-sm font-bold text-wellme-primary">Email atau Nomor WhatsApp</label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Contoh: rina@mail.com atau 081334455616"
                className="border border-grey-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-wellme-primary">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password Anda"
                className="border border-grey-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-wellme-primary text-grey-500 font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-wellme-primary-gradient text-white font-bold py-3.5 transition-all mt-4 shadow cursor-pointer text-center hover:brightness-110 disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Masuk & Lanjutkan ➔"}
            </button>

            <div className="text-center mt-4">
              <p className="text-xs text-grey-400 font-semibold">
                Belum memiliki akun?{" "}
                <Link href="/register" className="text-wellme-primary font-bold hover:underline">
                  Daftar di sini
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
