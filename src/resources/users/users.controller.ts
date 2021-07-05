import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpCode,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    const user: CreateUserDto = await this.usersService.create(createUserDto);

    if (user) {
      const { password, ...result } = user;
      return result;
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  async findOne(@Param('userId') id: string) {
    const user: CreateUserDto | undefined = await this.usersService.findOne(id);

    if (user) {
      return user;
    }

    throw new HttpException('UserEntity not found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user: CreateUserDto | null = await this.usersService.update(
      id,
      updateUserDto,
    );

    if (!user) {
      throw new HttpException('UserEntity not found', HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  @Delete(':userId')
  @HttpCode(204)
  async remove(@Param('userId') userId: string) {
    const result = await this.usersService.remove(userId);
    if (result === 'DELETED') {
      return 'The user has been deleted';
    }
  }
}
