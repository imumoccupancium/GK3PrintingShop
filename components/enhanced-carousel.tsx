"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Play, Pause } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface CarouselSlide {
  id: number
  src: string
  alt: string
  title: string
  description: string
  category: string
  ctaText?: string
  ctaLink?: string
}

const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    src: "/business-cards-printing-samples.jpg",
    alt: "Business Cards Collection",
    title: "Professional Business Cards",
    description: "Create a lasting first impression with our premium business card printing services. High-quality materials and stunning designs.",
    category: "Business Printing",
    ctaText: "View Designs",
    ctaLink: "#services"
  },
  {
    id: 2,
    src: "/colorful-brochures-and-flyers.jpg",
    alt: "Brochures and Flyers",
    title: "Eye-Catching Marketing Materials",
    description: "Promote your business with vibrant brochures and flyers. Perfect for marketing campaigns and promotional events.",
    category: "Marketing Materials",
    ctaText: "Get Quote",
    ctaLink: "#contact"
  },
  {
    id: 3,
    src: "/tarpaulin-printing-design.jpg",
    alt: "Tarpaulin Printing",
    title: "Large Format Printing",
    description: "Make a big statement with our durable tarpaulin banners. Weather-resistant and perfect for outdoor advertising.",
    category: "Signage & Banners",
    ctaText: "Learn More",
    ctaLink: "#gallery"
  },
  {
    id: 4,
    src: "/sticker-labels-and-decals.jpg",
    alt: "Sticker Labels",
    title: "Custom Stickers & Labels",
    description: "Personalize your products with our high-quality stickers and labels. Available in various shapes, sizes, and finishes.",
    category: "Custom Products",
    ctaText: "Order Now",
    ctaLink: "#services"
  },
  {
    id: 5,
    src: "/printed-souvenirs-and-gifts.jpg",
    alt: "Souvenirs and Gifts",
    title: "Memorable Souvenirs & Gifts",
    description: "Create lasting memories with our custom printed souvenirs and gifts. Perfect for events and special occasions.",
    category: "Gifts & Souvenirs",
    ctaText: "Explore Options",
    ctaLink: "#gallery"
  },
]

export function EnhancedCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  const AUTOPLAY_DELAY = 5000

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
      setProgress(0)
    })
  }, [api])

  // Auto-play functionality
  useEffect(() => {
    if (!api || !isPlaying) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, AUTOPLAY_DELAY)

    return () => clearInterval(interval)
  }, [api, isPlaying])

  // Progress bar animation
  useEffect(() => {
    if (!isPlaying) return

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0
        }
        return prev + (100 / (AUTOPLAY_DELAY / 100))
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [isPlaying, current])

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  const goToSlide = useCallback((index: number) => {
    api?.scrollTo(index)
    setProgress(0)
  }, [api])

  // Pause on hover
  const handleMouseEnter = () => setIsPlaying(false)
  const handleMouseLeave = () => setIsPlaying(true)

  return (
    <section className="relative w-full h-[500px] md:h-[700px] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Main Carousel */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CarouselContent className="h-full -ml-0">
          {carouselSlides.map((slide) => (
            <CarouselItem key={slide.id} className="relative h-full pl-0">
              <Card className="h-full border-0 rounded-none shadow-none">
                <CardContent className="relative h-full p-0 overflow-hidden">
                  {/* Background Image */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover transition-transform duration-[7s] ease-out hover:scale-105"
                      priority={slide.id <= 2}
                      sizes="100vw"
                      quality={85}
                    />
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-center justify-start z-10">
                    <div className="max-w-2xl px-6 md:px-12 lg:px-16 space-y-6">
                      {/* Category Badge */}
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "bg-white/10 text-white border-white/30 backdrop-blur-md",
                          "hover:bg-white/20 transition-colors duration-300"
                        )}
                      >
                        {slide.category}
                      </Badge>

                      {/* Title */}
                      <h2 className={cn(
                        "text-3xl md:text-5xl lg:text-6xl font-bold text-white",
                        "leading-tight tracking-tight"
                      )}>
                        {slide.title}
                      </h2>

                      {/* Description */}
                      <p className={cn(
                        "text-lg md:text-xl text-white/90 max-w-lg",
                        "leading-relaxed font-medium"
                      )}>
                        {slide.description}
                      </p>

                      {/* CTA Button */}
                      {slide.ctaText && slide.ctaLink && (
                        <Button 
                          size="lg"
                          className={cn(
                            "bg-white text-slate-900 hover:bg-white/90",
                            "font-semibold px-8 py-6 text-lg group",
                            "transition-all duration-300 hover:scale-105",
                            "shadow-lg hover:shadow-xl"
                          )}
                          asChild
                        >
                          <a href={slide.ctaLink}>
                            {slide.ctaText}
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className={cn(
          "absolute left-4 md:left-6 top-1/2 -translate-y-1/2",
          "bg-white/20 border-white/30 text-white hover:bg-white/30",
          "backdrop-blur-sm size-12 transition-all duration-300",
          "hover:scale-110 disabled:opacity-50"
        )} />
        <CarouselNext className={cn(
          "absolute right-4 md:right-6 top-1/2 -translate-y-1/2", 
          "bg-white/20 border-white/30 text-white hover:bg-white/30",
          "backdrop-blur-sm size-12 transition-all duration-300",
          "hover:scale-110 disabled:opacity-50"
        )} />
      </Carousel>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <Progress 
          value={progress} 
          className="h-1 bg-white/20 [&>div]:bg-white [&>div]:transition-all [&>div]:duration-100"
        />
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4">
        {/* Play/Pause Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlayPause}
          className={cn(
            "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm",
            "transition-all duration-300 hover:scale-105"
          )}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span className="sr-only">
            {isPlaying ? 'Pause carousel' : 'Play carousel'}
          </span>
        </Button>

        {/* Slide Indicators */}
        <div className="flex gap-2" role="tablist" aria-label="Carousel navigation">
          {carouselSlides.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => goToSlide(index)}
              className={cn(
                "p-0 transition-all duration-300 rounded-full border-0 hover:scale-110",
                index === current - 1
                  ? "w-8 h-3 bg-white"
                  : "w-3 h-3 bg-white/50 hover:bg-white/75"
              )}
              role="tab"
              aria-selected={index === current - 1}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Counter */}
      <Badge 
        variant="secondary"
        className="absolute bottom-6 right-6 z-20 bg-white/20 text-white border-white/30 backdrop-blur-sm font-semibold"
      >
        {current} / {count}
      </Badge>
    </section>
  )
}