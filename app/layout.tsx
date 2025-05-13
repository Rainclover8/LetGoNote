import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import StructuredData from "@/components/structured-data"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LetGoNote — Yaz, Bırak, Rahatla",
  description:
    "Duygularını ifade et, serbest bırak ve kendini daha iyi hisset. LetGoNote ile olumsuz düşüncelerini yazarak bırakabilirsin.",
  keywords: ["duygusal rahatlama", "stres yönetimi", "dijital terapi", "meditasyon", "mindfulness", "duygu ifadesi"],
  authors: [{ name: "LetGoNote Team" }],
  creator: "LetGoNote",
  publisher: "LetGoNote",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://letgonote.com",
    title: "LetGoNote — Yaz, Bırak, Rahatla",
    description: "Duygularını ifade et, serbest bırak ve kendini daha iyi hisset.",
    siteName: "LetGoNote",
    images: [
      {
        url: "/images/background.png",
        width: 1200,
        height: 630,
        alt: "LetGoNote - Duygusal rahatlama platformu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LetGoNote — Yaz, Bırak, Rahatla",
    description: "Duygularını ifade et, serbest bırak ve kendini daha iyi hisset.",
    images: ["/images/background.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/images/background.png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/background.png" />
        <StructuredData />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
