import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elos-recovery-ai-frontend.vercel.app"),

  title: "ELOS Consultoria e Gestão Financeira Hospitalar",

  description:
    "Inteligência financeira para hospitais e clínicas. Recuperação de receitas orientada por dados.",

  openGraph: {
    title: "ELOS Consultoria e Gestão Financeira Hospitalar",
    description:
      "Plataforma de análise de glosas hospitalares, geração de recursos administrativos e recuperação de receitas orientada por dados.",
    url: "https://elos-recovery-ai-frontend.vercel.app",
    siteName: "ELOS Consultoria e Gestão Financeira Hospitalar",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ELOS Consultoria e Gestão Financeira Hospitalar",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ELOS Consultoria e Gestão Financeira Hospitalar",
    description:
      "Plataforma de análise de glosas hospitalares, geração de recursos administrativos e recuperação de receitas orientada por dados.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/brand/banner-elos.png",
    shortcut: "/brand/banner-elos.png",
    apple: "/brand/banner-elos.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}