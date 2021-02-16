import { IsString, Matches, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDTO {

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
  password: string;
}
