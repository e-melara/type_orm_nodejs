import {MigrationInterface, QueryRunner} from "typeorm";

export class stp1595484522979 implements MigrationInterface {
    name = 'stp1595484522979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profiles" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "gender" varchar NOT NULL, "photo" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar(50) NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "isStudent" boolean NOT NULL DEFAULT (0), "detail_id" integer, "profile_id" integer, CONSTRAINT "UQ_9fc134ca20766e165ad650ee740" UNIQUE ("detail_id"), CONSTRAINT "UQ_3e19ac6c13765edb65872fc53cd" UNIQUE ("profile_id"), CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "user_details" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "firstName", "lastName", "age", "isStudent", "detail_id") SELECT "id", "firstName", "lastName", "age", "isStudent", "detail_id" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar(50) NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "isStudent" boolean NOT NULL DEFAULT (0), "detail_id" integer, "profile_id" integer, CONSTRAINT "UQ_9fc134ca20766e165ad650ee740" UNIQUE ("detail_id"), CONSTRAINT "UQ_3e19ac6c13765edb65872fc53cd" UNIQUE ("profile_id"), CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "user_details" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "profiles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "firstName", "lastName", "age", "isStudent", "detail_id", "profile_id") SELECT "id", "firstName", "lastName", "age", "isStudent", "detail_id", "profile_id" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar(50) NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "isStudent" boolean NOT NULL DEFAULT (0), "detail_id" integer, "profile_id" integer, CONSTRAINT "UQ_9fc134ca20766e165ad650ee740" UNIQUE ("detail_id"), CONSTRAINT "UQ_3e19ac6c13765edb65872fc53cd" UNIQUE ("profile_id"), CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "user_details" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "users"("id", "firstName", "lastName", "age", "isStudent", "detail_id", "profile_id") SELECT "id", "firstName", "lastName", "age", "isStudent", "detail_id", "profile_id" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar(50) NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "isStudent" boolean NOT NULL DEFAULT (0), "detail_id" integer, CONSTRAINT "UQ_9fc134ca20766e165ad650ee740" UNIQUE ("detail_id"), CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "user_details" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "users"("id", "firstName", "lastName", "age", "isStudent", "detail_id") SELECT "id", "firstName", "lastName", "age", "isStudent", "detail_id" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
    }

}
