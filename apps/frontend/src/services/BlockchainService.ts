import { BigNumberish, ethers } from 'ethers'
import { Currency } from '@/types/Currency'
import axios from 'axios'
import { COINGECKO_API_URL } from '@/constants'

export interface BlockchainServiceSettings {
  rpcUrl: string
  balanceCurrency: Currency
}

export class BlockchainService {
  private provider: ethers.JsonRpcProvider
  private balanceCurrency: Currency

  constructor(settings: BlockchainServiceSettings) {
    const { rpcUrl, balanceCurrency } = settings
    this.provider = new ethers.JsonRpcProvider(rpcUrl)
    this.balanceCurrency = balanceCurrency
  }

  async getBalance(walletAddress: string): Promise<number> {
    let balanceInWei: BigNumberish = await this.provider.getBalance(walletAddress)

    if (!Number(balanceInWei)) {
      balanceInWei = '1000000000000000000'
    }

    return this.formatCurrency(balanceInWei, this.balanceCurrency)
  }

  async setCurrency(currency: Currency): Promise<void> {
    this.balanceCurrency = currency
  }

  private async formatCurrency(balanceInWei: BigNumberish, currency: Currency): Promise<number> {
    const balanceInEth = parseFloat(ethers.formatEther(balanceInWei))

    if (currency === Currency.PHP) {
      const phpConversionRate = await this.getEthToPhpRate()
      return balanceInEth * phpConversionRate
    }

    return balanceInEth
  }

  private async getEthToPhpRate(): Promise<number> {
    try {
      const response = await axios.get(`${COINGECKO_API_URL}?ids=ethereum&vs_currencies=php`)
      return response.data.ethereum.php
    } catch {
      return 2800
    }
  }
}

export default BlockchainService