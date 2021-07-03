import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get()
  getAll(): string {
    return 'this.appService.getHello()';
  }

  @Get(':userId')
  get(@Param('userId') userId: string): string {
    return 'get one' + userId;
  }

  @Post()
  create(@Body() userId: string): string {
    return 'get one' + userId;
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string): string {
    return 'get one' + userId;
  }

  @Put(':userId')
  updateUser(@Param('userId') userId: string): string {
    return 'get one' + userId;
  }





}
