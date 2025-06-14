import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1749063143241 implements MigrationInterface {
    name = 'Default1749063143241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_content" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, "properties" character varying NOT NULL, "projectItemId" uuid NOT NULL, CONSTRAINT "PK_289f03525ef33d1286648db6a02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "contentType" character varying NOT NULL, "name" character varying NOT NULL, "isActive" boolean NOT NULL, "accountId" uuid, CONSTRAINT "PK_41f078dac4a49ad97002d8e2fe5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "user" character varying NOT NULL, "dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "userType" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project_content" ADD CONSTRAINT "FK_a1080181f901b07b8ea1c941073" FOREIGN KEY ("projectItemId") REFERENCES "project_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_item" ADD CONSTRAINT "FK_5967ff5df6397df96c28262ee07" FOREIGN KEY ("accountId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_item" DROP CONSTRAINT "FK_5967ff5df6397df96c28262ee07"`);
        await queryRunner.query(`ALTER TABLE "project_content" DROP CONSTRAINT "FK_a1080181f901b07b8ea1c941073"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "project_item"`);
        await queryRunner.query(`DROP TABLE "project_content"`);
    }

}
