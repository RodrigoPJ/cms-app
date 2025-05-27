import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class UserContent {

    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    user: string

    @Column()
    userName: string

    @Column()
    dateCreated: number

    @Column()
    userType: string;

    @Column()
    projects: string;

}
