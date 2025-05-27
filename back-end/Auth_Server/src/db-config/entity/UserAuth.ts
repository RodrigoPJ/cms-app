import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, Relation} from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age:number;

  @Column()
  password: string;

  @Column()
  email:string;

  @OneToOne(()=>UserAccount)
  @JoinColumn()
  account: string;
}
