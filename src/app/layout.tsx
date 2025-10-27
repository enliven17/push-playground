import './globals.css'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })

// Dynamically import Providers to avoid SSR issues
const Providers = dynamic(() => import('./providers'), { ssr: false })

export const metadata = {
  title: 'Push Playground',
  description: 'Smart Contract Playground for Push Chain Testnet',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen relative">
            {/* Animated Background Particles */}
            <div className="bg-particles">
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
            </div>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}