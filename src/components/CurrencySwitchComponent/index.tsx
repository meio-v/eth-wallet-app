'use client'

import { FC, useState } from 'react'
import { useWalletContext } from '@/contexts/WalletContext'
import { Currency } from '@/types/Currency'

const CurrencySwitchComponent: FC = () => {
  const { currency, setCurrency, refreshBalance } = useWalletContext()
  const [isOpen, setIsOpen] = useState(false)

  const currencies = Object.values(Currency) // Get all enum values dynamically

  const handleSelect = (newCurrency: Currency) => {
    setCurrency(newCurrency)
    refreshBalance(newCurrency)
    setIsOpen(false)
  }

  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currency}
      </div>
      {isOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          {currencies.map((curr: Currency) => (
            <li key={curr}>
              <a onClick={() => handleSelect(curr)}>{curr}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CurrencySwitchComponent