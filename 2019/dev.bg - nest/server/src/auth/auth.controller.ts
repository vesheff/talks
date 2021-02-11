import { UserLoginDTO } from '../models/user/user-login.dto';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { UsersService } from '../common/core/users.service';
import { AuthService } from './auth.service';
import { Controller, Post, Body, ValidationPipe, BadRequestException } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Auth')
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
    return (await this.authService.signIn(user))
      .foldL(
        () => { throw new BadRequestException('Wrong credentials!') },
        token => token
      );
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

    return (await this.usersService.registerUser(user))
      .fold(
        err => err,
        msg => msg,
      );
  }
}
