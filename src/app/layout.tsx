import type { Metadata } from "next";
import { Montserrat, Pacifico } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://alliakids.com"),
  title: "Allia Kids - Klinik Tumbuh Kembang & Hipnoterapi Anak Terpercaya",
  description: "Layanan tumbuh kembang anak terpercaya di Indonesia: hipnoterapi anak, terapi wicara, terapi perilaku, dan skrining tumbuh kembang profesional.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Allia Kids - Klinik Tumbuh Kembang & Hipnoterapi Anak Terpercaya",
    description: "Layanan tumbuh kembang anak terpercaya di Indonesia: hipnoterapi anak, terapi wicara, terapi perilaku, dan skrining tumbuh kembang profesional.",
    images: [
      {
        url: "/assets/alliakids-logo(3).png",
        alt: "Allia Kids Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allia Kids - Klinik Tumbuh Kembang & Hipnoterapi Anak Terpercaya",
    description: "Layanan tumbuh kembang anak terpercaya di Indonesia: hipnoterapi anak, terapi wicara, terapi perilaku, dan skrining tumbuh kembang profesional.",
    images: ["/assets/alliakids-logo(3).png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${montserrat.variable} ${pacifico.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
