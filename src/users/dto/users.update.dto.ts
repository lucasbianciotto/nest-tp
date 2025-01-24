import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';

export class UsersUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  readonly name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email?: string;
}
