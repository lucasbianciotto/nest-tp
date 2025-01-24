import { Injectable } from '@nestjs/common';
import { AuthSignupDto } from './dto/auth.signup.dto';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';
import { AuthLoginDto } from './dto/auth.login.dto';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService
  ) {}

  async signup(userData: AuthSignupDto) {
    return await this.usersService.create(userData);
  }

  async login(userData: AuthLoginDto) {
    const user = await this.usersService.exists(userData.email);
    if (!user || !await this.usersService.comparePassword(userData.password, user.password)) throw new Error('The email or password is incorrect');

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_REFRESH as string, { expiresIn: '7d' });

    await this.usersService.setRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async me(user: { id: string; name: string; email: string }) {
    return user;
  }

  isValidateToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  }

  async refreshToken(id: string, token: string) {
    const currentToken = await this.usersService.getRefreshToken(id);

    if (!currentToken || currentToken !== token) throw new Error('Invalid refresh token');

    const accessToken = jwt.sign({ id: id }, process.env.JWT_SECRET as string, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: id }, process.env.JWT_SECRET_REFRESH as string, { expiresIn: '7d' });

    await this.usersService.setRefreshToken(id, refreshToken);

    return { accessToken, refreshToken };
  }
}
