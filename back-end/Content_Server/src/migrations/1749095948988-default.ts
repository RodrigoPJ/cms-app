import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1749095948988 implements MigrationInterface {
    name = 'Default1749095948988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_item" DROP CONSTRAINT "FK_5967ff5df6397df96c28262ee07"`);
        await queryRunner.query(`ALTER TABLE "project_item" ALTER COLUMN "accountId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_item" ADD CONSTRAINT "FK_5967ff5df6397df96c28262ee07" FOREIGN KEY ("accountId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_item" DROP CONSTRAINT "FK_5967ff5df6397df96c28262ee07"`);
        await queryRunner.query(`ALTER TABLE "project_item" ALTER COLUMN "accountId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_item" ADD CONSTRAINT "FK_5967ff5df6397df96c28262ee07" FOREIGN KEY ("accountId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
