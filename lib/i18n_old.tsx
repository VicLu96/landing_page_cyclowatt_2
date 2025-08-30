"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "de"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguage] = useState<Language>("de")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "de")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when it changes
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>{children}</I18nContext.Provider>
}

// Translation data
const translations = {
  en: {
    // Header
    "header.reserve": "Reserve it",

    // Hero Section
    "hero.title": "Revolutionary Power Measurement for Cyclists",
    "hero.subtitle":
      "Experience precision like never before with our cutting-edge power meter technology designed specifically for cycling enthusiasts.",
    "hero.email.placeholder": "Enter your email",
    "hero.email.submit": "Get Early Access",
    "hero.subtext.emailentry_1": "no commitment",
    "hero.subtext.emailentry_2": "no Credit card",

    // Strengths Section
    "strengths.title": "WHY CHOOSE US",
    "strengths.lowPrice": "LOW PRICE",
    "strengths.simpleSetup": "Simple Set-Up",
    "strengths.highAccuracy": "HIGH ACCURACY",

    // Announcement Section
    "announcement.text": "Get the CycloWatt for only 150 CHF!",

    // Features Section
    "features.title": "CYCLOWATT",
    "features.subtitle": "POWER IT UP",
    "features.description":
      "Our innovative power meter system integrates seamlessly with your cycling setup, providing cutting edge power measurement technology at lowest price.",
    "features.integration.tag": "INTEGRATION",
    "features.integration.title": "Seamless Integration",
    "features.integration.description":
      "Perfect integration with cycling shoes. The power meter is attached within seconds as easy other cleat to the cycling shoe, providing simple system setup without affecting your natural pedaling motion.",
    "features.components.tag": "COMPONENTS",
    "features.components.title": "Precision Components",
    "features.components.description":
      "Every component is engineered to perfectly fit into our customized cycling cleats, allowing maximum accuracy and durability. From advanced sensors to robust housing, each part works together to deliver best performance in most demanding conditions.",
    "features.technology.tag": "TECHNOLOGY",
    "features.technology.title": "Advanced Electronics",
    "features.technology.description":
      "State-of-the-art electronics housed in a weatherproof design. Our proprietary algorithms ensure ±4% accuracy while maintaining long battery life and reliable connectivity.",

    // CTA Section
    "cta.title": "Power Up Your Energy Solutions",
    "cta.description":
      "Join thousands of cyclists who have already transformed their training with CycloWatt. Get started today and experience the difference precision makes.",
    "cta.button": "Start Your Journey",
  

    // Footer
    "footer.company": "Company",
    "footer.about": "About Us",
    "footer.careers": "Careers",
    "footer.contact": "Contact",
    "footer.product": "Product",
    "footer.features": "Features",
    "footer.pricing": "Pricing",
    "footer.support": "Support",
    "footer.resources": "Resources",
    "footer.blog": "Blog",
    "footer.documentation": "Documentation",
    "footer.help": "Help Center",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.cookies": "Cookie Policy",
    "footer.rights": "© 2025 CycloWatt. All rights reserved.",
  },
  de: {
    // Header
    "header.reserve": "Reservieren",

    // Hero Section
    "hero.title": "Revolutionäre Leistungsmessung für Radfahrer",
    "hero.subtitle":
      "Erleben Sie Präzision wie nie zuvor mit unserer hochmodernen Leistungsmesser-Technologie, die speziell für Radsport-Enthusiasten entwickelt wurde.",
    "hero.email.placeholder": "E-Mail eingeben",
    "hero.email.submit": "Frühen Zugang erhalten",
    "hero.subtext.emailentry_1": "Keine Verpflichtung",
    "hero.subtext.emailentry_2": "Nur für die Benachrichtigung",

    // Strengths Section
    "strengths.title": "WARUM DU UNS WÄHLST",
    "strengths.lowPrice": "NIEDRIGER PREIS",
    "strengths.simpleSetup": "EINFACH INSTALLIERT",
    "strengths.highAccuracy": "HOHE GENAUIGKEIT",

    // Announcement Section
    "announcement.text":
      "Der CycloWatt für nur für 150 CHF!",

    // Features Section
    "features.title": "CYCLOWATT",
    "features.subtitle": "POWER IT UP",
    "features.description":
      "Unser innovatives Leistungsmesser-System integriert sich nahtlos in Ihr Radsport-Setup und bietet modernste Leistungsmess-Technologie zum niedrigsten Preis.",
    "features.integration.tag": "INTEGRATION",
    "features.integration.title": "Nahtlose Integration",
    "features.integration.description":
      "Perfekte Integration mit Radsportschuhen. Der Leistungsmesser wird in Sekunden so einfach wie jeder andere Cleat am Radsportschuh befestigt und bietet ein einfaches System-Setup ohne Beeinträchtigung Ihrer natürlichen Tretbewegung.",
    "features.components.tag": "KOMPONENTEN",
    "features.components.title": "Präzisions-Komponenten",
    "features.components.description":
      "Jede Komponente ist so konstruiert, dass sie perfekt in unsere maßgeschneiderten Radsport-Cleats passt und maximale Genauigkeit und Haltbarkeit ermöglicht. Von fortschrittlichen Sensoren bis hin zu robusten Gehäusen arbeitet jedes Teil zusammen, um beste Leistung unter anspruchsvollsten Bedingungen zu liefern.",
    "features.technology.tag": "TECHNOLOGIE",
    "features.technology.title": "Fortschrittliche Elektronik",
    "features.technology.description":
      "Modernste Elektronik in einem wetterfesten Design. Unsere proprietären Algorithmen gewährleisten ±4% Genauigkeit bei gleichzeitig langer Batterielaufzeit und zuverlässiger Konnektivität.",

    // CTA Section
    "cta.title": "Stärken Sie Ihre Energie-Lösungen",
    "cta.description":
      "Schließen Sie sich Tausenden von Radfahrern an, die ihr Training bereits mit CycloWatt transformiert haben. Starten Sie heute und erleben Sie den Unterschied, den Präzision macht.",
    "cta.button": "Starten Sie Ihre Reise",

    // Footer
    "footer.company": "Unternehmen",
    "footer.about": "Über uns",
    "footer.careers": "Karriere",
    "footer.contact": "Kontakt",
    "footer.product": "Produkt",
    "footer.features": "Funktionen",
    "footer.pricing": "Preise",
    "footer.support": "Support",
    "footer.resources": "Ressourcen",
    "footer.blog": "Blog",
    "footer.documentation": "Dokumentation",
    "footer.help": "Hilfe-Center",
    "footer.legal": "Rechtliches",
    "footer.privacy": "Datenschutz",
    "footer.terms": "Nutzungsbedingungen",
    "footer.cookies": "Cookie-Richtlinie",
    "footer.rights": "© 2025 CycloWatt. Alle Rechte vorbehalten.",
  },
}
