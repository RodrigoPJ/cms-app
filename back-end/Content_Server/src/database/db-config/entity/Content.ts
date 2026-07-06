import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Project } from "./Project";

@Entity({ name: "content" })
export class Content {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  type!: string;

  @Column("varchar")
  title!: string;

  @Column("varchar")
  body!: string;

  @Column("varchar")
  published?: string | null; 

  @Column("jsonb")
  properties!: Record<string, any>;

  @ManyToOne(() => Project, (item) => item.projectContents, {onDelete: 'CASCADE'})
  @JoinColumn({ name: "projectId" })
  project!: Project;

  @Column("uuid")
  projectId!: string;

}
