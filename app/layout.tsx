import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { I18nProvider } from "@/lib/i18n"

const helvetica = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-helvetica",
})

export const metadata: Metadata = {
  title: "CycloWatt - Power It Up",
  description:
    "The ultimate energy management platform. Streamline your power solutions and boost efficiency with CycloWatt.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${helvetica.variable} antialiased`}>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
