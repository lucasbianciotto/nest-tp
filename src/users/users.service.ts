import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersCreateDto } from './dto/users.create.dto';
import { UsersUpdateDto } from './dto/users.update.dto';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async getAll(filter: {} = {}): Promise<Users[]> {
    return await this.usersRepository.findAll(filter);
  }

  async getById(id: string): Promise<Users | null> {
    return await this.usersRepository.findOne(id, {
      attributes: { exclude: ['password', 'refreshToken'] },
    });
  }

  async create(userData: UsersCreateDto) {
    if (await this.exists(userData.email)) throw new Error('User already exists');

    userData.password = await this.hashPassword(userData.password);
    const user = await this.usersRepository.create(userData);

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_REFRESH as string, { expiresIn: '7d' });

    await this.setRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async update(id: string, userData: UsersUpdateDto) {
    return await this.usersRepository.update(id, userData);
  }

  async delete(id: string) {
    return await this.usersRepository.softDelete(id);
  }

  async exists(email: string): Promise<Users | null> {
    return await this.usersRepository.exists(email);
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async setRefreshToken(id: string, refreshToken: string) {
    return await this.usersRepository.setRefreshToken(id, refreshToken);
  }

  async getRefreshToken(id: string) {
    return await this.usersRepository.getRefreshToken(id)
  }

}
