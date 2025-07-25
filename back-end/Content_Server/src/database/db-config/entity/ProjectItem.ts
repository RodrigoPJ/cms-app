import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Generated,
  CreateDateColumn
} from "typeorm";
import { ProjectContent } from "./ProjectContent";
import { User } from "./User";

@Entity({ name: "project_item" })
export class ProjectItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @ManyToOne(() => User, (user) => user.projectList)
  accountId: string;

  @Column("varchar")
  contentType: string;

  @Column("varchar")
  name: string;

  @Column("boolean")
  isActive: boolean;

  @CreateDateColumn({type: 'timestamp'})
  created: string;

  @Column('varchar')
  published?: string |  null;

  @OneToMany(() => ProjectContent, (cont) => cont.projectItemId)
  projectContents: ProjectContent;
}
