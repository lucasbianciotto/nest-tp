import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { UsersRepository } from './users.repository';
import { UsersProviders } from './users.providers';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, UsersRepository, ...UsersProviders],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
