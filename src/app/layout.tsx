'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { ToastProvider } from '@/contexts/ToastContext'
import { PushUniversalWalletProvider, PushUI } from '@pushchain/ui-kit'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const walletConfig = {
    network: PushUI.CONSTANTS.PUSH_NETWORK.TESTNET,
    login: {
      email: true,
      google: true,
      wallet: {
        enabled: true,
      },
      appPreview: true,
    },
    modal: {
      loginLayout: PushUI.CONSTANTS.LOGIN.LAYOUT.SPLIT,
      connectedLayout: PushUI.CONSTANTS.CONNECTED.LAYOUT.HOVER,
      appPreview: true,
    },
  }

  const appMetadata = {
    logoUrl: '/playground.ico',
    title: 'Push Playground',
    description: 'Smart Contract Playground for Push Chain Testnet',
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <PushUniversalWalletProvider config={walletConfig} app={appMetadata}>
          <ToastProvider>
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
          </ToastProvider>
        </PushUniversalWalletProvider>
      </body>
    </html>
  )
}