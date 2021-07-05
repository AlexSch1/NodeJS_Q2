import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import {genSaltSync, hashSync} from 'bcryptjs';


@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @BeforeInsert()
  updateDates() {
    const salt = genSaltSync(10);

    let passwordDecoded;

    if (this.password) {
      passwordDecoded = hashSync(this.password, salt);
    }

    this.password = passwordDecoded;
  }
}
