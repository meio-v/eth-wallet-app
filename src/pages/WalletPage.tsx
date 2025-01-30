import React from 'react'
import { WalletProvider } from '@/contexts/WalletContext'
import { TransactionHistory } from '@/components/TransactionHistoryComponent'
import { BalanceComponent } from '@/components/BalanceComponent'
import { mockTransactions } from '@/mock/mockTransactions'
export const WalletPage = () => (
  <div className='bg-gray-100'>
    <WalletProvider>
    <div className="p-4">
      <BalanceComponent />
    </div>

    <div className="p-4">
      <TransactionHistory transactions={mockTransactions} />
    </div>
    </WalletProvider>
  </div>
)
