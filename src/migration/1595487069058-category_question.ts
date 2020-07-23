import {MigrationInterface, QueryRunner} from "typeorm";

export class categoryQuestion1595487069058 implements MigrationInterface {
    name = 'categoryQuestion1595487069058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categorys" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "questions_categories_categorys" ("questionsId" integer NOT NULL, "categorysId" integer NOT NULL, PRIMARY KEY ("questionsId", "categorysId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_67e2aee12773c3c5b6acfb2980" ON "questions_categories_categorys" ("questionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b1275c756e62a67a44ed4fdc74" ON "questions_categories_categorys" ("categorysId") `);
        await queryRunner.query(`DROP INDEX "IDX_67e2aee12773c3c5b6acfb2980"`);
        await queryRunner.query(`DROP INDEX "IDX_b1275c756e62a67a44ed4fdc74"`);
        await queryRunner.query(`CREATE TABLE "temporary_questions_categories_categorys" ("questionsId" integer NOT NULL, "categorysId" integer NOT NULL, CONSTRAINT "FK_67e2aee12773c3c5b6acfb29802" FOREIGN KEY ("questionsId") REFERENCES "questions" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_b1275c756e62a67a44ed4fdc749" FOREIGN KEY ("categorysId") REFERENCES "categorys" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("questionsId", "categorysId"))`);
        await queryRunner.query(`INSERT INTO "temporary_questions_categories_categorys"("questionsId", "categorysId") SELECT "questionsId", "categorysId" FROM "questions_categories_categorys"`);
        await queryRunner.query(`DROP TABLE "questions_categories_categorys"`);
        await queryRunner.query(`ALTER TABLE "temporary_questions_categories_categorys" RENAME TO "questions_categories_categorys"`);
        await queryRunner.query(`CREATE INDEX "IDX_67e2aee12773c3c5b6acfb2980" ON "questions_categories_categorys" ("questionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b1275c756e62a67a44ed4fdc74" ON "questions_categories_categorys" ("categorysId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_b1275c756e62a67a44ed4fdc74"`);
        await queryRunner.query(`DROP INDEX "IDX_67e2aee12773c3c5b6acfb2980"`);
        await queryRunner.query(`ALTER TABLE "questions_categories_categorys" RENAME TO "temporary_questions_categories_categorys"`);
        await queryRunner.query(`CREATE TABLE "questions_categories_categorys" ("questionsId" integer NOT NULL, "categorysId" integer NOT NULL, PRIMARY KEY ("questionsId", "categorysId"))`);
        await queryRunner.query(`INSERT INTO "questions_categories_categorys"("questionsId", "categorysId") SELECT "questionsId", "categorysId" FROM "temporary_questions_categories_categorys"`);
        await queryRunner.query(`DROP TABLE "temporary_questions_categories_categorys"`);
        await queryRunner.query(`CREATE INDEX "IDX_b1275c756e62a67a44ed4fdc74" ON "questions_categories_categorys" ("categorysId") `);
        await queryRunner.query(`CREATE INDEX "IDX_67e2aee12773c3c5b6acfb2980" ON "questions_categories_categorys" ("questionsId") `);
        await queryRunner.query(`DROP INDEX "IDX_b1275c756e62a67a44ed4fdc74"`);
        await queryRunner.query(`DROP INDEX "IDX_67e2aee12773c3c5b6acfb2980"`);
        await queryRunner.query(`DROP TABLE "questions_categories_categorys"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "categorys"`);
    }

}
