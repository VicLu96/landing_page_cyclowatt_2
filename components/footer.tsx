"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin, Mail, Instagram } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t" style={{ backgroundColor: "#2c3e2d" }}>
      <div className="container py-12 lg:py-10 px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo_transparent.png"
                alt="CycloWatt Logo"
                width={120}
                height={120}
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold font-sans text-white">CycloWatt</span>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Link>
              {/*
              <Link href="victor.luder@cyclowatt.ch" className="text-gray-300 hover:text-white">
                <Mail className="h-5 w-5" />
              </Link>
            */}
            </div>
          </div>
                
        </div>

      </div>
       <div className="py-12 ">
      <div className="mt-0 w-full border-t border-gray-600 pt-8 flex justify-center">
          <p className="text-center text-sm text-gray-300 font-sans">
          {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
