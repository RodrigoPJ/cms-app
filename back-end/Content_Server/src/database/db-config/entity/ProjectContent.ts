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

  @Column("timestamp")
  body: string;

  @Column("varchar")
  properties: string;

  @Column("uuid")
  projectItemId: string;

  @ManyToOne(() => ProjectItem, (pi) => pi.contents, { onDelete: "CASCADE" })
  @JoinColumn({ name: "projectItemId" })
  projectItem: ProjectItem;
}
