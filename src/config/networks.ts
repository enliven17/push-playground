import { NetworkConfig } from '@/types/contract'

export const PUSH_TESTNET: NetworkConfig = {
  name: 'Push Testnet',
  chainId: 1998,
  rpcUrl: 'https://testnet-rpc.push0.org',
  explorerUrl: 'https://testnet-explorer.push0.org',
  symbol: 'PUSH',
  isTestnet: true
}

export const SUPPORTED_NETWORKS: NetworkConfig[] = [
  PUSH_TESTNET
]

export const DEFAULT_NETWORK = PUSH_TESTNET