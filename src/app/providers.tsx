'use client'

import { ToastProvider } from '@/contexts/ToastContext'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

// Dynamically import Push Wallet Provider with SSR disabled
const PushWalletWrapper = dynamic(
  () => import('./PushWalletWrapper'),
  { ssr: false }
)

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <PushWalletWrapper>{children}</PushWalletWrapper>
    </ToastProvider>
  )
}
