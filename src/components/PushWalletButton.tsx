'use client'

import { PushUniversalAccountButton, usePushWalletContext, usePushChainClient, PushUI } from '@pushchain/ui-kit'
import { useEffect } from 'react'

interface PushWalletButtonProps {
  onWalletChange?: (address: string, client: any) => void
}

export default function PushWalletButton({ onWalletChange }: PushWalletButtonProps) {
  const { connectionStatus } = usePushWalletContext()
  const { pushChainClient } = usePushChainClient()

  useEffect(() => {
    if (connectionStatus === PushUI.CONSTANTS.CONNECTION.STATUS.CONNECTED && pushChainClient) {
      try {
        // Get address from universal account
        const address = pushChainClient.universal?.account
        console.log('Push Wallet Connected:', address)
        console.log('Push Chain Client:', pushChainClient)
        
        if (address) {
          onWalletChange?.(address, pushChainClient)
        } else {
          console.warn('No address found in pushChainClient.universal.account')
          onWalletChange?.('', null)
        }
      } catch (error) {
        console.error('Error getting wallet address:', error)
        onWalletChange?.('', null)
      }
    } else {
      onWalletChange?.('', null)
    }
  }, [connectionStatus, pushChainClient, onWalletChange])

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-sm font-medium text-gray-300 uppercase tracking-wide">Universal Wallet</span>
      </div>

      <PushUniversalAccountButton />

      {connectionStatus === PushUI.CONSTANTS.CONNECTION.STATUS.CONNECTED && pushChainClient && (
        <div className="bg-[#2d4a2d] border border-green-600 rounded p-3 mt-3">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-green-400 text-lg">✓</span>
            <span className="text-green-300 font-medium text-sm">Wallet Connected</span>
          </div>
          <div className="text-xs text-gray-300">
            <div className="font-mono bg-[#1e1e1e] p-2 rounded text-xs break-all border border-[#3e3e42]">
              {pushChainClient.universal?.account || 'Loading...'}
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            <div>Network: Push Chain Testnet</div>
            <div>Chain ID: 42101</div>
          </div>
        </div>
      )}
    </div>
  )
}
