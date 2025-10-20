import { NetworkConfig } from '@/types/contract'

export const PUSH_TESTNET: NetworkConfig = {
  name: 'Push Chain Donut Testnet',
  chainId: 42101,
  rpcUrl: 'https://evm.rpc-testnet-donut-node2.push.org/',
  explorerUrl: 'https://donut.push.network',
  symbol: 'PC',
  isTestnet: true
}

export const SUPPORTED_NETWORKS: NetworkConfig[] = [
  PUSH_TESTNET
]

export const DEFAULT_NETWORK = PUSH_TESTNET