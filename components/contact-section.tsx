"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">Get in Touch</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 focus:border-blue-600 dark:focus:border-blue-400 focus:outline-none transition-colors duration-300"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 focus:border-blue-600 dark:focus:border-blue-400 focus:outline-none transition-colors duration-300"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 focus:border-blue-600 dark:focus:border-blue-400 focus:outline-none transition-colors duration-300"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 focus:border-blue-600 dark:focus:border-blue-400 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell us about your printing needs..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-red-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                disabled={submitted}
              >
                {submitted ? "✓ Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8 animate-fade-in-delay">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Phone</h3>
                  <p className="text-slate-600 dark:text-slate-400">(+63) 123-456-7890</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Email</h3>
                  <p className="text-slate-600 dark:text-slate-400">info@gk3printing.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Address</h3>
                  <p className="text-slate-600 dark:text-slate-400">123 Business Street, Manila, Philippines</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden shadow-lg h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.2345678901234!2d121.0000000!3d14.5994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7d8e1234567%3A0x1234567890abcdef!2sManila%2C%20Philippines!5e0!3m2!1sen!2sph!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Social Media Links */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-300 hover:scale-110"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all duration-300"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
