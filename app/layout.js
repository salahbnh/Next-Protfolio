import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GeometricBackground from './components/hero/GeometricBackground';
import QuantumParticles from './components/hero/QuantumParticles';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Salah Bounouh – Professional Portfolio & Projects",
  description:
    "Welcome to the portfolio of Salah Bounouh. Explore my projects, skills, and professional journey in web development, AI, and technology.",
  openGraph: {
    title: "Salah Bounouh – Professional Portfolio & Projects",
    description:
      "Discover innovative projects and technology solutions by Salah Bounouh. Dive into my work in web development, AI, and more.",
    url: "https://salahbounouh.com", // replace with your custom domain
    siteName: "Salah Bounouh Portfolio",
    images: [
      {
        url: "https://salahbounouh.com/me.jpg",  // customize an image for social sharing
        width: 1200,
        height: 630,
        alt: "Salah Bounouh Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@my_twitter_handle", // if available
    title: "Salah Bounouh – Professional Portfolio & Projects",
    description:
      "Explore the portfolio of Salah Bounouh featuring innovative projects and a journey in web development and technology.",
    images: ["https://salahbounouh.com/me.jpg"],  // same image used above
  },
  alternates: {
    canonical: "https://salahbounouh.com",  // replace with your actual domain
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GeometricBackground/>
        <QuantumParticles/>
        {children}
      </body>
    </html>
  );
}
