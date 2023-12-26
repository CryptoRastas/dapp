import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function useWallet() {
  const {
    isConnected,
    address,
    isConnecting,
    isReconnecting,
    status,
    isDisconnected
  } = useAccount()
  const { connect, connectors, error } = useConnect()
  const { disconnect } = useDisconnect()

  return {
    status,
    isDisconnected,
    isReconnecting,
    isConnecting,
    address,
    isConnected,
    connect,
    connectors,
    error,
    disconnect
  }
}

export default useWallet
