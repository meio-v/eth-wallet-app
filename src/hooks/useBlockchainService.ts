'use client'

import { useState, useEffect } from 'react'
import { Currency } from '@/types/Currency'
import BlockchainService, { BlockchainServiceSettings } from '@/services/BlockchainService'
import { HDNodeWallet } from 'ethers'
import { ETH_SEPOLIA_RPC_URL } from '@/constants'

export function useBlockchainService() {
  const [balance, setBalance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [currency, setCurrency] = useState<Currency>(Currency.ETH)
  const [wallet, setWallet] = useState<HDNodeWallet | null>(null)

  const settings: BlockchainServiceSettings = {
    rpcUrl: ETH_SEPOLIA_RPC_URL,
    balanceCurrency: currency,
  }

  const blockchainService = new BlockchainService(settings)

  const fetchAndSetBalance = async () => {
    if (!wallet) return
    setIsLoading(true)

    try {
      const balance = await blockchainService.getBalance(wallet.address)
      setBalance(balance)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch balance')
    } finally {
      setIsLoading(false)
    }
  }

  const refreshBalance = async (selectedCurrency: Currency) => {
    setCurrency(selectedCurrency)
    blockchainService.setCurrency(selectedCurrency)
    await fetchAndSetBalance()
  }

  const getWalletAddress = () => wallet?.address || ''

  const initializeWallet = () => {
    const storedWalletMnemonic = localStorage.getItem('walletMnemonic')

    if (storedWalletMnemonic) {
      setWallet(HDNodeWallet.fromPhrase(storedWalletMnemonic))
    } else {
      const newWallet = HDNodeWallet.createRandom()
      setWallet(newWallet)
      localStorage.setItem('walletMnemonic', newWallet.mnemonic?.phrase as string)
    }
  }


  useEffect(initializeWallet, [])
  useEffect(() => {
    if (wallet) {
      refreshBalance(currency)
    }
  }, [wallet, currency])

  return { balance, isLoading, error, currency, refreshBalance, getWalletAddress, setCurrency }
}