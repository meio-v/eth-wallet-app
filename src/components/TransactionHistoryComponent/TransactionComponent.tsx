import { Transaction } from '@/types/Transaction'
import { FC } from 'react'
import { getAgeString } from '@/utils/dateHelpers'


export const TransactionComponent: FC<Transaction> = ({ hash, to, value, gas, timestamp }) => {
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
