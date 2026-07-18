import React from "react";

export default function StatsSection() {
  const stats = [
    {
      value: "1.500+",
      label: "Anak & keluarga didampingi menyelesaikan masalah emosional dan tumbuh kembang",
    },
    {
      value: "100%",
      label: "Pendekatan alami tanpa obat-obatan, aman, ramah anak, dan bersertifikasi",
    },
    {
      value: "98%",
      label: "Tingkat kepuasan orang tua terhadap perubahan perilaku & perkembangan positif anak",
    },
    {
      value: "Lumajang",
      label: "Klinik tumbuh kembang terpercaya berlokasi di Lumajang, Jawa Timur",
    },
  ];

  return (
    <section className="container mx-auto px-4 lg:px-10 -mt-10 mb-32 relative z-30">
      <div className="rounded-3xl bg-neutral-100/90 backdrop-blur-lg drop-shadow-xl p-8 border border-white/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-grey-200">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 lg:gap-3 text-center px-4 justify-center first:pt-0 pt-6 sm:pt-0"
            >
              <div className="text-wellme-secondary-gradient text-3xl lg:text-4xl font-extrabold tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs lg:text-sm text-grey-400 font-semibold leading-relaxed">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
