"use client";

import React, { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChatIcon, CalendarIcon } from "@/components/icons";
import { therapistApi } from "@/lib/api";

export default function CariPsikolog() {
  const [activeTab, setActiveTab] = useState<"jadwal" | "semua">("jadwal");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [dbPsychologists, setDbPsychologists] = useState<any[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function loadTherapists() {
      try {
        const list = await therapistApi.getAll();
        if (list) {
          const mapped = list.map((item) => ({
            name: item.name,
            type: item.specialization || "Terapis Allia Kids",
            rating: "5.0",
            reviews: "10+",
            specialties: item.bio ? item.bio.split("\n").filter(Boolean) : ["Terapis Berlisensi"],
            avatar: item.photo_url || "https://storage.googleapis.com/pendaftaran-production/assets/v6/psikolog-placeholder-male.webp",
            services: ["Offline"],
            days: ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"],
            timeSlots: ["morning", "afternoon"],
          }));
          setDbPsychologists(mapped);
          setHasLoaded(true);
        }
      } catch (err) {
        console.warn("Backend therapists API not reachable. Using static fallback.", err);
      }
    }
    loadTherapists();
  }, []);

  const staticPsychologists = [
    {
      name: "Riska Amanda, M.Psi., Psikolog",
      type: "Psikolog Klinis Anak & Tumbuh Kembang",
      rating: "4.9",
      reviews: "150+",
      specialties: ["Tantrum & Emosi", "Fobia Makanan / GTM", "Trauma Anak"],
      avatar: "https://storage.googleapis.com/pendaftaran-production/assets/v6/psikolog-placeholder-female.webp",
      services: ["Online", "Offline"],
      days: ["senin", "selasa", "kamis"],
      timeSlots: ["morning", "afternoon"],
    },
    {
      name: "Budi Satria, S.Tr.T.W.",
      type: "Terapis Wicara & Wicara Anak",
      rating: "5.0",
      reviews: "210+",
      specialties: ["Speech Delay", "Kesulitan Artikulasi", "Gagap Berbicara"],
      avatar: "https://storage.googleapis.com/pendaftaran-production/assets/v6/psikolog-placeholder-male.webp",
      services: ["Offline"],
      days: ["rabu", "kamis", "jumat"],
      timeSlots: ["afternoon", "evening"],
    },
    {
      name: "Siti Rahma, S.Psi.",
      type: "Terapis Perilaku & Anak Berkebutuhan Khusus",
      rating: "4.9",
      reviews: "185+",
      specialties: ["Fokus & ADHD/ADD", "Modifikasi Perilaku", "Sosialisasi Anak"],
      avatar: "https://storage.googleapis.com/pendaftaran-production/assets/v6/psikolog-placeholder-female.webp",
      services: ["Online", "Offline"],
      days: ["senin", "rabu", "sabtu"],
      timeSlots: ["morning", "evening"],
    },
    {
      name: "Diana Lestari, M.Psi., Psikolog",
      type: "Psikolog Klinis Anak & Remaja",
      rating: "4.8",
      reviews: "95+",
      specialties: ["Tumbuh Kembang", "Kesulitan Belajar", "Adiksi Gadget"],
      avatar: "https://storage.googleapis.com/pendaftaran-production/assets/v6/psikolog-placeholder-female.webp",
      services: ["Offline"],
      days: ["selasa", "jumat", "sabtu"],
      timeSlots: ["afternoon"],
    },
    {
      name: "Hendra Wijaya, C.Ht.",
      type: "Praktisi Hipnoterapi Anak & Dewasa",
      rating: "4.9",
      reviews: "160+",
      specialties: ["Fobia Makan/Nasi", "Trauma & Fobia", "Kecemasan & Motivasi"],
      avatar: "https://storage.googleapis.com/pendaftaran-production/assets/v6/psikolog-placeholder-male.webp",
      services: ["Online", "Offline"],
      days: ["senin", "kamis", "minggu"],
      timeSlots: ["evening"],
    },
  ];

  const psychologists = hasLoaded ? dbPsychologists : staticPsychologists;

  const filteredPsychologists = useMemo(() => {
    return psychologists.filter((psychologist) => {
      // 1. Text Search Filter
      if (
        searchQuery &&
        !psychologist.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // If activeTab is "semua", ignore day/time schedule filters
      if (activeTab === "semua") return true;

      // 2. Day Schedule Filter
      if (selectedDay && !psychologist.days.includes(selectedDay)) {
        return false;
      }

      // 3. Time Schedule Filter
      if (selectedTime && !psychologist.timeSlots.includes(selectedTime)) {
        return false;
      }

      return true;
    });
  }, [activeTab, selectedDay, selectedTime, searchQuery]);

  const daysList = [
    { value: "senin", label: "Senin" },
    { value: "selasa", label: "Selasa" },
    { value: "rabu", label: "Rabu" },
    { value: "kamis", label: "Kamis" },
    { value: "jumat", label: "Jumat" },
    { value: "sabtu", label: "Sabtu" },
    { value: "minggu", label: "Minggu" },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />

      <main className="flex-grow pt-10">
        <section className="h-[40px]"></section>
        
        <section className="container mx-auto px-4 lg:px-10 mb-32">
          <div className="lg:grid grid-cols-12 gap-8">
            {/* Desktop Left Sidebar: Filters */}
            <div className="col-span-3 hidden lg:block">
              <div className="flex flex-col rounded-3xl border border-grey-200 p-6 bg-white shadow-sm sticky top-[100px]">
                <h3 className="font-extrabold text-lg text-wellme-primary mb-5">Filter Pencarian</h3>
                <div className="flex flex-col gap-6">
                  {/* Day Filter */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-grey-400 uppercase">Hari Praktik</label>
                    <div className="flex flex-col gap-2 pl-1">
                      <button
                        type="button"
                        onClick={() => setSelectedDay("")}
                        className={`text-left text-sm font-semibold py-1 hover:text-wellme-primary cursor-pointer ${selectedDay === "" ? "text-wellme-secondary" : "text-grey-400"}`}
                      >
                        Semua Hari
                      </button>
                      {daysList.map((day) => (
                        <button
                          key={day.value}
                          type="button"
                          onClick={() => setSelectedDay(day.value)}
                          className={`text-left text-sm font-semibold py-1 hover:text-wellme-primary cursor-pointer ${selectedDay === day.value ? "text-wellme-secondary" : "text-grey-400"}`}
                        >
                          {day.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <hr className="border-grey-150" />

                  {/* Time Filter */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-grey-400 uppercase">Waktu Praktik</label>
                    <div className="flex flex-col gap-2 pl-1">
                      {[
                        { value: "", label: "Semua Waktu" },
                        { value: "morning", label: "Pagi (06:00 - 12:00)" },
                        { value: "afternoon", label: "Siang (12:01 - 18:00)" },
                        { value: "evening", label: "Malam (18:01 - 23:59)" },
                      ].map((time) => (
                        <button
                          key={time.value}
                          type="button"
                          onClick={() => setSelectedTime(time.value)}
                          className={`text-left text-sm font-semibold py-1 hover:text-wellme-primary cursor-pointer ${selectedTime === time.value ? "text-wellme-secondary" : "text-grey-400"}`}
                        >
                          {time.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Catalog Grid */}
            <div className="col-span-12 lg:col-span-9">
              <div className="flex flex-col gap-6">
                {/* Search, Filter Actions, Toggles */}
                <div className="flex flex-col gap-4">
                  {/* Category toggle */}
                  <div className="flex items-center gap-2 bg-white-wellme rounded-2xl p-1 border border-grey-150 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setActiveTab("jadwal")}
                      className={`rounded-xl text-center text-sm font-bold py-3 w-full transition-all duration-300 cursor-pointer ${
                        activeTab === "jadwal"
                          ? "bg-wellme-primary-gradient text-white shadow"
                          : "text-grey-400 hover:bg-wellme-primary/5"
                      }`}
                    >
                      Jadwal Terapis
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("semua")}
                      className={`rounded-xl text-center text-sm font-bold py-3 w-full transition-all duration-300 cursor-pointer ${
                        activeTab === "semua"
                          ? "bg-wellme-primary-gradient text-white shadow"
                          : "text-grey-400 hover:bg-wellme-primary/5"
                      }`}
                    >
                      Semua Terapis
                    </button>
                  </div>
 
                  {/* Search and Filters dropdown for mobile/responsive */}
                  <div className="flex flex-wrap lg:flex-nowrap gap-3 items-center">
                    {/* Search bar */}
                    <div className="flex items-center w-full gap-2 border border-grey-200 hover:border-grey-300 rounded-xl px-3 py-1 shadow-sm">
                      <input
                        type="text"
                        className="text-sm text-grey-500 placeholder:text-grey-400 focus:outline-none w-full py-2.5 font-semibold"
                        placeholder="Masukkan nama terapis atau psikolog"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <span className="text-grey-300">🔍</span>
                    </div>

                    {/* Mobile filter toggle */}
                    <button
                      type="button"
                      onClick={() => setIsMobileFilterOpen(true)}
                      className="lg:hidden shrink-0 rounded-xl border border-grey-200 hover:bg-grey-100 py-3 px-4 flex items-center gap-2 text-sm font-bold text-grey-400 cursor-pointer"
                    >
                      <span>⚙</span> Filter
                    </button>
                  </div>
                </div>

                {/* Filter Description Label */}
                {(selectedDay || selectedTime || searchQuery) && activeTab === "jadwal" && (
                  <div className="flex flex-wrap gap-2 items-center text-xs font-bold text-grey-400">
                    <span>Filter Aktif:</span>
                    {selectedDay && (
                      <span className="bg-wellme-100 text-wellme-primary px-3 py-1.5 rounded-full flex items-center gap-1">
                        Hari: {daysList.find(d => d.value === selectedDay)?.label}
                        <button type="button" onClick={() => setSelectedDay("")} className="hover:text-wellme-secondary font-bold pl-1">×</button>
                      </span>
                    )}
                    {selectedTime && (
                      <span className="bg-wellme-100 text-wellme-primary px-3 py-1.5 rounded-full flex items-center gap-1">
                        Waktu: {selectedTime === "morning" ? "Pagi" : selectedTime === "afternoon" ? "Siang" : "Malam"}
                        <button type="button" onClick={() => setSelectedTime("")} className="hover:text-wellme-secondary font-bold pl-1">×</button>
                      </span>
                    )}
                    {searchQuery && (
                      <span className="bg-wellme-100 text-wellme-primary px-3 py-1.5 rounded-full flex items-center gap-1">
                        Nama: {searchQuery}
                        <button type="button" onClick={() => setSearchQuery("")} className="hover:text-wellme-secondary font-bold pl-1">×</button>
                      </span>
                    )}
                  </div>
                )}

                {/* Results Listing Grid */}
                {filteredPsychologists.length > 0 ? (
                  <div className="flex flex-col gap-5">
                    {filteredPsychologists.map((psychologist, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-grey-200 bg-white p-5 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div className="flex items-start justify-between gap-4 lg:gap-8 flex-col sm:flex-row">
                          <div className="flex items-start gap-4 lg:gap-6 flex-col sm:flex-row w-full">
                            <div className="w-20 min-w-20 h-20 lg:w-28 lg:min-w-28 lg:h-28 rounded-full overflow-hidden border border-grey-200 bg-grey-100 flex-shrink-0">
                              <img
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                src={psychologist.avatar}
                                onError={(e) => {
                                  e.currentTarget.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${psychologist.name}`;
                                }}
                                alt={psychologist.name}
                              />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                              <div>
                                <div className="text-xs text-grey-400 font-bold bg-white-wellme py-1 px-3 rounded-full w-fit mb-1 border border-grey-200">
                                  {psychologist.type}
                                </div>
                                <h3 className="font-extrabold text-lg lg:text-xl text-wellme-primary group-hover:text-wellme-secondary transition-colors duration-200">
                                  {psychologist.name}
                                </h3>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-grey-400">
                                <div className="flex items-center gap-1">
                                  <span className="text-yellow-primary">★</span>
                                  <span>{psychologist.rating} ({psychologist.reviews} review)</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <ChatIcon size={14} className="text-wellme-primary" />
                                  <span>{psychologist.services.join(" & ")}</span>
                                </div>
                              </div>
                              {/* Specialties */}
                              <div className="flex flex-wrap gap-2 mt-1">
                                {psychologist.specialties.map((specialty: string, sIdx: number) => (
                                  <span
                                    key={sIdx}
                                    className="text-xs font-semibold text-wellme-primary bg-wellme-100 px-2.5 py-1 rounded-full"
                                  >
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="w-full sm:w-auto self-end rounded-xl bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-white font-bold px-8 py-3 transition-all duration-300 shadow-sm cursor-pointer hover:scale-103 whitespace-nowrap"
                          >
                            Booking Sesi
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white-wellme rounded-3xl border border-grey-200">
                    <div className="text-3xl mb-3">🔍</div>
                    <h3 className="font-extrabold text-lg text-wellme-primary mb-1">Terapis Tidak Ditemukan</h3>
                    <p className="text-sm text-grey-400 font-semibold max-w-xs mx-auto">
                      Coba sesuaikan kata kunci pencarian atau bersihkan filter jadwal praktik.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filter Drawer Overlay */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-end lg:hidden backdrop-blur-sm">
            <div className="bg-white rounded-t-3xl w-full p-6 max-h-[85vh] overflow-y-auto animate-fade-in relative">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="absolute top-5 right-5 p-1 rounded-full text-grey-400 hover:bg-grey-100"
              >
                ×
              </button>
              <h3 className="font-extrabold text-lg text-wellme-primary mb-5">Filter Pencarian</h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-grey-400 uppercase">Hari Praktik</label>
                  <select
                    className="p-3 border border-grey-200 rounded-xl text-sm font-semibold w-full focus:outline-none"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                  >
                    <option value="">Semua Hari</option>
                    {daysList.map(d => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-grey-400 uppercase">Waktu Praktik</label>
                  <select
                    className="p-3 border border-grey-200 rounded-xl text-sm font-semibold w-full focus:outline-none"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option value="">Semua Waktu</option>
                    <option value="morning">Pagi (06:00 - 12:00)</option>
                    <option value="afternoon">Siang (12:01 - 18:00)</option>
                    <option value="evening">Malam (18:01 - 23:59)</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 rounded-xl bg-wellme-primary-gradient text-white font-bold transition-all shadow-md mt-4"
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
