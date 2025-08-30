"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "de" | "en"

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
      "CycloWatt is your affordable and simple to use powermeter. We use cutting edge technology to deliver precision to your cycling experience. Our powermeter is seamlessly integrated into the cleat: quick to set up and effortless to swap between bikes.",
    "hero.email.placeholder": "Enter your email",
    "hero.email.submit": "Get Early-Bird-Price for only 179 CHF",
    "hero.subtext.emailentry_1": "no commitment",
    "hero.subtext.emailentry_2": "only for notification",

    // Strengths Section
    "strengths.title": "Why CycloWatt",
    "strengths.lowPrice": "Affordable Power Measurment",
    "strengths.simpleSetup": "Simple Installation",
    "strengths.highAccuracy": "No Compromise on Accuracy",

    // Announcement Section
    "announcement.text": "Secure your early-bird access for 179 CHF!",

    // Features Section
    "features.title": "CYCLOWATT",
    "features.subtitle": "POWER IT UP",
    "features.description":
      "Our innovative power meter system integrates seamlessly with your cycling setup, providing cutting edge power measurement technology.",
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
      "CycloWatt connects seamlessly to your bike computer via Bluetooth. Easy to charge, it delivers up to X hours of battery life with connectivity you can rely on.",
    // CTA Section
    "cta.title": "Cycle with Precision",
    "cta.description":
      "Join the other cyclists who have already transformed their training with CycloWatt. Get started today and experience the difference precision makes.",
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
    "hero.title": "Sichere dir Revolutionäre Leistungsmessung für nur 178 CHF",
    "hero.subtitle":
      "CycloWatt ist dein erschwinglicher und unkomplizierter Powermeter. Nahtlos in die Schuhplatte integriert, in Sekunden installiert und mühelos zwischen Fahrrädern wechselbar. Bist du interessiert? Dann registrier dich. So können wir dich kontaktieren soblad der Leistungsmesser verfügbar ist und du erhällst den Early-Bird-Preis von 179 CHF.",
    "hero.email.placeholder": "E-Mail eingeben",
    "hero.email.submit": "Early-Bird-Preis von nur 179 CHF sichern.",
    "hero.subtext.emailentry_1": "Keine Kaufverpflichtung",
    "hero.subtext.emailentry_2": "Nur für die Benachrichtigung sobald verfügbar",

    // Strengths Section
    "strengths.title": "Wieso CycloWatt",
    "strengths.lowPrice": "Erschwingliche Leistungsmessung",
    "strengths.simpleSetup": "Einfach Installiert",
    "strengths.highAccuracy": "Kein Kompromiss bei der Genauigkeit",

    // Announcement Section
    "announcement.text":
      "Hol dir dein Early-Bird-Angebot für nur 179 CHF!",

    // Features Section
    "features.title": "CYCLOWATT",
    "features.subtitle": "POWER IT UP",
    "features.description":
      "Unser innovatives Powermeter-System fügt sich nahtlos in dein Setup ein und bietet modernste Leistungsmessungstechnologie.",
    "features.integration.tag": "INTEGRATION",
    "features.integration.title": "Nahtlose Integration",
    "features.integration.description":
      "Perfekt integriert: Der Powermeter lässt sich wie ein gewöhnliches Cleat befestigen und ist in Sekunden startklar, ganz ohne Einfluss auf deinen Pedaltritt.",
    "features.components.tag": "KOMPONENTEN",
    "features.components.title": "Präzisions-Komponenten",
    "features.components.description":
      "Jede Komponente ist so konstruiert, dass sie perfekt in unsere maßgeschneiderten Radsport-Cleats passt und maximale Genauigkeit und Haltbarkeit ermöglicht. Von fortschrittlichen Sensoren bis hin zu robusten Gehäusen arbeitet jedes Teil zusammen, um beste Leistung unter anspruchsvollsten Bedingungen zu liefern.",
    "features.technology.tag": "TECHNOLOGIE",
    "features.technology.title": "Verbunden über Bluetooth",
    "features.technology.description":
      "CycloWatt verbindet sich nahtlos über Bluetooth mit deinem Fahrradcomputer und speichert alle Daten in deiner bevorzugten App. Einfach aufzuladen, bietet es bis zu 10 Stunden Akkulaufzeit bei zuverlässiger Konnektivität.",

    // CTA Section
    "cta.title": "Fahre mit Präzision",
    "cta.description":
      "Schliess dich anderen Radfahrern an, die ihr Training bereits mit CycloWatt transformiert haben. Registrier dich um den Early-Bird-Preis zu sichern.",
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
