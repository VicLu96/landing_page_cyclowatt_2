"use client"

import { useI18n } from "@/lib/i18n"

export function AnnouncementSection() {
  const { t } = useI18n()

  return (
    <section className="py-16" style={{ backgroundColor: "#2c3e2d" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white font-sans">{t("announcement.text")}</h2>
        </div>
      </div>
    </section>
  )
}
