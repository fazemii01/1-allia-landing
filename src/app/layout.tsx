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
  title: "Allia Kids - Klinik Tumbuh Kembang & Hipnoterapi Anak Terpercaya",
  description: "Layanan tumbuh kembang anak terpercaya di Indonesia: hipnoterapi anak, terapi wicara, terapi perilaku, dan skrining tumbuh kembang profesional.",
  icons: {
    icon: "/favicon.ico",
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
