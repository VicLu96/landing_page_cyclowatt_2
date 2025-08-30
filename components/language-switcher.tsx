"use client"

import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en")
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 font-medium bg-transparent"
    >
      <Globe className="h-4 w-4" />
      {language === "en" ? "DE" : "EN"}
    </Button>
  )
}
