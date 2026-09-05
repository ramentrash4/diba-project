import { Caveat, Courier_Prime, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const handwriting = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const typewriter = Courier_Prime({
  variable: "--font-typewriter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: "The Scrapbook of Us — Untuk Askiyaa (Pilkom 25)",
  description: "A living interactive digital scrapbook and farewell gift from Tatwa to Adiba.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${handwriting.variable} ${typewriter.variable} ${sans.variable}`}>
      <body className="antialiased bg-[#FAF7F2] text-[#2C2621] selection:bg-[#E8B4B8] selection:text-white font-sans min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
