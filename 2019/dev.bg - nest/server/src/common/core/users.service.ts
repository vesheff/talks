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

  async signIn(user: UserLoginDTO): Promise<Option<GetUserDTO>> {
    const userFound: User | undefined = await this.usersRepository
      .findOne({ select: ['email', 'isAdmin', 'password'], where: { email: user.email } });

    if (userFound !== undefined) {
      const result: boolean = await bcrypt.compare(user.password, userFound.password);
      if (result) {
        const userToReturn: GetUserDTO = new GetUserDTO();
        userToReturn.email = userFound.email;
        userToReturn.isAdmin = userFound.isAdmin;
        return some(userToReturn);
      }
    }

    return none;
  }

  async getAll(): Promise<Either<string, GetUserDTO[]>> {
    try {
      const users: GetUserDTO[] = (await this.usersRepository.find({})).map((user: User) => {
        const userDto = new GetUserDTO();
        userDto.email = user.email;
        userDto.isAdmin = user.isAdmin;

        return userDto;
      });

      return right(users);

    } catch (error) {
      return left(error.message);
    }
  }

  async profile(email: string): Promise<Either<string, GetUserDTO>> {
    try {
      const user: User | undefined = (await this.usersRepository.findOne({ where: { email } }));
      const userToReturn: GetUserDTO = new GetUserDTO();

      if (user !== undefined) {
        userToReturn.email = user.email;
        userToReturn.isAdmin = user.isAdmin;

        return right(userToReturn);
      }

      return left('No such user');

    } catch (error) {
      return left(error.message);
    }
  }
}
