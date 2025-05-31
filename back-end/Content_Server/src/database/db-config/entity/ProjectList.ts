import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./User";
import { ProjectItem } from "./ProjectItem";

@Entity()
export class ProjectList {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(()=> ProjectItem, item => item.projectListId)
  @JoinColumn()
  id: string;

  @Column()
  name: string;

// this should be the user content id
  @Column()
  @OneToOne(()=> User, user=>user.id)
   user: string;
}
