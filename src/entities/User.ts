import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users'})
export class User {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

}

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn('uuid')
//   id: Id;
//
//   @Column('varchar', { length: 100 })
//   name: string;
//
//   @Column('varchar', { length: 100 })
//   login: string;
//
//   @Column('varchar', { length: 100 })
//   password: string;
//
//   @OneToMany<Task>((_type) => Task, (task: Task): Id => task.userId as Id, { cascade: true })
//   tasks: Task[];
//
//   static toResponse(user?: Partial<User>): Partial<User> | undefined {
//     if (!user) return undefined;
//
//     const { id, name, login } = user;
//     return { id, name, login };
//   }
// }
