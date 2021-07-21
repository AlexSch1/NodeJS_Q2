import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnEntity as ColumnType } from './column.entity';

@Entity({ name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('jsonb', { array: false, default: () => "'[]'" })
  columns!: ColumnType[];
}
