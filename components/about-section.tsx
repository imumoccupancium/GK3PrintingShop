"use client"

import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-8">
            About GK3™
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 leading-tight">
            We Print To Impress, One Pixel At A Time.
          </h2>
        </div>

        {/* Content Section with Logo */}
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            {/* First two paragraphs with logo */}
            <div className="flex items-start gap-8">
              {/* Logo - Left Side (Much Bigger) */}
              <div className="flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="GK3 Printing Logo"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              
              {/* Content - Right Side */}
              <div className="flex-1 space-y-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  GK3 is a full-service printing company based in Manila, Philippines providing a range of services 
                  and products to a variety of clients operating across different industry sectors in the provinces of 
                  Metro Manila, Laguna, Batangas, and Cavite.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  We specialize in commercial digital printing services, large format / tarpaulin printing, panaflex and acrylic signage making and design, built 
                  up fabrication and installation, laser cutting and engraving, sticker label printing, indoor and outdoor advertising collaterals, display standees, 
                  banners, decal and sticker cutting, customized gifts, corporate giveaways, and many others. As a one-stop shop for all your printing, signage, 
                  and advertising requirements, our customized solutions are tailored to your specific needs, ensuring the best results every time – from 
                  planning and design process to production and installation.
                </p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              Here at GK3, we believe in creating top-notch value for our clients who deserve only the highest quality of products and services. Our 
              company prides itself on professionalism and a commitment to excellent customer service, making us a premier for all your printing, sign, 
              and advertising needs in Cavite, Laguna, and beyond. We boast of an experienced team of professionals and a range of state-of-the-art 
              equipment that allow us to give you best possible output in every project that we undertake.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              The goals of our clients are always our top priority. We seek to exceed client expectations by providing diligence and attention to detail in all aspects of production. We 
              understand that delivering nothing but quality finished products and services will lead to a long-term business relationship. To strengthen customer satisfaction and 
              loyalty, we constantly communicate and consult with you throughout the entire project, anticipate and solve problems, and follow deadlines and guidelines.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              When you hire us, you will have a "partner" who you can rely on. As an expert signage maker and printing company in Cavite, our reputation is built on the successful 
              delivery of all projects, no matter how difficult the assignment or how tight the timeframe, so you can relax knowing your project is in the safest of hands. We will 
              collaborate with you to fully understand your goals and to provide you with the best possible results using the topmost specifications tailored to your budget.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
