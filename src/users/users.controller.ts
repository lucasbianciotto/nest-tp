import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersUpdateDto } from './dto/users.update.dto';
import { UsersCreateDto } from './dto/users.create.dto';


@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll({
      where: { deletedAt: null }
    });
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Post()
  create(
    @Body() userData: UsersCreateDto
  ) {
    return this.usersService.create(userData);
  }

  @Patch(":id")
  update(
    @Param('id') id: string,
    @Body() userData: UsersUpdateDto
  ) {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(String(id));
  }




}
