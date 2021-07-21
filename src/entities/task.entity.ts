import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column({ type: 'text', nullable: true })
  public userId?: string | null;

  @Column({
    nullable: true,
  })
  boardId!: string;

  @Column({
    nullable: true,
  })
  columnId!: string;
}
