import React from "react";
import Link from "next/link";

export default function Footer() {
  const links = [
    {
      title: "Layanan",
      items: [
        { label: "Hipnoterapi Anak & Dewasa", href: "/layanan/hipnoterapi-anak" },
        { label: "Terapi Wicara", href: "/layanan/terapi-wicara" },
        { label: "Terapi Perilaku", href: "/layanan/terapi-perilaku" },
        { label: "Skrining Tumbuh Kembang", href: "/layanan/tumbuh-kembang" },
        { label: "Analisis Sidik Jari Bakat", href: "/layanan/sidik-jari-bakat" },
        { label: "Bimbel Jari Matik Magic", href: "/layanan/jari-matik-magic" },
        { label: "Tes Psikologi", href: "/tespsikologi" },
      ],
    },
    {
      title: "Perusahaan",
      items: [
        { label: "Tentang Kami", href: "/about" },
        { label: "Kolaborasi", href: "/partnership" },
      ],
    },
    {
      title: "Dukungan",
      items: [
        { label: "Hubungi Kami", href: "/contact" },
        { label: "FAQ", href: "/faq" },
        { label: "Syarat & Ketentuan", href: "/terms" },
        { label: "Kebijakan Privasi", href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-wellme-800 text-white pt-16 pb-8 border-t border-wellme-800">
      <div className="container mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="w-fit">
              <span className="font-cursive text-2xl text-white select-none">Allia Kids</span>
            </Link>
            <p className="text-sm text-grey-200 font-semibold leading-relaxed max-w-sm">
              Allia Kids adalah pusat layanan tumbuh kembang dan hipnoterapi anak terpercaya yang menyediakan pendampingan profesional untuk membantu anak mengatasi berbagai tantangan emosional, perilaku, dan perkembangan secara ramah anak.
            </p>
            <div className="text-sm font-semibold text-grey-300">
              <div className="mb-1">Email: <span className="text-white">halo@alliakids.com</span></div>
              <div className="mb-1">WhatsApp: <span className="text-white">+62 851-3851-1348</span></div>
              <div className="leading-relaxed">
                Alamat: <span className="text-white font-normal text-xs block mt-1">Perum Adara Park 2, Blok D17, Karanganyar, Kabuaran, Kec. Kunir, Kabupaten Lumajang, Jawa Timur 67383</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {links.map((column, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-wellme-secondary">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-2 text-sm text-grey-200 font-semibold">
                {column.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      href={item.href}
                      className="hover:text-wellme-secondary transition-colors duration-250"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-wellme-primary my-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-grey-300">
          <div>
            &copy; {new Date().getFullYear()} Allia Kids. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/alliakids" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
