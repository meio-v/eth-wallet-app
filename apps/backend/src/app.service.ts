import { BadRequestException } from '@nestjs/common'
import { ethers } from 'ethers'

export class AppService {
  private provider = new ethers.JsonRpcProvider('NEXT_PUBLIC_WALLET_RPC_URL')

  async getEthereumInfo(address: string) {
    if (!ethers.isAddress(address)) throw new BadRequestException('Invalid Ethereum address')

    const [{gasPrice}, blockNumber, balance] = await Promise.all([
      this.provider.getFeeData(),
      this.provider.getBlockNumber(),
      this.provider.getBalance(address)
    ])

    return {
      gasPrice: gasPrice?.toString(),
      blockNumber,
      balance: ethers.formatEther(balance)
    }
  }
}