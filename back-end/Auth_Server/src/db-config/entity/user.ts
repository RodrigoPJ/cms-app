import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, Relation} from "typeorm";

@Entity({name: 'user_auth'})
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

  @Column('uuid')
  account: string;
}
