import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthSignupDto } from './dto/auth.signup.dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import { UsersRequestType } from './types/users.request.type';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  async signup(
    @Body() userData: AuthSignupDto
  ) {
    return await this.authService.signup(userData);
  }

  @Post('login')
  async login(
    @Body() userData: AuthLoginDto
  ) {
    return await this.authService.login(userData);
  }

  @Get('me')
async me(
  @Req() req: UsersRequestType
  ) {
    return await this.authService.me(req.user);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() body: { id: string, refreshToken: string },
  ) {
    return await this.authService.refreshToken(body.id, body.refreshToken);
  }


}
