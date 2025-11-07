"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useParallax } from "@/hooks/use-scroll-animation"

export function HeroSection() {
  const offsetY = useParallax()

  return (
    <section id="home" className="relative w-full h-screen md:h-[600px] flex items-center overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-500 opacity-90"
        style={{
          transform: `translateY(${offsetY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0">
          <Image
            src="/printing-press-and-paper-rolls.jpg"
            alt="Printing background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 to-red-500/95"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float-slow" />
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-yellow-300/20 rounded-full animate-float-medium" />
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-white/15 rounded-full animate-float-fast" />
        <div className="absolute top-1/2 right-1/3 w-8 h-32 bg-white/10 rotate-12 animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-yellow-300/15 rotate-45 animate-float-medium" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance">
              Your One-Stop Shop for All <span className="text-yellow-300">Printing Needs</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 text-balance">
              Premium quality prints, fast turnaround, and exceptional service for your business and personal projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                Get a Quote
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 transition-all duration-300 border-2 border-white"
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden md:block relative h-96 animate-fade-in-delay">
            <div className="absolute inset-0 bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
              <img src="/printing-press-and-paper-rolls.jpg" alt="Printing samples" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
