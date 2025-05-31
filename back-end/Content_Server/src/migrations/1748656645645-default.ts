import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1748656645645 implements MigrationInterface {
    name = 'Default1748656645645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_53c90e9405a9b020abdd9812382"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "projectListId" TO "projectListIdId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5c30835a78bde617bbd334399e6" FOREIGN KEY ("projectListIdId") REFERENCES "project_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5c30835a78bde617bbd334399e6"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "projectListIdId" TO "projectListId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_53c90e9405a9b020abdd9812382" FOREIGN KEY ("projectListId") REFERENCES "project_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
