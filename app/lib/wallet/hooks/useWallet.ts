import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function useWallet() {
  const {
    isConnected,
    address,
    isConnecting,
    isReconnecting,
    status,
    isDisconnected,
    connector
  } = useAccount()

  const { connect, connectors, error, connectAsync } = useConnect()
  const { disconnect } = useDisconnect()

  return {
    connectAsync,
    status,
    isReady: status === 'connected' || status === 'disconnected',
    isDisconnected,
    isReconnecting,
    isConnecting,
    address,
    isConnected,
    connect,
    connectors,
    error,
    disconnect,
    connector
  }
}

export default useWallet
