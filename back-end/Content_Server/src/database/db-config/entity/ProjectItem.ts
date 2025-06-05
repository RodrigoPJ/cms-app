import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ProjectContent } from "./ProjectContent";
import { User } from "./User";

@Entity({ name: "project_item" })
export class ProjectItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @ManyToOne(() => User, (user) => user.projectList)
  @JoinColumn({ name: "accountId" })
  accountId: string;

  @Column("varchar")
  contentType: string;

  @Column("varchar")
  name: string;

  @Column("boolean")
  isActive: boolean;

  @OneToMany(() => ProjectContent, (cont) => cont.projectItem)
  projectContents: ProjectContent;
}
