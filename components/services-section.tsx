"use client"

import { Printer, Package, Sparkles, Gift, BookOpen, FileText, ArrowRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ServiceCardSkeleton } from "@/components/ui/loading-skeleton"
import { useState, useEffect } from "react"

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const services = [
    {
      icon: <Printer className="w-8 h-8" />,
      title: "Tarpaulin Printing",
      description: "High-quality vinyl tarpaulin printing for indoor and outdoor displays.",
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Business Cards",
      description: "Professional business cards that make a lasting impression.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Stickers",
      description: "Custom stickers in any shape and size for branding.",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Brochures",
      description: "Eye-catching brochures to showcase your products and services.",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Souvenirs",
      description: "Personalized souvenirs and promotional items.",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Posters",
      description: "Bold and vibrant posters for maximum impact.",
    },
  ]

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full animate-float-slow" />
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-red-500/5 rounded-full animate-float-medium" />
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-yellow-500/5 rotate-45 animate-float-fast" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">Our Services</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We offer a comprehensive range of printing solutions tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))
          ) : (
            services.map((service, index) => (
             <div
               key={index}
               className={`group p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-slate-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:scale-105 hover:-translate-y-2 ${
                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
               }`}
               style={{ 
                 transitionDelay: `${index * 150}ms`,
                 animationDelay: `${index * 150}ms`
               }}
             >
               <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-red-500 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                 {service.icon}
               </div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">{service.title}</h3>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{service.description}</p>
               <div className="mt-6 inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-2 gap-0 transition-all">
                 Learn more
                 <ArrowRight className="w-4 h-4 ml-2" />
               </div>
             </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
