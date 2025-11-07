"use client"

export function GallerySection() {
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
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">Our Gallery</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore samples of our finest printing work across various categories.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-80 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
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
          ))}
        </div>
      </div>
    </section>
  )
}
