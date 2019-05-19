import { RolesGuard } from './../common/guards/roles/roles.guard';
import { UserLoginDTO } from '../models/user/user-login.dto';
import { Roles } from './../common';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { UsersService } from '../common/core/users.service';
import { AuthService } from './auth.service';
import { Get, Controller, UseGuards, Post, Body, ValidationPipe, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard(), RolesGuard)
  root(): string {
    return 'root';
  }

  @Post('login')
  async sign(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) user: UserLoginDTO): Promise<string> {
    const token = await this.authService.signIn(user);

    if (token.isNone()) {
      throw new BadRequestException('Wrong credentials!');
    }

    return token.getOrElse('Error');
  }

  @Post('register')
  async register(
    @Body(new ValidationPipe({
      transform: true,
      whitelist: true,
    }))
    user: UserRegisterDTO
  ): Promise<string> {

    return (await this.usersService.registerUser(user))
      .fold(
        err => err,
        msg => msg
      );
  }
}
