import { JwtPayload } from './../../interfaces/jwt-payload';
import { ConfigService } from './../../config/config.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { GetUserDTO } from 'src/models/user/get-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<GetUserDTO> {
    const user = await this.authService.validateUser(payload);
    return user.getOrElse(null);
  }
}
