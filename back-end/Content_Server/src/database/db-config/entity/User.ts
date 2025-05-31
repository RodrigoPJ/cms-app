import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  OneToOne,
} from "typeorm";
import { ProjectList } from "./ProjectList";

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

  // FK → project_list.id
  @OneToOne(() => ProjectList)
  @JoinColumn()
  projectListId: ProjectList;
}
