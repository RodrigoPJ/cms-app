import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1749616103660 implements MigrationInterface {
    name = 'Default1749616103660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_content" DROP CONSTRAINT "FK_a1080181f901b07b8ea1c941073"`);
        await queryRunner.query(`ALTER TABLE "project_item" DROP CONSTRAINT "FK_5967ff5df6397df96c28262ee07"`);
        await queryRunner.query(`ALTER TABLE "project_content" ADD "projectItemIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "project_item" ADD "accountIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "project_content" DROP COLUMN "projectItemId"`);
        await queryRunner.query(`ALTER TABLE "project_content" ADD "projectItemId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_item" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "project_item" ADD "accountId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_content" ADD CONSTRAINT "FK_e9518843dc7dbc7ecc013f29652" FOREIGN KEY ("projectItemIdId") REFERENCES "project_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_item" ADD CONSTRAINT "FK_c1aa9266d33d117a323df6672cb" FOREIGN KEY ("accountIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_item" DROP CONSTRAINT "FK_c1aa9266d33d117a323df6672cb"`);
        await queryRunner.query(`ALTER TABLE "project_content" DROP CONSTRAINT "FK_e9518843dc7dbc7ecc013f29652"`);
        await queryRunner.query(`ALTER TABLE "project_item" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "project_item" ADD "accountId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_content" DROP COLUMN "projectItemId"`);
        await queryRunner.query(`ALTER TABLE "project_content" ADD "projectItemId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_item" DROP COLUMN "accountIdId"`);
        await queryRunner.query(`ALTER TABLE "project_content" DROP COLUMN "projectItemIdId"`);
        await queryRunner.query(`ALTER TABLE "project_item" ADD CONSTRAINT "FK_5967ff5df6397df96c28262ee07" FOREIGN KEY ("accountId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_content" ADD CONSTRAINT "FK_a1080181f901b07b8ea1c941073" FOREIGN KEY ("projectItemId") REFERENCES "project_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
