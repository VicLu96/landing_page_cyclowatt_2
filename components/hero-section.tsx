"use client"

import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useI18n } from "@/lib/i18n"

const heroMedia = [
  { type: "image", src: "/IMG_WEB_1.png" },
  { type: "image", src: "/IMG_WEB_2.png" },
  { type: "image", src: "/IMG_WEB_3.png" },
  { type: "video", src: "/MVI_1.MOV" },
  { type: "image", src: "/IMG_WEB_4.jpg" },
  { type: "image", src: "/IMG_WEB_5.png" },
]

export function HeroSection() {
  const { t } = useI18n()
  const [currentMedia, setCurrentMedia] = useState(0)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const pageLoadTime = useRef<number>(Date.now())

  useEffect(() => {
    pageLoadTime.current = Date.now()
  }, [])

  const nextMedia = () => {
    setCurrentMedia((prev) => (prev + 1) % heroMedia.length)
  }

  const prevMedia = () => {
    setCurrentMedia((prev) => (prev - 1 + heroMedia.length) % heroMedia.length)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    const timeSpentSeconds = Math.round((Date.now() - pageLoadTime.current) / 1000)

    console.log("[v0] Page load time:", new Date(pageLoadTime.current).toISOString())
    console.log("[v0] Current time:", new Date().toISOString())
    console.log("[v0] Time spent calculation:", Date.now() - pageLoadTime.current, "ms")
    console.log("[v0] Submitting email:", email, "with time spent:", timeSpentSeconds, "seconds")

    const payload = { email, timeSpentSeconds }
    console.log("[v0] Request payload:", JSON.stringify(payload))

    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      console.log("[v0] API response:", result)

      if (response.ok) {
        setSubmitMessage(`Thank you! Your email has been saved.`)
        setEmail("")
      } else {
        setSubmitMessage("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.log("[v0] Error submitting email:", error)
      setSubmitMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-5 lg:py-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg shadow-lg max-w-md mx-auto">
              {heroMedia[currentMedia]?.type === "video" ? (
                <video
                  src={heroMedia[currentMedia].src}
                  className="w-full h-[300px] object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={heroMedia[currentMedia]?.src || "/placeholder.svg"}
                  alt={`CycloWatt feature ${currentMedia + 1}`}
                  className="w-full h-[300px] object-cover"
                />
              )}
              <button
                onClick={prevMedia}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-primary-foreground p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextMedia}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-primary-foreground p-2 rounded-full transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {heroMedia.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMedia(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentMedia ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center lg:justify-start mb-6">
              <Image
                src="/logo_transparent_black.png"
                alt="CycloWatt Logo"
                width={120}
                height={120}
                className="h-18 w-auto"
              />
            </div>
                    <h1
              className="text-4xl font-bold tracking-tight font-sans sm:text-5xl lg:text-6xl"
              style={{ color: "#4a6b4a" }}
            >
              {t("hero.title")}
            </h1>
            <p className="text-lg leading-8 text-muted-foreground font-sans">{t("hero.subtitle")}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder={t("hero.email.placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 border-primary/20 focus:border-primary bg-white"
                  required
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-8 font-medium bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : t("hero.email.submit")}
                </Button>
              </div>
              {submitMessage && (
                <p className={`text-sm ${submitMessage.includes("Thank you") ? "text-green-600" : "text-red-600"}`}>
                  {submitMessage}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                {t("hero.subtext.emailentry_1")} • {t("hero.subtext.emailentry_2")}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
