import { GetUserDTO } from '../../models/user/get-user.dto';
import { UserLoginDTO } from '../../models/user/user-login.dto';
import { UserRegisterDTO } from '../../models/user/user-register.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './../../data/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './../../interfaces/jwt-payload';
import { Option, some, none } from 'fp-ts/lib/Option';
import { Either, left, right } from 'fp-ts/lib/Either';
import * as TE from 'fp-ts/lib/TaskEither'
import * as T from 'fp-ts/lib/Task'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async isExistingUser(email: string): Promise<boolean> {
    const userFound: User | undefined = await this.usersRepository.findOne({ where: { email } });

    return userFound !== undefined ? true : false;
  }

  async registerUser(userDTO: UserRegisterDTO): Promise<Either<string, string>> {
    const userFound: User | undefined = await this.usersRepository.findOne({ where: { email: userDTO.email } });

    if (userFound !== undefined) {
      return left('User already registered!');
    }

    const user: User = new User();
    user.email = userDTO.email;
    user.password = await bcrypt.hash(userDTO.password, 10);
    user.isAdmin = false;

    try {
      const createdUser: User = await this.usersRepository.create(user);
      await this.usersRepository.save([createdUser]);
    } catch (error) {
      return left(error.message);
    }

    return right('User registered!');
  }

  async validateUser(payload: JwtPayload): Promise<Option<GetUserDTO>> {
    const userFound: User | undefined = await this.usersRepository.findOne({ where: { email: payload.email } });
    const userDTO: GetUserDTO = new GetUserDTO();
    if (userFound !== undefined) {
      userDTO.email = userFound.email;
      userDTO.isAdmin = userFound.isAdmin;
      return some(userDTO);
    }

    return none;
  }

  async signIn(user: UserLoginDTO): Promise<string | GetUserDTO> {

    const userFound = () => TE.tryCatch(async () => {
      const a = await this.usersRepository
        .findOne({ select: ['email', 'isAdmin', 'password'], where: { email: user.email } })
      if (a) {
        return a;
      } else {
        return 'No such user'
      }
    }, e => false);
    const getUsersTask =
      pipe(
        userFound(),
        TE.chain(a => TE.tryCatch(async () => {
          if (typeof a === 'string') {
            return 'No such user';
          } else {
            const result = await bcrypt.compare(user.password, a.password);
            if (result) {
              const userFound = new GetUserDTO();
              userFound.email = a.email;
              userFound.isAdmin = a.isAdmin;
              return userFound;
            } else {
              return 'No such  user';
            }
          }
        }, e => e)),
        TE.fold<string, GetUserDTO, string | GetUserDTO>((e) => T.of(e), userFound => T.of(userFound)),
      );

    const res = await getUsersTask();
    return res;
  }

  async getAll(): Promise<string | GetUserDTO[]> {

    // const users = new Promise<User[]>((res, rej) => rej());
    const users = this.usersRepository.find({});
    const getUsersTask = pipe(
      TE.tryCatch<string, User[]>(
        () => users,
        () => 'Failed to get users',
      ),
      TE.map((users) => {
        return users.map((user: User) => {
          const userDto = new GetUserDTO();
          userDto.email = user.email;
          userDto.isAdmin = user.isAdmin;
          return userDto;
        })
      }),
      TE.fold<string, GetUserDTO[], string | GetUserDTO[]>(s => T.of(s), r => T.of(r))
    );

    const res = getUsersTask();
    // throw new Error('Failed');
    return res;
  }

  async profile(email: string): Promise<Either<string, GetUserDTO>> {
    return pipe(
      E.fromNullable('No such user')(await this.usersRepository.findOne({ where: { email } })),
      E.map((user) => {
        return {
          email: user.email,
          isAdmin: user.isAdmin
        }
      })
    )
  }
}
