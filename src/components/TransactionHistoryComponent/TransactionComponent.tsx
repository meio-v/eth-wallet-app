import { Transaction } from '@/types/Transaction'
import { FC } from 'react'


export const TransactionComponent: FC<Transaction> = ({ hash, to, value, gas, timestamp }) => {
  function getAgeString(timestamp: string): string {
    const now = Date.now()
    const past = new Date(timestamp).getTime()
    const diffInSeconds = Math.floor((now - past) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    return `${diffInMinutes} minutes ago`
  }
  const age = getAgeString(timestamp)
  return (
    <li className='py-5'>
      <p>{hash}</p>
      <p>{age}</p>
      <p>{to}</p>
      <p>{value}</p>
      <p>{gas}</p>
    </li>
  )
}
