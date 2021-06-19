import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { Column as ColumnType } from './Column';

@Entity({name: 'boards'})
export class Board {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('jsonb', { array: false,
    default: () => "'[]'", }, )
  columns!: any[];
}
