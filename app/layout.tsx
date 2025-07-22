import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Frank Simbaña - Maestro de MMA y Taekwondo | Club Golden Taekwondo Loja",
  description:
    "Descubre el liderazgo de Frank Simbaña en Loja, Ecuador. Experticia en Taekwondo y MMA. Entrena con un maestro que impulsa el potencial humano y la excelencia deportiva.",
  keywords: "Frank Simbaña, MMA, Taekwondo, Loja, Ecuador, artes marciales, Club Golden Taekwondo",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
