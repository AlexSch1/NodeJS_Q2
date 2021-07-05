import {
  Entity,
  Column as ColumnDecorator,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'columns' })
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ColumnDecorator()
  title!: string;

  @ColumnDecorator()
  order!: number;
}
