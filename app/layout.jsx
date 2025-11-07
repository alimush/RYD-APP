import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import HeaderWrapper from "../components/Header";

// 🔹 Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🔹 Metadata (optional)
export const metadata = {
  title: "RYD Portal",
  description: "SPC Dashboard",
};

// 🔹 Root Layout (بدون TS)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${poppins.className} 
          antialiased 
          bg-white 
          text-gray-900
        `}
      >
        {/* ✅ Header */}
        <HeaderWrapper />

        {/* ✅ Page Content */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}