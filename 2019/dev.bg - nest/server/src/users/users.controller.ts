import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { GetUserDTO } from './../models/user/get-user.dto';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @UseGuards(AuthGuard(), AdminGuard)
  async all(): Promise<GetUserDTO[] | string> {
    const users = await this.usersService.getAll();

    return users
      .fold<GetUserDTO[] | string>(
        (err) => err,
        (usersFound) => usersFound);
  }

  @Get('me')
  @UseGuards(AuthGuard())
  async me(@Req() req): Promise<GetUserDTO | string> {
    const user = await this.usersService.profile(req.user.email);

    return user
      .fold<GetUserDTO | string>(
        (err) => err,
        (usersFound) => usersFound);
  }
}
