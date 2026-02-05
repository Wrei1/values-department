import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Values Department | Government Marriage & Family Counseling Services",
    template: "%s | Values Department"
  },
  description:
    "Official government Values Department providing marriage counseling, wedding services, and community support. Strengthening families and communities through expert guidance.",
  keywords: [
    "values department",
    "government counseling",
    "marriage counseling",
    "wedding services",
    "civil wedding",
    "private wedding",
    "house blessing",
    "prayer for the sick",
    "necrological service",
    "family services",
    "relationship counseling",
    "government family support",
    "marriage services",
    "family counseling",
    "couples counseling"
  ],
  authors: [{ name: "Values Department" }],
  creator: "Values Department",
  publisher: "Values Department",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Values Department",
    title: "Values Department | Government Marriage & Family Counseling Services",
    description: "Official government Values Department providing marriage counseling, wedding services, and community support.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Values Department - Government Family Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Values Department | Government Marriage & Family Counseling Services",
    description: "Professional marriage counseling, wedding services, and community support.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main id="main-content" className="flex-grow" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
