import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Column as ColumnType } from './Column';

@Entity({ name: 'boards' })
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('jsonb', { array: false, default: () => "'[]'" })
  columns!: ColumnType[];
}
