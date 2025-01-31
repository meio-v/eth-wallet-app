import { Transaction } from '@/types/Transaction'

function generateMockTransaction(_: never, index: number): Transaction {
  const dynamicGasFromIndex = 21000 + index * 500
  const dynamicTimestampFromIndex = new Date(Date.now() - index * 60_000).toISOString()
  const randomEthValue: string = (Math.random() * 0.5).toFixed(2)
  return {
    hash: `0xmockhash${index}`,
    to: `0xRecipientAddress${index}`,
    value: `${randomEthValue} ETH`,
    gas: dynamicGasFromIndex,
    timestamp: dynamicTimestampFromIndex,
  }
}


export const mockTransactions: Transaction[] = Array.from({ length: 10 }, generateMockTransaction)
