import { UserLoginDTO } from '../models/user/user-login.dto';
import { UsersService } from '../common/core/users.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './../interfaces/jwt-payload';
import { Option } from 'fp-ts/lib/Option';
import { GetUserDTO } from 'src/models/user/get-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  public async signIn(user: UserLoginDTO): Promise<string> {
    const userFound = await this.usersService.signIn(user);

    if (typeof userFound === 'string') {
      return 'No such user';
    } else {
      return this.jwtService.sign({ email: userFound.email, isAdmin: userFound.isAdmin });
    }
  }

  async validateUser(payload: JwtPayload): Promise<Option<GetUserDTO>> {
    return await this.usersService.validateUser(payload);
  }
}
