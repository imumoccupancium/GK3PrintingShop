"use client"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h3 className="text-sm md:text-base font-semibold text-slate-600 dark:text-slate-400 mb-2">ABOUT GK3</h3>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">About GK3 Printing Shop</h2>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
            We Print To Impress, <span className="text-blue-600 dark:text-blue-400">Every Single Time</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Logo/Image */}
          <div className="flex justify-center animate-fade-in">
            <div className="w-64 h-64 md:w-72 md:h-72 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl font-bold mb-2">GK3</div>
                <p className="text-sm font-semibold text-blue-100">Printing Shop</p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6 animate-fade-in-delay">
            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              GK3 Printing Shop is a family-run business dedicated to providing exceptional printing services to our
              community. With over a decade of experience, we've built a reputation for quality, reliability, and
              outstanding customer service. We specialize in a wide range of printing solutions including business
              cards, flyers, brochures, tarpaulins, stickers, and custom souvenirs tailored to meet your unique needs.
            </p>

            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Our team of skilled professionals uses state-of-the-art printing equipment and premium materials to ensure
              every project meets our high standards. Whether you need fast turnaround printing for a last-minute event
              or custom design work for a long-term campaign, we handle everything from concept to completion with
              meticulous attention to detail.
            </p>

            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              At GK3, we believe in building lasting relationships with our clients. We're committed to understanding
              your goals and delivering results that exceed expectations. Our passion for printing combined with our
              dedication to customer satisfaction makes us the go-to choice for businesses and individuals seeking
              reliable, high-quality printing services.
            </p>

            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              When you choose GK3 Printing Shop, you're partnering with a team that cares about your success. We pride
              ourselves on competitive pricing, fast delivery times (most orders within 24-48 hours), and personalized
              service that treats your project as if it were our own.
            </p>

            <div className="pt-6 border-t border-slate-200">
              <p className="font-semibold text-slate-900 mb-2">GK3 PRINTING SHOP</p>
              <p className="text-slate-600 mb-1">www.gk3printing.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
