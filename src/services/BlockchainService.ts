import { BigNumberish, ethers } from 'ethers';
import { Currency } from '@/types/Currency';

export interface BlockchainServiceSettings {
  rpcUrl: string;
  balanceCurrency: Currency;
}

export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private balanceCurrency: Currency;

  constructor(settings: BlockchainServiceSettings) {
    const { rpcUrl, balanceCurrency } = settings
    this.provider = new ethers.JsonRpcProvider(rpcUrl)
    this.balanceCurrency = balanceCurrency
  }


  async getBalance(walletAddress: string): Promise<number> {
    let balanceInWei: BigNumberish = await this.provider.getBalance(walletAddress)

    if(!Number(balanceInWei)) { // Mock Value
      balanceInWei = '1000000000000000000'
    }

    return this.formatCurrency(balanceInWei, this.balanceCurrency)
  }

  setCurrency(currency: Currency): void {
    this.balanceCurrency = currency
  }

  private formatCurrency(balanceInWei: ethers.BigNumberish, currency: Currency): number {
    switch (currency) {
      case Currency.ETH:
        return parseFloat(ethers.formatEther(balanceInWei))

      case Currency.PHP:
        const balanceInEth = parseFloat(ethers.formatEther(balanceInWei))
        const phpConversionRate = this.getEthToPhpRate()
        return balanceInEth * phpConversionRate

      default:
        throw new Error(`Unsupported currency: ${currency}`)
    }
  }

  private getEthToPhpRate(): number {
    return 2800 // TODO: Would be nice to replace this with actual exchange rate fetched
  }
}

export default BlockchainService;