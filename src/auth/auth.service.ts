import { TokenService } from './../token/token.service';
import { UserEntity } from '@app/user/user.entity';
import { UserService } from './../app/user/user.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => TokenService))
    private readonly tokenService: TokenService,
  ) {}

  async login(user: UserEntity) {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    this.tokenService.save(token, user.id);

    return {
      token,
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async validateUser(email: string, password: string) {
    let user: UserEntity;
    try {
      user = await this.userService.findOneOrFail({ where: { email } });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
