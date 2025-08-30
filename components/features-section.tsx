"use client"

import { useI18n } from "@/lib/i18n"

const features = [
  {
    titleKey: "features.integration.title",
    descriptionKey: "features.integration.description",
    image: "/IMG_WEB_4.jpg",
    imageAlt: "Cycling shoe with integrated power meter",
    tagKey: "features.integration.tag",
  },
  {
    titleKey: "features.components.title",
    descriptionKey: "features.components.description",
    image: "/IMG_WEB_7.png",
    imageAlt: "Precision cycling components breakdown",
    tagKey: "features.components.tag",
  },
  {
    titleKey: "features.technology.title",
    descriptionKey: "features.technology.description",
    image: "/IMG_WEB_8.png",
    imageAlt: "Advanced electronic components",
    tagKey: "features.technology.tag",
  },
]

export function FeaturesSection() {
  const { t } = useI18n()

  return (
    <section className="py-5 lg:py-12 px-4 sm:px-6 lg:px-8 bg-[#f0ebe1]" data-section="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold font-sans text-[#2c3e2d] mb-6">
            {t("features.title")}
            <br />
            <span className="text-[#4a6b4a]">{t("features.subtitle")}</span>
          </h2>
          <p className="text-lg text-[#2c3e2d] font-sans max-w-3xl mx-auto leading-relaxed">
            {t("features.description")}
          </p>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="inline-block">
                  <span className="bg-[#4a6b4a] text-white px-3 py-1 rounded-full text-sm font-medium font-sans">
                    {t(feature.tagKey)}
                  </span>
                </div>
                <h3 className="text-3xl font-bold font-sans text-[#2c3e2d]">{t(feature.titleKey)}</h3>
                <p className="text-lg text-[#2c3e2d] font-sans leading-relaxed">{t(feature.descriptionKey)}</p>
              </div>

              <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className="max-w-lg mx-auto">
                  <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.imageAlt}
                      className="w-full h-[300px] object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
