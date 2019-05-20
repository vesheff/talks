import { Either } from 'fp-ts/lib/Either';
import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Req, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { GetUserDTO } from './../models/user/get-user.dto';
import { ApiUseTags, ApiResponse, ApiBearerAuth, ApiImplicitParam } from '@nestjs/swagger';

@ApiUseTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @UseGuards(AuthGuard(), AdminGuard)
  @ApiResponse({ status: 200, description: 'You successfully fetched user profiles.' })
  @ApiResponse({ status: 401, description: 'You are not authorized!' })
  async all(): Promise<GetUserDTO[] | string> {
    const users = await this.usersService.getAll();

    return users
      .fold<GetUserDTO[] | string>(
        (err) => err,
        (usersFound) => usersFound);
  }

  @Get('me')
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: 'You successfully fetched your profile.' })
  @ApiResponse({ status: 401, description: 'You are not authorized!' })
  async me(@Req() req): Promise<GetUserDTO | string> {
    const user = await this.usersService.profile(req.user.email);

    return user
      .fold<GetUserDTO | string>(
        (err) => err,
        (userFound) => userFound);
  }

  @Get(':email')
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: 'You successfully fetched user profile.' })
  @ApiResponse({ status: 401, description: 'You are not authorized!' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiImplicitParam({name: 'email'})
  async profile(@Param('email') email): Promise<GetUserDTO | string> {
    const user: Either<string, GetUserDTO> = await this.usersService.profile(email);

    return user
      .fold<GetUserDTO | string>(
        (err) => { throw new NotFoundException(err); },
        (userFound) => userFound);
  }
}
