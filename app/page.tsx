"use client"

import { Header } from "@/components/header"
import { Carousel } from "@/components/carousel"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-white">
      <Header />
      <Carousel />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  )
}
