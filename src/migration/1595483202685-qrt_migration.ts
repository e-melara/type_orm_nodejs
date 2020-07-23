import {MigrationInterface, QueryRunner} from "typeorm";

export class qrtMigration1595483202685 implements MigrationInterface {
    name = 'qrtMigration1595483202685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar(50) NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "isStudent" boolean NOT NULL DEFAULT (0), "detailsId" integer, CONSTRAINT "UQ_d2471162efdc12c7acb96432f42" UNIQUE ("detailsId"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "firstName", "lastName", "age", "isStudent") SELECT "id", "firstName", "lastName", "age", "isStudent" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar(50) NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "isStudent" boolean NOT NULL DEFAULT (0), "detailsId" integer, CONSTRAINT "UQ_d2471162efdc12c7acb96432f42" UNIQUE ("detailsId"), CONSTRAINT "FK_a8687924ae4d52f05db87f3352f" FOREIGN KEY ("detailsId") REFERENCES "user_details" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "firstName", "lastName", "age", "isStudent", "detailsId") SELECT "id", "firstName", "lastName", "age", "isStudent", "detailsId" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar(50) NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "isStudent" boolean NOT NULL DEFAULT (0), "detailsId" integer, CONSTRAINT "UQ_d2471162efdc12c7acb96432f42" UNIQUE ("detailsId"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "firstName", "lastName", "age", "isStudent", "detailsId") SELECT "id", "firstName", "lastName", "age", "isStudent", "detailsId" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar(50) NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "isStudent" boolean NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "users"("id", "firstName", "lastName", "age", "isStudent") SELECT "id", "firstName", "lastName", "age", "isStudent" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
