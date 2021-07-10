import { Entity, Column as ColumnDecorator, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'columns'})
export class Column {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ColumnDecorator()
  title!: string;

  @ColumnDecorator()
  order!: number;
}
