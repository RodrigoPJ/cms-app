import { Entity, Column, OneToOne, PrimaryColumn, Relation, PrimaryGeneratedColumn } from "typeorm";

export class Projects{
  projects: Project[]
}

export class Project {
  type: string;
  creationDate: number;
  elements: {
    ["key"]: {
      node: string;
      authorProps: {
        name: string;
        size: string;
        color: string;
      };
    };
  };
}

@Entity()
export class UserAccount {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  type: string;

  @Column()
  projects: string;

}

