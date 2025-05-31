import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { ProjectItem } from "./ProjectItem";

@Entity()
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

  @Column("uuid")
  @ManyToOne(()=>ProjectItem, item => item.id)
  projectItemId: string;
}
