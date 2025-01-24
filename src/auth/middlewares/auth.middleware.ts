
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth.service';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../../users/users.service';
import { UsersRequestType } from '../types/users.request.type';
import { JwtIdType } from '../types/jwt.id.type';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  async use(req: UsersRequestType, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token || !this.isValidateToken(token)) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    const payload= <JwtIdType>jwt.decode(token);

    if (!payload || !payload.id) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token payload' });
    }

    const user = await this.userService.getById(payload.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = user;

    next();
  }

  private isValidateToken(token: string) {
    return this.authService.isValidateToken(token);
  }
}
