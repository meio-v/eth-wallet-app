import React from 'react'
import { WalletProvider } from '@/contexts/WalletContext'
import { TransactionHistory } from '@/components/TransactionHistoryComponent'
import { BalanceComponent } from '@/components/BalanceComponent'

export const WalletPage = () => (
  <div>
    <WalletProvider>
      <BalanceComponent />
      <TransactionHistory />
    </WalletProvider>
  </div>
)
