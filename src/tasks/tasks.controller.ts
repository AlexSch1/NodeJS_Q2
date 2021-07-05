import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('boards')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':boardId/tasks')
  async create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get(':boardId/tasks')
  findAll(@Param('boardId') boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get(':boardId/tasks/:taskId')
  async findOne(@Param('taskId') taskId: string) {
    const task: CreateTaskDto | null = await this.tasksService.findOne(taskId);

    if (task) {
      return task;
    }

    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  @Patch(':boardId/tasks/:taskId')
  async update(@Param('taskId') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task: UpdateTaskDto | null = await this.tasksService.update(id, updateTaskDto);

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return task

  }

  @Delete(':boardId/tasks/:taskId')
  async remove(@Param('id') id: string) {
    const result = await this.tasksService.remove(id);

    if (result === 'DELETED') {
      return 'The task has been deleted';
    }
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }
}
