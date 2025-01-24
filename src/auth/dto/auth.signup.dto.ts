import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthSignupDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(4, { message: 'Name is too short' })
  @MaxLength(20, { message: 'Name is too long' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password is too short' })
  password: string;

}