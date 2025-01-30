'use client'

import { FC } from 'react'
import { useWalletContext } from '@/contexts/WalletContext'
import ArrowIconComponent from '@/components/assets/ArrowIconComponent'
import CurrencySwitchComponent from '@/components/CurrencySwitchComponent'

export const BalanceComponent: FC = () => {
  const { balance, isLoading, error, currency, refreshBalance, getWalletAddress } = useWalletContext()

  const handleRefresh = () => {
    refreshBalance(currency)
  }


  return (
    <div
      className="card p-4 border border-gray-600 rounded-lg shadow-md bg-gradient-to-r from-emerald-900 to-gray-900 from-20% flex items-center">
      <h2 className="font-sans font-semibold text-gray-200">Total Balance</h2>

      <div className="inline-flex items-center justify-between gap-2 m-2 pb-1">
        {(!isLoading && error) ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-2xl font-bold">
            {balance ?? 0}
          </p>
        )}

        <CurrencySwitchComponent />

        <button
          onClick={handleRefresh}
          className="btn btn-circle btn-xs btn-outline text-teal-400 hover:bg-white">
          {isLoading ? (
            <span className="loading loading-ring font-sans text-teal-400"></span>
          ) : (
            <ArrowIconComponent className="text-teal-400 size-4"/>
          )}
        </button>
      </div>

      <p className="text-xs text-gray-500">{getWalletAddress()}</p>
    </div>
  )
}
