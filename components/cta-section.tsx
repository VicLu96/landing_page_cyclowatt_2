"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useI18n } from "@/lib/i18n"

export function CTASection() {
  const { t } = useI18n()

  const scrollToEmail = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('[data-section="features"]')
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="bg-gradient-to-r from-primary to-secondary py-5 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo_transparent.png"
              alt="CycloWatt Logo"
              width={100}
              height={100}
              className="h-25 w-auto"
            />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground font-sans sm:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-primary-foreground/90 font-sans">{t("cta.description")}</p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-medium" onClick={scrollToEmail}>
              {t("cta.button")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base font-medium border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              onClick={scrollToFeatures}
            >
              Learn More
            </Button>
          </div>
          <div className="mt-8 text-sm text-primary-foreground/80">
           {t("hero.subtext.emailentry_1")} • {t("hero.subtext.emailentry_2")}
          </div>
        </div>
      </div>
    </section>
  )
}
