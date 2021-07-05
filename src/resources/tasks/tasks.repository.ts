import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { TaskEntity } from '../../entities/task.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
    const newEntity = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(newEntity);
  }

  findAll(boardId: string): Promise<CreateTaskDto[]> {
    return this.tasksRepository.find({ where: { boardId } });
  }

  async findOne(id: string): Promise<CreateTaskDto | undefined> {
    const res: CreateTaskDto | undefined = await this.tasksRepository.findOne(
      id,
    );

    if (!res) return null;

    return res;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const res = await this.tasksRepository.findOne(id);

    if (!res) return null;

    const updatedTask = await this.tasksRepository.update(id, updateTaskDto);

    return updatedTask.raw;
  }

  async remove(id: string) {
    const deletedTask: DeleteResult = await this.tasksRepository.delete(id);

    if (deletedTask.affected) return 'DELETED';
    return null;
  }
}
