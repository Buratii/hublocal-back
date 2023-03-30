import { TokenService } from './token.service';
import { Controller, Body } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Put('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return await this.tokenService.refreshToken(body);
  }
}
