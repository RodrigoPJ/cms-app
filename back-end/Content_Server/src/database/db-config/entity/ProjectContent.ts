import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ProjectItem } from "./ProjectItem";

@Entity({ name: "project_content" })
export class ProjectContent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  type: string;

  @Column("varchar")
  title: string;

  @Column("varchar")
  body: string;

  @Column("varchar")
  properties: string;

  @ManyToOne(() => ProjectItem, (item) => item.id)
  @Column()
  projectItemId: string;
  
}
