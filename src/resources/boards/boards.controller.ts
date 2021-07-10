import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// @UseInterceptors(new LoggingInterceptor())
@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':boardId')
  async findOne(@Param('boardId') boardId: string) {
    const task: CreateBoardDto | null = await this.boardsService.findOne(
      boardId,
    );

    if (!task) {
      throw new HttpException('BoardEntity not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  @Put(':boardId')
  async update(
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    const task: CreateBoardDto | null = await this.boardsService.update(
      boardId,
      updateBoardDto,
    );

    if (!task) {
      throw new HttpException('BoardEntity not found', HttpStatus.NOT_FOUND);
    } else {
      return task;
    }
  }

  @Delete(':boardId')
  async remove(@Param('boardId') boardId: string) {
    const result = await this.boardsService.remove(boardId);
    if (result === 'DELETED') {
      return 'The board has been deleted';
    }

    throw new HttpException('BoardEntity not found', HttpStatus.NOT_FOUND);
  }
}
