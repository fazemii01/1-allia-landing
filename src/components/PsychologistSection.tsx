"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChatIcon, CalendarIcon } from "./icons";
import { therapistApi } from "@/lib/api";

export default function PsychologistSection() {
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
          }));
          setDbPsychologists(mapped.slice(0, 3));
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
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Riska",
      services: ["Online", "Offline"],
    },
    {
      name: "Budi Satria, S.Tr.T.W.",
      type: "Terapis Wicara & Wicara Anak",
      rating: "5.0",
      reviews: "210+",
      specialties: ["Speech Delay", "Kesulitan Artikulasi", "Gagap Berbicara"],
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Budi",
      services: ["Offline"],
    },
    {
      name: "Siti Rahma, S.Psi.",
      type: "Terapis Perilaku & Anak Berkebutuhan Khusus",
      rating: "4.9",
      reviews: "185+",
      specialties: ["Fokus & ADHD/ADD", "Modifikasi Perilaku", "Sosialisasi Anak"],
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Siti",
      services: ["Online", "Offline"],
    },
  ];

  const psychologists = hasLoaded ? dbPsychologists : staticPsychologists;

  if (hasLoaded && psychologists.length === 0) {
    return null; // Hide the section if therapists are intentionally cleared from backend
  }

  return (
    <section className="container mx-auto px-4 lg:px-10 mb-32">
      <div className="text-center mb-10">
        <h2 className="text-wellme-primary-gradient text-3xl lg:text-4xl font-extrabold mb-4">
          <span className="text-wellme-secondary-gradient">Apapun hambatan si kecil,</span>
          <br className="hidden lg:block" /> praktisi Allia Kids siap membantu!
        </h2>
        <p className="text-sm lg:text-base text-grey-400 font-semibold max-w-2xl mx-auto leading-relaxed">
          Pilih terapis wicara, terapis perilaku, atau psikolog klinis anak berpengalaman
          <br className="hidden lg:block" /> yang sesuai dengan kebutuhan tumbuh kembang buah hati Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {psychologists.map((psychologist, index) => (
          <div
            key={index}
            className="rounded-2xl border border-grey-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Header profile info */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-wellme-100 bg-grey-100">
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={psychologist.avatar}
                    onError={(e) => {
                      // Fallback if googleapis storage placeholder fails
                      e.currentTarget.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${psychologist.name}`;
                    }}
                    alt={psychologist.name}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <h3 className="font-bold text-lg text-wellme-primary group-hover:text-wellme-secondary transition-colors duration-200">
                    {psychologist.name}
                  </h3>
                  <div className="text-xs text-grey-400 font-semibold bg-white-wellme py-1 px-2.5 rounded-full w-fit">
                    {psychologist.type}
                  </div>
                </div>
              </div>

              {/* Service details */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-xs font-semibold text-grey-400">
                <div className="flex items-center gap-1.5">
                  <span className="text-yellow-primary">★</span>
                  <span>
                    {psychologist.rating} ({psychologist.reviews} review)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ChatIcon size={14} className="text-wellme-primary" />
                  <span>{psychologist.services.join(" & ")}</span>
                </div>
              </div>

              <hr className="border-grey-150 my-4" />

              {/* Specialties */}
              <div className="mb-6">
                <h4 className="text-xs text-grey-400 font-bold mb-2 uppercase tracking-wider">
                  Keahlian Utama:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {psychologist.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold text-wellme-primary bg-wellme-100 px-3 py-1.5 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action button */}
            <Link
              href="/apply"
              className="w-full text-center rounded-xl bg-wellme-secondary-gradient hover:bg-wellme-primary-gradient text-white font-semibold py-3 transition-all duration-300 shadow-sm"
            >
              Booking Sesi
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
