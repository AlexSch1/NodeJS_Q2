import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsRepository } from './boards.repository';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {
  }
  create(createBoardDto: CreateBoardDto, boardId: string) {
    return this.boardsRepository.create(createBoardDto, boardId);
  }

  findAll() {
    return this.boardsRepository.findAll();
  }

  findOne(id: string) {
    return this.boardsRepository.findOne(id);
  }

  update(id: string, updateBoardDto: UpdateBoardDto) {
    return this.boardsRepository.update(id, updateBoardDto);
  }

  remove(id: string) {
    return this.boardsRepository.remove(id);
  }
}
