import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { ProjectContent } from "./ProjectContent";
import { User } from "./User";

@Entity()
export class ProjectItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

// this is the product listId
  @Column()
  @ManyToOne(() => User, user => user.id )
  accountId: string;

  @Column('varchar')
  contentType: string;

  @Column('varchar')
  name: string;

  @OneToMany(() => ProjectContent, cont => cont.id)
  @JoinColumn()
  projectContents: ProjectContent[];

}
