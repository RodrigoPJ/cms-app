import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProjectItem } from "./ProjectItem";

@Entity({ name: 'project_list' })
export class ProjectList {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  // One ProjectList can have many ProjectItems
   @OneToMany(() => ProjectItem, item => item.projectListId)
   items: ProjectItem[];
}
