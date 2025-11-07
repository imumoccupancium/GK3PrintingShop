"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "#home", label: "HOME" },
    { href: "#about", label: "ABOUT" },
    { href: "#services", label: "SERVICES" },
    { href: "#gallery", label: "PORTFOLIO" },
    { href: "#contact", label: "CONTACT" },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-xl font-bold text-blue-600 hidden sm:inline">GK3 Printing</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-12 items-center ml-auto">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-300 relative pb-1 ${
                    index === 0 
                      ? "text-blue-600 border-b-2 border-blue-600" 
                      : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Theme Toggle */}
            <div className="hidden md:flex ml-4">
              <ThemeToggle />
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-300"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <nav className="md:hidden pb-4 flex flex-col gap-3 animate-in fade-in duration-300 border-t border-slate-200 dark:border-slate-700 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-700 dark:text-slate-300 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      <div className="h-1 bg-gradient-to-r from-red-500 via-blue-500 via-green-500 via-orange-500 to-purple-500"></div>
    </>
  )
}
