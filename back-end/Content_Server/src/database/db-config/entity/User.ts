import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { ProjectItem } from "./ProjectItem";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("varchar")
  user: string;

  @Column("varchar")
  userName: string;

  @CreateDateColumn({ type: "timestamp" })
  dateCreated: string;

  @Column("varchar")
  userType: string;

  // FK → project_item.id
  @OneToMany(() => ProjectItem, item => item.id)
  @JoinColumn()
  projectListId: ProjectItem[];
}
