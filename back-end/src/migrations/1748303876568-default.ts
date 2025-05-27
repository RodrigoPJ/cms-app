import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1748303876568 implements MigrationInterface {
    name = 'Default1748303876568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "projects" character varying NOT NULL, "user" character varying NOT NULL, CONSTRAINT "PK_6acfec7285fdf9f463462de3e9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, "password" character varying NOT NULL, "emailId" uuid, CONSTRAINT "REL_1af105e69b4350d9b89728a52a" UNIQUE ("emailId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1af105e69b4350d9b89728a52a6" FOREIGN KEY ("emailId") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1af105e69b4350d9b89728a52a6"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_account"`);
    }

}
