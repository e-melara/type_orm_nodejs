import {MigrationInterface, QueryRunner} from "typeorm";

export class secondMigration1595396707854 implements MigrationInterface {
    name = 'secondMigration1595396707854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar(50) NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "isStudent" boolean NOT NULL DEFAULT (0))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
