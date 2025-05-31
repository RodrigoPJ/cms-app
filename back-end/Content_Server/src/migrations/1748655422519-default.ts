import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1748655422519 implements MigrationInterface {
    name = 'Default1748655422519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "user" uuid NOT NULL, CONSTRAINT "PK_fe1b3553829be126b7b471426db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user" character varying NOT NULL, "userName" character varying NOT NULL, "dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "userType" character varying NOT NULL, "projectListId" uuid, CONSTRAINT "REL_53c90e9405a9b020abdd981238" UNIQUE ("projectListId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_content" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "title" character varying NOT NULL, "body" TIMESTAMP NOT NULL, "properties" character varying NOT NULL, "projectItemId" uuid NOT NULL, CONSTRAINT "PK_289f03525ef33d1286648db6a02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "projectListId" uuid NOT NULL, "contentType" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_41f078dac4a49ad97002d8e2fe5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_53c90e9405a9b020abdd9812382" FOREIGN KEY ("projectListId") REFERENCES "project_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_53c90e9405a9b020abdd9812382"`);
        await queryRunner.query(`DROP TABLE "project_item"`);
        await queryRunner.query(`DROP TABLE "project_content"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "project_list"`);
    }

}
