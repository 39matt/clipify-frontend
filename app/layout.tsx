import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import siteConfig from "@/components/data/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});


export const metadata: Metadata = siteConfig.seo

export default function RootLayout({ children }: any) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
        >
        <body
            className="min-h-full flex flex-col bg-white"
            style={{
                backgroundImage:
                    'radial-gradient(rgba(0, 0, 0, 0.1) 2px, transparent 2px)',
                backgroundSize: '22px 22px',
                backgroundAttachment: 'fixed',
            }}
        >
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}