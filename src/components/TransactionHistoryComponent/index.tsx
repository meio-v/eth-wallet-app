import { FC } from 'react'
import { Transaction } from '@/types/Transaction'
import { PresentationChartLineComponent } from '@/components/assets/PresentationChartLineComponent'
import { TransactionComponent } from '@/components/TransactionHistoryComponent/TransactionComponent'

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export const TransactionHistory: FC<TransactionHistoryProps> = ({ transactions }) => {
  const renderTransactionList = () => (
    transactions.map((tx) => <TransactionComponent key={tx.hash} {...tx} />)
  )

  return (
    <div className="card rounded-lg border border-gray-300 bg-gray-50 text-gray-800 font-sans">
      <h2 className="card-title p-4 border border-b-gray-300">
        <p className="inline-flex items-center gap-3">
          <PresentationChartLineComponent className="pt-0.5 size-6 text-teal-600" /> Transaction History
        </p>
      </h2>
      <ul className="align-middle text-center [&_li]:flex [&_p]:flex-grow [&_p]:basis-1/5">
        <li className="border border-b-gray-300 py-1">
          <p>Transaction Hash</p>
          <p>Age</p>
          <p>To</p>
          <p>Amount</p>
          <p>Gas</p>
        </li>
        {renderTransactionList()}
      </ul>
    </div>
  )
}