import { UserLoginDTO } from '../models/user/user-login.dto';
import { AuthController } from '../auth/auth.controller';
import { UsersService } from '../common/core/users.service';
import { Test } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { PassportModule } from '@nestjs/passport';

import { some } from 'fp-ts/lib/Option';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { right } from 'fp-ts/lib/Either';

jest.mock('../auth/auth.service');
jest.mock('../common/core/users.service');

describe('AuthController', () => {
  let authService: AuthService;
  let authCtrl: AuthController;
  let usersService: UsersService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        PassportModule.register({
          defaultStrategy: 'jwt',
        })],
      controllers: [AuthController],
      providers: [
        UsersService,
        AuthService
      ],
    }).compile();

    authCtrl = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should call AuthService signIn method', async () => {
    // Arrange
    const user = new UserLoginDTO();
    jest.spyOn(authService, 'signIn').mockImplementation(async () => {
      return some('token');
    });

    // Act
    await authCtrl.sign(user);

    // Assert
    expect(authService.signIn).toHaveBeenCalledTimes(1);
  });

  it('should call UsersService registerUser method', async () => {
    // Arrange
    const user = new UserRegisterDTO();
    jest.spyOn(usersService, 'registerUser').mockImplementation(async () => {
      return right('User registered');
    });

    // Act
    await authCtrl.register(user);

    // Assert
    expect(usersService.registerUser).toHaveBeenCalledTimes(1);
  });
});
