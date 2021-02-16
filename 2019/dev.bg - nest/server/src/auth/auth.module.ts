import { CoreModule } from './../common/core/core.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from './../config/config.module';
import { ConfigService } from './../config/config.service';
import { AuthController } from './auth.controller';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
@Module({
  imports: [
    ConfigModule,
    passportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        privateKey: configService.jwtSecret,
        signOptions: {
          expiresIn: configService.jwtExpireTime,
        },
      }),
      inject: [ConfigService],
    }),
    CoreModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, passportModule],
  controllers: [AuthController],
})
export class AuthModule { }
