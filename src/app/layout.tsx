import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Push Playground',
  description: 'Smart Contract Playground for Push Chain Testnet',
  icons: {
    icon: '/playground.ico',
    shortcut: '/playground.ico',
    apple: '/playground.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  )
}