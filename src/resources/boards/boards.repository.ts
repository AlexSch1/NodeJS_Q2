import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { BoardEntity } from '../../entities/board.entity';
import { TaskEntity } from '../../entities/task.entity';

@Injectable()
export class BoardsRepository {
  constructor(
    @InjectRepository(BoardEntity)
    private beardRepository: Repository<BoardEntity>,
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,

  ) {}

  async create(createBoardDto: CreateBoardDto, boardId: string) {
    const newEntity = await this.beardRepository.create(createBoardDto);

    return this.beardRepository.save(newEntity);
  }

  findAll() {
    return this.beardRepository.find({ where: {  } });
  }

  async findOne(taskId: string): Promise<CreateBoardDto | null> {
    const res: CreateBoardDto | undefined =
      await this.beardRepository.findOne(taskId);

    if (!res) return null;

    return res;
  }

  async update(taskId: string, updateBoardDto: UpdateBoardDto): Promise<CreateBoardDto | null> {
    const res = await this.beardRepository.findOne(taskId);

    if (!res) return null;

    const updatedTask = await this.beardRepository.update(taskId, updateBoardDto);

    return updatedTask.raw;
  }

  async remove(id: string): Promise<'DELETED' | null> {
    const deletedBoard: DeleteResult = await this.beardRepository.delete(id);

    if (deletedBoard.affected) {
      const tasksRepBuilder = this.taskRepository.createQueryBuilder();
      await tasksRepBuilder
        .delete()
        .from(TaskEntity)
        .where('boardId = :boardId', { boardId: id })
        .execute();
      return 'DELETED';
    }

    return null
  }
}

//
// const deleteBoard = async (id: string): Promise<'DELETED'> => {
//   const rep = getRepository(Board);
//   const deletedBoard: DeleteResult = await rep.delete(id);
//   if (deletedBoard.affected) {
//     const tasksRepBuilder = getRepository(Task).createQueryBuilder();
//     await tasksRepBuilder
//       .delete()
//       .from(Task)
//       .where('boardId = :boardId', { boardId: id })
//       .execute();
//     return 'DELETED';
//   }
//
//   throw new HttpError(404, 'BoardEntity not found');
// };
