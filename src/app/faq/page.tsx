import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FAQPage() {
  const faqs = [
    {
      q: "Hambatan apa saja yang bisa ditangani di Allia Kids?",
      a: "Allia Kids menangani berbagai hambatan tumbuh kembang dan emosional anak seperti speech delay (keterlambatan wicara), hiperaktivitas, gangguan fokus (ADHD/ADD), tantrum berlebih, kecemasan, fobia makanan (fobia nasi/GTM), trauma masa kecil, serta kecanduan gawai (gadget)."
    },
    {
      q: "Metode terapi apa saja yang tersedia?",
      a: "Kami menyediakan Terapi Wicara, Terapi Perilaku (Behavior Therapy), Skrining Tumbuh Kembang, Hipnoterapi Anak berbasis klinis ilmiah (ramah anak), dan Analisis Bakat bawaan melalui metode Sidik Jari (Fingertip Analysis)."
    },
    {
      q: "Apakah hipnoterapi anak aman dilakukan?",
      a: "Sangat aman. Hipnoterapi anak di Allia Kids dilakukan oleh praktisi berpengalaman dan bersertifikat dengan pendekatan ramah anak. Anak dipandu masuk ke kondisi relaksasi menyenangkan tanpa paksaan untuk menanamkan sugesti positif yang membantu mengatasi hambatan mental mereka."
    },
    {
      q: "Bagaimana cara memesan (booking) sesi di Allia Kids?",
      a: "Anda dapat memesan sesi pendaftaran secara online melalui menu 'Booking Sesi' di landing page kami, mengisi formulir singkat tentang data anak, lalu mengonfirmasi pendaftaran melalui WhatsApp Admin untuk penyesuaian jadwal praktisi."
    },
    {
      q: "Apakah layanan konsultasi tumbuh kembang bisa dilakukan secara online?",
      a: "Ya, untuk beberapa layanan seperti konseling orang tua dan hipnoterapi konsultasi awal, kami menyediakan pilihan sesi Online (Video Call). Sedangkan untuk terapi fisik terpadu seperti wicara dan perilaku, sangat direkomendasikan melakukan sesi secara Offline."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        {/* Hero Section */}
        <section className="bg-wellme-100/30 py-16 lg:py-20 border-b border-grey-150">
          <div className="container mx-auto px-4 lg:px-10 text-center flex flex-col items-center">
            <span className="bg-wellme-primary/10 text-wellme-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Pusat Bantuan & Tanya Jawab
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-wellme-primary-gradient mb-6 max-w-2xl leading-tight">
              Pertanyaan Umum <span className="text-wellme-secondary-gradient">(FAQ)</span>
            </h1>
            <p className="text-sm lg:text-base text-grey-450 font-semibold max-w-xl leading-relaxed">
              Temukan jawaban cepat atas pertanyaan yang sering diajukan mengenai program terapis dan hipnoterapi anak Allia Kids.
            </p>
          </div>
        </section>

        {/* FAQs List */}
        <section className="container mx-auto px-4 lg:px-10 py-16">
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-grey-200 rounded-2xl p-6 lg:p-8 bg-white shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <h3 className="font-extrabold text-base text-wellme-primary flex items-start gap-3">
                  <span className="bg-wellme-primary/10 text-wellme-primary w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5">Q</span>
                  {faq.q}
                </h3>
                <div className="flex items-start gap-3 text-grey-450 text-xs sm:text-sm leading-relaxed font-semibold">
                  <span className="bg-wellme-secondary/10 text-wellme-secondary w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5">A</span>
                  <p className="flex-1 mt-0.5">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
