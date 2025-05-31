import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1748654402547 implements MigrationInterface {
    name = 'Default1748654402547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_13f55b35ff3f48c564f2ad085ce"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "projects" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_13f55b35ff3f48c564f2ad085ce" FOREIGN KEY ("projects") REFERENCES "project_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_13f55b35ff3f48c564f2ad085ce"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "projects" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_13f55b35ff3f48c564f2ad085ce" FOREIGN KEY ("projects") REFERENCES "project_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
