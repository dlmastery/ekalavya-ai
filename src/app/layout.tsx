import type { Metadata, Viewport } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/lib/providers/theme-provider'
import { MockDataContextProvider } from '@/lib/providers/mock-data-context'

const notoSans = Noto_Sans({
  subsets: ['latin', 'devanagari'],
  variable: '--font-noto-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ekalavya AI',
  description: 'Your curious learning companion — No Child, No Teen, No Adult Left Behind',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={notoSans.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <MockDataContextProvider>
            {children}
          </MockDataContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
