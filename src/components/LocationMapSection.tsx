import React from "react";

export default function LocationMapSection() {
  return (
    <section className="bg-neutral-50/70 py-16 lg:py-20 border-t border-b border-grey-150">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="text-center mb-10">
          <span className="bg-wellme-primary/10 text-wellme-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Lokasi & Peta Klinik
          </span>
          <h2 className="text-2xl lg:text-4xl font-extrabold text-wellme-primary leading-tight">
            Kunjungi Klinik <span className="text-wellme-secondary-gradient">Allia Kids</span>
          </h2>
          <p className="text-xs lg:text-sm text-grey-450 font-semibold max-w-2xl mx-auto mt-2 leading-relaxed">
            Perum Adara Park 2, Blok D17, Karanganyar, Kabuaran, Kec. Kunir, Kabupaten Lumajang, Jawa Timur 67383
          </p>
        </div>

        <div className="max-w-5xl mx-auto border border-grey-200 rounded-3xl overflow-hidden shadow-sm h-[380px] lg:h-[450px] bg-white">
          <iframe
            title="Peta Lokasi Allia Kids Lumajang"
            src="https://maps.google.com/maps?q=Perumahan%20Adara%20Park%202%20Lumajang&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
