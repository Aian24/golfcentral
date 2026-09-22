import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a1f18",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://golfcentralmag.com"),
  title: "Golf Central Magazine | The Luxury Digital Golf Publication",
  description: "Celebrating 27 volumes of premier golf journalism in Florida and the Southeast. Featuring championship course architecture, turfgrass agronomy, luxury golf resorts, lifestyle, and military veteran honors.",
  keywords: [
    "Golf Central Magazine",
    "Florida Golf",
    "Golf Architecture",
    "GCSAA",
    "Golf Course Superintendents",
    "Luxury Golf Resorts",
    "Plantation Bay",
    "Hammock Beach",
    "Baha Mar Golf",
    "Golf Philanthropy",
    "Terrie Purdum"
  ],
  authors: [{ name: "Terrie Purdum", url: "https://golfcentralmag.com" }],
  creator: "Golf Central Magazine",
  publisher: "Golf Central Magazine",
  openGraph: {
    title: "Golf Central Magazine | Volume 27",
    description: "The authoritative digital voice of golf in Florida and the Southeast. Read Volume 27 Issue 6, architecture dispatches, and luxury resort guides.",
    url: "https://golfcentralmag.com",
    siteName: "Golf Central Magazine",
    images: [
      {
        url: "/images/hero_golf_championship.jpg",
        width: 1920,
        height: 1080,
        alt: "Golf Central Magazine Cover Feature",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Golf Central Magazine | Volume 27",
    description: "The authoritative digital voice of golf in Florida and the Southeast.",
    images: ["/images/hero_golf_championship.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${jakarta.variable} ${jetbrains.variable} scroll-smooth antialiased selection:bg-[#C5A059] selection:text-white`}
    >
      <body className="min-h-screen bg-[#FBF9F5] text-[#121619] font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
