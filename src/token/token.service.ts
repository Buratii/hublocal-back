import { AuthService } from './../auth/auth.service';
import { UserService } from './../app/user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenEntity } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,

    private readonly userService: UserService,

    private readonly authService: AuthService,
  ) {}

  async save(hash: string, userId: string) {
    const oldToken = await this.tokenRepository.findOne({
      where: { userId },
    });

    if (oldToken) {
      this.tokenRepository.update(oldToken.id, { hash });
    } else {
      const newToken = this.tokenRepository.create({ hash, userId });

      this.tokenRepository.save(newToken);
    }
  }

  async refreshToken(body: RefreshTokenDto) {
    const oldToken = await this.tokenRepository.findOne({
      where: { hash: body.oldToken },
    });

    if (oldToken) {
      const user = await this.userService.findOneOrFail({
        where: { id: oldToken.userId },
      });

      return this.authService.login(user);
    } else {
      throw new HttpException(
        {
          errorMessage: 'Invalid Token',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
