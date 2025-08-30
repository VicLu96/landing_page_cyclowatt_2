"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useI18n } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Header() {
  const { t } = useI18n()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:h-16 py-4 md:py-0 gap-4 md:gap-0">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Image
              src="/logo_transparent_black.png"
              alt="CycloWatt Logo"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <span className="text-xl font-bold font-sans">CycloWatt</span>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-4">
            <LanguageSwitcher />
            <Button onClick={scrollToTop} className="font-medium">
              {t("header.reserve")}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
