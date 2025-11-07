"use client"

import { useState, useEffect } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { GalleryItemSkeleton } from "@/components/ui/loading-skeleton"

export function GallerySection() {
  const { ref, isVisible } = useScrollAnimation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const galleryItems = [
    {
      image: "/colorful-business-card-design.jpg",
      title: "Business Cards",
    },
    {
      image: "/promotional-tarpaulin-banner.jpg",
      title: "Tarpaulin Banners",
    },
    {
      image: "/custom-sticker-designs.jpg",
      title: "Custom Stickers",
    },
    {
      image: "/professional-brochure-layout.jpg",
      title: "Brochures",
    },
    {
      image: "/product-poster-design.jpg",
      title: "Posters",
    },
    {
      image: "/branded-promotional-items.jpg",
      title: "Souvenirs",
    },
  ]

  return (
    <section id="products" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">Our Gallery</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore samples of our finest printing work across various categories.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <GalleryItemSkeleton key={index} />
            ))
          ) : (
            galleryItems.map((item, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 h-80 hover:scale-105 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  animationDelay: `${index * 100}ms`
                }}
              >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h3 className="text-white text-xl font-bold">{item.title}</h3>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
