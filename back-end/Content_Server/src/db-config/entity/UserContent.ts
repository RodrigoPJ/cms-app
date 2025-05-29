import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserContent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('varchar')
  user: string;

  @Column('varchar')
  userName: string;

  @Column('timestamp')
  dateCreated: string;

  @Column('varchar')
  userType: string;

  @Column('varchar')
  projects: string;
}
