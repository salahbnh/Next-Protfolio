import { Orbitron, Space_Grotesk, Rajdhani } from "next/font/google";
import "./globals.css";
import QuantumCursor from './components/cursor/QuantumCursor';
import ScrollProgressBar from './components/ui/ScrollProgressBar';

const orbitron = Orbitron({ variable: "--font-orbitron", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space", subsets: ["latin"], display: "swap" });
const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Salah Bounouh – Professional Portfolio & Projects",
  description:
    "Welcome to the portfolio of Salah Bounouh. Explore my projects, skills, and professional journey in web development, AI, and technology.",
  openGraph: {
    title: "Salah Bounouh – Professional Portfolio & Projects",
    description:
      "Discover innovative projects and technology solutions by Salah Bounouh. Dive into my work in web development, AI, and more.",
    url: "https://salahbounouh.com",
    siteName: "Salah Bounouh Portfolio",
    images: [
      {
        url: "https://salahbounouh.com/me.jpg",
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
    site: "@my_twitter_handle",
    title: "Salah Bounouh – Professional Portfolio & Projects",
    description:
      "Explore the portfolio of Salah Bounouh featuring innovative projects and a journey in web development and technology.",
    images: ["https://salahbounouh.com/me.jpg"],
  },
  alternates: {
    canonical: "https://salahbounouh.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${spaceGrotesk.variable} ${rajdhani.variable} antialiased cursor-none`}
      >
        <QuantumCursor />
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  );
}
