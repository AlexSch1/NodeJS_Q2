import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../../express/src/entities/User';
import usersService from '../../../express/src/resources/users/user.service';

@Controller('users')
export class UsersController {
  // constructor(private readonly usersService: UsersService) {}
  //
  // @Post()
  // @HttpCode(201)
  // create(@Body() createUserDto: CreateUserDto) {
  //   const user = this.usersService.create(createUserDto);
  //   if (user) {
  //     return user;
  //   }
  //   // throw HttpException()
  // }
  //
  @Get()
  findAll() {
    return 'this.usersService.findAll()';
  }
  //
  // @Get(':userId')
  // findOne(@Param('userId') id: string) {
  //   console.log(id);
  //   return 'this.usersService.findOne(id)';
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
