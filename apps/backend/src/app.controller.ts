import {
  Controller,
  Get,
  Param,
} from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('eth-info')
  async getEthInfo(@Param('address') address: string) {
    return this.appService.getEthereumInfo(address)
  }
}