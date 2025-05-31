import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { ProjectContent } from "./ProjectContent";
import { ProjectList } from "./ProjectList";

@Entity()
export class ProjectItem {
  @PrimaryGeneratedColumn("uuid")
  @OneToMany(() => ProjectContent, content => content.projectItemId)
  @JoinColumn()
  id: string;

// this is the product listId
  @Column()
  @ManyToOne(() => ProjectList, projectList => projectList.id )
  projectListId: string;

  @Column('varchar')
  contentType: string;

  @Column('varchar')
  name: string;

}
