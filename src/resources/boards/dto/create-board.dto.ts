import { ColumnEntity } from '../../../entities/column.entity';

export class CreateBoardDto {
  id?: string;
  title?: string;
  columns?: ColumnEntity[];
}
