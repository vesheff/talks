import { IsString, Matches, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserLoginDTO {

  @ApiModelProperty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @IsString()
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
  password: string;
}
