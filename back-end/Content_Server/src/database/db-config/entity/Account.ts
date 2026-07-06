import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Project } from "./Project";

@Entity({name: 'account'})
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  userName!: string;

  @Column('varchar') // fullName
  name!: string;

  @CreateDateColumn({ type: 'timestamp' })
  dateCreated!: string;

  @Column('varchar')
  userType!: string;

  @OneToMany(() => Project, item => item.accountId)
  projectList?: Project[];
}
