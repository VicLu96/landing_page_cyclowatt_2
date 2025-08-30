"use client" // Added use client directive to make this a client component for useI18n hook

import { DollarSign, Settings, Target } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const strengths = [
  {
    icon: DollarSign,
    titleKey: "strengths.lowPrice", // Updated translation key to match i18n definitions
  },
  {
    icon: Settings,
    titleKey: "strengths.simpleSetup", // Updated translation key to match i18n definitions
  },
  {
    icon: Target,
    titleKey: "strengths.highAccuracy", // Updated translation key to match i18n definitions
  },
]

export function StrengthsSection() {
  const { t } = useI18n()

  return (
    <section className="py-16" style={{ backgroundColor: "#2c3e2d" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-center mb-12 text-white font-[family-name:var(--font-work-sans)]">
          {t("strengths.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strengths.map((strength, index) => (
            <div key={index} className="text-center space-y-6 p-8 rounded-2xl" style={{ backgroundColor: "#f0ebe1" }}>
              <div className="flex justify-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: "#4a6b4a" }}
                >
                  <strength.icon size={32} />
                </div>
              </div>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-work-sans)]" style={{ color: "#2c3e2d" }}>
                {t(strength.titleKey)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
