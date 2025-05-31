import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1748653617668 implements MigrationInterface {
    name = 'Default1748653617668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "projects"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "projects" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_13f55b35ff3f48c564f2ad085ce" UNIQUE ("projects")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_13f55b35ff3f48c564f2ad085ce" FOREIGN KEY ("projects") REFERENCES "project_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_13f55b35ff3f48c564f2ad085ce"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_13f55b35ff3f48c564f2ad085ce"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "projects"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "projects" character varying NOT NULL`);
    }

}
