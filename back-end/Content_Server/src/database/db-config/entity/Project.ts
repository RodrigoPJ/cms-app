import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn
} from "typeorm";
import { Content } from "./Content";
import { Account } from "./Account";

@Entity({ name: "project_item" })
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Account, (account) => account.projectList)
  @JoinColumn({ name: "accountId" })
  account!: Account;

  @Column("uuid") //'uuid' since account.id is a UUID
  accountId!: string;

  @Column("varchar")
  contentType!: string;

  @Column("varchar")
  name!: string;

  @Column("boolean")
  isActive!: boolean;

  @CreateDateColumn({type: 'timestamp'})
  created!: string;

  @Column({type: 'timestamp', nullable: true})
  published!: string |  null;

  @OneToMany(() => Content, (cont) => cont.projectId)
  projectContents?: Content[];
}
