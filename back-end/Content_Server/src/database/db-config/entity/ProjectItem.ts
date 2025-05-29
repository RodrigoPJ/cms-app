import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProjectContent } from "./ProjectContent";

@Entity({ name: "project_item" })
export class ProjectItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  projectListId: string;

  @Column({ type: "varchar" })
  contentType: string;

  @Column({ type: "varchar" })
  name: string;

  @OneToMany(() => ProjectContent, (pc) => pc.projectItem)
  contents: ProjectContent[];
}
