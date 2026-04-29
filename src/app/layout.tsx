import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "English Oral Exam — Practice space",
  description:
    "Interactive practice for an English oral exam. 17 Q&A on Public Intelligence and UN Resilience. Read aloud, hide answers, listen to pronunciation.",
  applicationName: "Eng Exam App",
  keywords: [
    "english",
    "oral exam",
    "public intelligence",
    "UN resilience",
    "study tool",
    "PUBINT",
  ],
  openGraph: {
    title: "English Oral Exam — Practice space",
    description:
      "Read aloud, // speak with confidence. /// 17 questions, pronunciation playback, focus mode.",
    type: "website",
    locale: "en_US",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Eng Exam",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Mesh + floating orbs background, fixed behind content */}
        <div aria-hidden className="mesh-bg" />
        <div aria-hidden className="orb orb-1" />
        <div aria-hidden className="orb orb-2" />
        <div aria-hidden className="orb orb-3" />
        {children}
      </body>
    </html>
  );
}
