import { UserLoginDTO } from '../models/user/user-login.dto';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { UsersService } from '../common/core/users.service';
import { AuthService } from './auth.service';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post('login')
  @ApiResponse({ status: 201, description: 'The user has been successfully logged in.' })
  @ApiResponse({ status: 400, description: 'Bad credentials' })
  async sign(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) user: UserLoginDTO): Promise<string> {
    return (await this.authService.signIn(user));
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'The user has been successfully registered.' })
  @ApiResponse({ status: 400, description: 'Bad credentials' })
  async register(
    @Body(new ValidationPipe({
      transform: true,
      whitelist: true,
    }))
    user: UserRegisterDTO,
  ): Promise<string> {

    const userRegister = await this.usersService.registerUser(user);

    return pipe(
      userRegister,
      E.fold(
        err => err,
        msg => msg,
      )
    );
  }
}
