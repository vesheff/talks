import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Param, Req } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { GetUserDTO } from './../models/user/get-user.dto';
import { ApiResponse, ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/lib/Either';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @ApiResponse({ status: 200, description: 'You successfully fetched user profiles.' })
  @ApiResponse({ status: 401, description: 'You are not authorized!' })
  async all(): Promise<string | GetUserDTO[]> {
    const users = this.usersService.getAll();
    const res = pipe(

      TE.tryCatch(() => users, () => 'Error ocurred'),
      TE.fold<string, GetUserDTO[], string | GetUserDTO[]>((a) => T.of(a), y => T.of(y))
    )

    return await res();
  }

  @Get('me')
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: 'You successfully fetched your profile.' })
  @ApiResponse({ status: 401, description: 'You are not authorized!' })
  async me(@Req() req): Promise<GetUserDTO | string> {
    const user = await this.usersService.profile(req.user.email);
    const res = pipe(
      user,
      E.fold<string, GetUserDTO, string | GetUserDTO>(
        () => 'No user',
        (userFound) => userFound)
    );

    return res;
  }

  @Get(':email')
  @UseGuards(AuthGuard(), AdminGuard)
  @ApiResponse({ status: 200, description: 'You successfully fetched user profile.' })
  @ApiResponse({ status: 401, description: 'You are not authorized!' })
  @ApiResponse({ status: 403, description: 'You are not authorized!' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'email' })
  async profile(@Param('email') email): Promise<GetUserDTO | string> {
    const user: E.Either<string, GetUserDTO> = await this.usersService.profile(email);

    const res = pipe(
      user,
      E.fold<string, GetUserDTO, string | GetUserDTO>(
        () => 'No user',
        (userFound) => userFound)
    );

    return res;
  }
}
