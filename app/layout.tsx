import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { HeroCarousel } from "@/components/HeroCarousel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunny Blog App 2.0",
  description: "A modern blog application built with Next.js 14, TypeScript, and Tailwind CSS.",
  openGraph: {
    title: "Sunny Blog App 2.0",
    description: "A modern blog application built with Next.js 14, TypeScript, and Tailwind CSS.",
    url: "https://sunny-blog-app.vercel.app",
    siteName: "Sunny Blog App",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sunny Blog App Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
