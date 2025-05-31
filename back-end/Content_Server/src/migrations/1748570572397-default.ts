import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1748570572397 implements MigrationInterface {
    name = 'Default1748570572397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_content" DROP COLUMN "projects"`);
        await queryRunner.query(`ALTER TABLE "user_content" ADD "projects" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_content" DROP COLUMN "projects"`);
        await queryRunner.query(`ALTER TABLE "user_content" ADD "projects" uuid NOT NULL`);
    }

}
