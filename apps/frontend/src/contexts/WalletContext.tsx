'use client'

import { createContext, FC, ReactNode, useContext } from 'react'
import { useBlockchainService } from '@/hooks/useBlockchainService'
import { Currency } from '@/types/Currency'

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
  const { balance, isLoading, error, currency, refreshBalance, getWalletAddress, setCurrency } = useBlockchainService()

  return (
    <WalletContext.Provider value={{ balance, isLoading, error, currency, refreshBalance, getWalletAddress, setCurrency }}>
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