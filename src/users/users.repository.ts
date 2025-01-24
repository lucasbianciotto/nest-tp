import { Inject, Injectable } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { UsersCreateDto } from './dto/users.create.dto';
import { UsersUpdateDto } from './dto/users.update.dto';

@Injectable()
export class UsersRepository {

  constructor(
    @Inject('USER_REPOSITORY')
    private readonly users: typeof Users
  ) {}

  async findAll(filter = {}): Promise<Users[]> {
    return await this.users.findAll(filter);
  }

  async findOne(id: string, options = {}){
    return await this.users.findByPk(id, options);
  }

  async create(userData: UsersCreateDto) {
    return await this.users.create({ name: userData.name, email: userData.email , password: userData.password });
  }

  async update(id: string, userData: UsersUpdateDto) {
    return this.users.update({ name: userData.name, email: userData.email }, { where: { id } });
  }

  async softDelete(id: string) {
    return this.users.update({ deletedAt: new Date() }, { where: { id } });
  }

  async delete(id: string) {
    return this.users.destroy({ where: { id } });
  }

  async exists(email: string) {
    return await this.users.findOne({ where: { email } });
  }

  async setRefreshToken(id: string, refreshToken: string) {
    return await this.users.update({ refreshToken }, { where: { id } })
  }

  async getRefreshToken(id: string): Promise<string | null> {
    const user = await this.users.findOne({ where: { id }, attributes: ['refreshToken'] });
    return user ? user.refreshToken : null;
  }

}