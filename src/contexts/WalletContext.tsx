'use client'

import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { Currency } from '@/types/Currency'
import BlockchainService, { BlockchainServiceSettings } from '@/services/BlockchainService'
import { HDNodeWallet } from 'ethers'

interface WalletContextType {
  balance: number | null
  isLoading: boolean
  error: string | null
  currency: Currency
  refreshBalance: (currency: Currency) => void
  getWalletAddress: () => string
  setCurrency: (currency: Currency) => void
}

const WalletContext = createContext<WalletContextType | null>(null)

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [currency, setCurrency] = useState<Currency>(Currency.ETH)

  const settings: BlockchainServiceSettings = {
    rpcUrl: 'https://broken-smart-grass.ethereum-sepolia.quiknode.pro/5c0320b73eb16a273a1d95aa5c57d7c4d4eb6091/',
    balanceCurrency: Currency.PHP
  }
  const blockchainService = new BlockchainService(settings)
  const [wallet, setWallet] = useState<HDNodeWallet | null>(null)
  const [isMounted, setIsMounted] = useState(false)  // Prevent SSR mismatch

  const fetchAndSetBalance = async () => {
    if(!wallet) {
      throw new Error('Wallet not found')
    }
    const balance = await blockchainService.getBalance(wallet.address)
    setBalance(balance)
  }

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred'
    setError(errorMessage)
  }

  const refreshBalance = async (selectedCurrency: Currency) => {
    setIsLoading(true)
    setError(null)

    try {
      blockchainService.setCurrency(selectedCurrency)
      await fetchAndSetBalance()
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getWalletAddress = () => wallet?.address || ''

  useEffect(() => {
    setIsMounted(true)
    const storedWalletMnemonic = localStorage.getItem('walletMnemonic')
    if (storedWalletMnemonic) {
      setWallet(HDNodeWallet.fromPhrase(storedWalletMnemonic))
    } else {
      const newWallet = HDNodeWallet.createRandom()
      setWallet(newWallet)
      localStorage.setItem('walletMnemonic', newWallet.mnemonic?.phrase as string)
    }
  }, [])

  if(!isMounted) {
    return null
  }
  return (
    <WalletContext.Provider
      value={{
        balance,
        isLoading,
        error,
        currency,
        refreshBalance,
        getWalletAddress,
        setCurrency
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWalletContext = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletProvider')
  }
  return context
}