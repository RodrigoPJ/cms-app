import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1748659706314 implements MigrationInterface {
    name = 'Default1748659706314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_content" ADD "projectItemIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "project_item" ADD "projectListIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "project_content" ADD CONSTRAINT "FK_e9518843dc7dbc7ecc013f29652" FOREIGN KEY ("projectItemIdId") REFERENCES "project_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_item" ADD CONSTRAINT "FK_3e3687a714f78641c3308f34e64" FOREIGN KEY ("projectListIdId") REFERENCES "project_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_item" DROP CONSTRAINT "FK_3e3687a714f78641c3308f34e64"`);
        await queryRunner.query(`ALTER TABLE "project_content" DROP CONSTRAINT "FK_e9518843dc7dbc7ecc013f29652"`);
        await queryRunner.query(`ALTER TABLE "project_item" DROP COLUMN "projectListIdId"`);
        await queryRunner.query(`ALTER TABLE "project_content" DROP COLUMN "projectItemIdId"`);
    }

}
