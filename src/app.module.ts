import { LocationEntity } from './app/location/location.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/user/user.module';
import { CompanyModule } from './app/company/company.module';
import { LocationModule } from './app/location/location.module';
import { CompanyEntity } from './app/company/company.entity';
import { UserEntity } from './app/user/user.entity';
import { AuthModule } from './auth/auth.module';
import { TokenEntity } from './token/token.entity';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      entities: [UserEntity, CompanyEntity, LocationEntity, TokenEntity],
    }),
    UserModule,
    CompanyModule,
    LocationModule,
    AuthModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
