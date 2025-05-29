import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn, CreateDateColumn } from "typeorm";
import { ProjectList } from "./ProjectList";

@Entity({ name: 'user_content' })
export class UserContent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('varchar')
  user: string;

  @Column('varchar')
  userName: string;

  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: string;

  @Column('varchar')
  userType: string;

   // FK → project_list.id
  @Column('uuid')
   projects: string;

   @ManyToOne(() => ProjectList, pl => pl.id, { onDelete: 'CASCADE' })
   @JoinColumn({ name: 'projects' })
   projectList: ProjectList;
}
