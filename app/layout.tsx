import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { ScrollIndicator } from '@/components/ui/scroll-indicator'
import { FloatingShapes, ParticleBackground } from '@/components/ui/floating-elements'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})


export const metadata: Metadata = {
  title: 'GK3 Printing Shop',
  description: 'Your one-stop shop for all printing needs - Professional printing services in Manila, Philippines',
  generator: 'GK3 Printing Shop',
  icons: {
    icon: [
      {
        url: '/logo.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/logo.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollIndicator />
          <FloatingShapes />
          <ParticleBackground />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
