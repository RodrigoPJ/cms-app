import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ProjectItem } from "./ProjectItem";

@Entity({name: 'user'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  userName: string;

  @Column('varchar')
  user: string;

  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: string;

  @Column('varchar')
  userType: string;

  @OneToMany(() => ProjectItem, item => item.accountId)
  projectList: ProjectItem[];
}
