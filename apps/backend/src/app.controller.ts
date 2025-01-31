import { Controller, Get, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('eth-info')
  async getEthInfo(@Query('address') address: string) {
    return this.appService.getEthereumInfo(address)
  }
}