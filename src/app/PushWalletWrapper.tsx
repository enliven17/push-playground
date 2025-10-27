'use client'

import { PushUniversalWalletProvider, PushUI } from '@pushchain/ui-kit'
import { ReactNode } from 'react'

export default function PushWalletWrapper({ children }: { children: ReactNode }) {
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
    <PushUniversalWalletProvider config={walletConfig} app={appMetadata}>
      {children}
    </PushUniversalWalletProvider>
  )
}
