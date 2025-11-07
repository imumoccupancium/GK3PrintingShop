"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const carouselImages = [
  {
    id: 1,
    src: "/business-cards-printing-samples.jpg",
    alt: "Business Cards Collection",
  },
  {
    id: 2,
    src: "/colorful-brochures-and-flyers.jpg",
    alt: "Brochures and Flyers",
  },
  {
    id: 3,
    src: "/tarpaulin-printing-design.jpg",
    alt: "Tarpaulin Printing",
  },
  {
    id: 4,
    src: "/sticker-labels-and-decals.jpg",
    alt: "Sticker Labels",
  },
  {
    id: 5,
    src: "/printed-souvenirs-and-gifts.jpg",
    alt: "Souvenirs and Gifts",
  },
]

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    setAutoplay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
    setAutoplay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setAutoplay(false)
  }

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-slate-900">
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {carouselImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/30 hover:bg-white/50 text-white rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} md={32} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/30 hover:bg-white/50 text-white rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={24} md={32} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide ? "w-8 h-3 bg-white" : "w-3 h-3 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-6 right-6 z-20 px-4 py-2 bg-white/20 text-white rounded-full font-semibold backdrop-blur-sm">
        {currentSlide + 1} / {carouselImages.length}
      </div>
    </section>
  )
}
