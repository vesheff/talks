import { JwtPayload } from './../../interfaces/jwt-payload';
import { ConfigService } from './../../config/config.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { GetUserDTO } from 'src/models/user/get-user.dto';

import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
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

  async validate(payload: JwtPayload): Promise<GetUserDTO | undefined> {
    const user = await this.authService.validateUser(payload);
    return pipe(
      user,
      O.fold(() => undefined, userFound => userFound)
    )
  }
}
