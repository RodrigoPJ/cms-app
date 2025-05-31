import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1748658300933 implements MigrationInterface {
    name = 'Default1748658300933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5c30835a78bde617bbd334399e6"`);
        await queryRunner.query(`ALTER TABLE "project_list" DROP CONSTRAINT "PK_fe1b3553829be126b7b471426db"`);
        await queryRunner.query(`ALTER TABLE "project_list" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "project_list" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "project_list" ADD CONSTRAINT "PK_fe1b3553829be126b7b471426db" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "REL_5c30835a78bde617bbd334399e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "projectListIdId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "projectListIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_5c30835a78bde617bbd334399e6" UNIQUE ("projectListIdId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5c30835a78bde617bbd334399e6" FOREIGN KEY ("projectListIdId") REFERENCES "project_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5c30835a78bde617bbd334399e6"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_5c30835a78bde617bbd334399e6"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "projectListIdId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "projectListIdId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "REL_5c30835a78bde617bbd334399e" UNIQUE ("projectListIdId")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "project_list" DROP CONSTRAINT "PK_fe1b3553829be126b7b471426db"`);
        await queryRunner.query(`ALTER TABLE "project_list" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "project_list" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_list" ADD CONSTRAINT "PK_fe1b3553829be126b7b471426db" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5c30835a78bde617bbd334399e6" FOREIGN KEY ("projectListIdId") REFERENCES "project_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
