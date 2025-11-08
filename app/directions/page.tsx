"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Navigation, Clock, Phone, ArrowLeft, Locate } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface UserLocation {
  latitude: number
  longitude: number
}

export default function DirectionsPage() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [locationError, setLocationError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  // GK3 Printing Shop coordinates (WEST ZAMORA STREET, PACO 1007)
  const shopLocation = {
    latitude: 14.5737,
    longitude: 120.9847,
    address: "WEST ZAMORA STREET. PACO 1007",
    name: "GK3 Printing Shop"
  }

  const requestLocation = () => {
    setIsLoading(true)
    setLocationError("")

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.")
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        setIsLoading(false)
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location access denied. Please enable location services.")
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.")
            break
          case error.TIMEOUT:
            setLocationError("Location request timed out.")
            break
          default:
            setLocationError("An unknown error occurred.")
            break
        }
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  }

  const openInGoogleMaps = () => {
    const destination = `${shopLocation.latitude},${shopLocation.longitude}`
    const origin = userLocation ? `${userLocation.latitude},${userLocation.longitude}` : ""
    const url = `https://www.google.com/maps/dir/${origin}/${destination}`
    window.open(url, "_blank")
  }

  const openInWaze = () => {
    const url = `https://waze.com/ul?ll=${shopLocation.latitude},${shopLocation.longitude}&navigate=yes`
    window.open(url, "_blank")
  }

  useEffect(() => {
    // Auto-request location on page load
    requestLocation()
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-red-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float-slow" />
          <div className="absolute top-1/3 right-20 w-16 h-16 bg-yellow-300/20 rounded-full animate-float-medium" />
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/15 rounded-full animate-float-fast" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Us <span className="text-yellow-300">Easily</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get real-time directions to our printing shop and never get lost again.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Location Information */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-100 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                  <MapPin className="text-red-500" size={32} />
                  Our Location
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-blue-600 dark:text-blue-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Address</h3>
                      <p className="text-slate-600 dark:text-slate-400">{shopLocation.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="text-green-600 dark:text-green-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Business Hours</h3>
                      <div className="text-slate-600 dark:text-slate-400 space-y-1">
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 8:00 AM - 5:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-purple-600 dark:text-purple-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Contact</h3>
                      <p className="text-slate-600 dark:text-slate-400">0936 313 0814</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Actions */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-100 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Get Directions</h3>
                
                <div className="space-y-4">
                  <button
                    onClick={requestLocation}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Locate size={20} />
                    {isLoading ? "Getting Your Location..." : "Enable My Location"}
                  </button>

                  {locationError && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-red-600 dark:text-red-400 text-sm">{locationError}</p>
                    </div>
                  )}

                  {userLocation && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <p className="text-green-600 dark:text-green-400 text-sm font-medium mb-3">
                        ✓ Location enabled! Check the interactive map on the right for directions.
                      </p>
                      
                      <div className="text-sm text-green-600 dark:text-green-400">
                        <p>📍 Your location: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}</p>
                        <p>🎯 Distance to shop: Calculating...</p>
                      </div>

                      <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-700">
                        <p className="text-xs text-green-600/80 dark:text-green-400/80 mb-2">
                          Need external navigation apps?
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={openInGoogleMaps}
                            className="flex items-center justify-center gap-1 px-3 py-2 bg-white dark:bg-slate-700 border border-green-200 dark:border-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/40 transition-colors text-xs"
                          >
                            <Navigation size={14} />
                            Google Maps
                          </button>
                          
                          <button
                            onClick={openInWaze}
                            className="flex items-center justify-center gap-1 px-3 py-2 bg-white dark:bg-slate-700 border border-green-200 dark:border-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/40 transition-colors text-xs"
                          >
                            <Navigation size={14} />
                            Waze
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Interactive Map</h3>
                {userLocation && (
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                    Live Directions
                  </span>
                )}
              </div>
              
              <div className="relative h-[500px] rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-600">
                {userLocation ? (
                  <iframe
                    src={`https://maps.google.com/maps?saddr=${userLocation.latitude},${userLocation.longitude}&daddr=${shopLocation.latitude},${shopLocation.longitude}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                ) : (
                  <iframe
                    src={`https://maps.google.com/maps?q=${shopLocation.latitude},${shopLocation.longitude}&hl=en&z=15&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                )}
                
                {/* Map Overlay Controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  <button
                    onClick={requestLocation}
                    className="w-12 h-12 bg-white dark:bg-slate-800 shadow-lg rounded-lg flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    title="Refresh Location"
                  >
                    <Locate size={20} className="text-blue-600 dark:text-blue-400" />
                  </button>
                </div>

                {!userLocation && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-xl max-w-sm mx-4">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                          Enable Location for Directions
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          Allow location access to see turn-by-turn directions on the map.
                        </p>
                        <button
                          onClick={requestLocation}
                          disabled={isLoading}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          {isLoading ? "Getting Location..." : "Enable Location"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {userLocation ? (
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-blue-600 dark:text-blue-400 font-medium">Your Location</p>
                    <p className="text-blue-800 dark:text-blue-300 text-xs">
                      {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                    </p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 font-medium">GK3 Printing Shop</p>
                    <p className="text-red-800 dark:text-red-300 text-xs">
                      {shopLocation.latitude}, {shopLocation.longitude}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 text-center">
                  <a
                    href={`https://www.google.com/maps/search/WEST+ZAMORA+STREET.+PACO,+1007`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <MapPin size={16} />
                    View on Google Maps
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}