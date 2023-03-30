import { AuthModule } from './../auth/auth.module';
import { UserModule } from './../app/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { TokenEntity } from './token.entity';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    UserModule,
    forwardRef(() => AuthModule),
  ],
  providers: [TokenService],
  exports: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
