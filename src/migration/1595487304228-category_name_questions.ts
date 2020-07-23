import {MigrationInterface, QueryRunner} from "typeorm";

export class categoryNameQuestions1595487304228 implements MigrationInterface {
    name = 'categoryNameQuestions1595487304228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "questions_categories" ("questionsId" integer NOT NULL, "categorysId" integer NOT NULL, PRIMARY KEY ("questionsId", "categorysId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_572deb4045e08510a274e0c604" ON "questions_categories" ("questionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_02b8a3b3fb37fd4af1af611e42" ON "questions_categories" ("categorysId") `);
        await queryRunner.query(`DROP INDEX "IDX_572deb4045e08510a274e0c604"`);
        await queryRunner.query(`DROP INDEX "IDX_02b8a3b3fb37fd4af1af611e42"`);
        await queryRunner.query(`CREATE TABLE "temporary_questions_categories" ("questionsId" integer NOT NULL, "categorysId" integer NOT NULL, CONSTRAINT "FK_572deb4045e08510a274e0c604d" FOREIGN KEY ("questionsId") REFERENCES "questions" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_02b8a3b3fb37fd4af1af611e422" FOREIGN KEY ("categorysId") REFERENCES "categorys" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("questionsId", "categorysId"))`);
        await queryRunner.query(`INSERT INTO "temporary_questions_categories"("questionsId", "categorysId") SELECT "questionsId", "categorysId" FROM "questions_categories"`);
        await queryRunner.query(`DROP TABLE "questions_categories"`);
        await queryRunner.query(`ALTER TABLE "temporary_questions_categories" RENAME TO "questions_categories"`);
        await queryRunner.query(`CREATE INDEX "IDX_572deb4045e08510a274e0c604" ON "questions_categories" ("questionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_02b8a3b3fb37fd4af1af611e42" ON "questions_categories" ("categorysId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_02b8a3b3fb37fd4af1af611e42"`);
        await queryRunner.query(`DROP INDEX "IDX_572deb4045e08510a274e0c604"`);
        await queryRunner.query(`ALTER TABLE "questions_categories" RENAME TO "temporary_questions_categories"`);
        await queryRunner.query(`CREATE TABLE "questions_categories" ("questionsId" integer NOT NULL, "categorysId" integer NOT NULL, PRIMARY KEY ("questionsId", "categorysId"))`);
        await queryRunner.query(`INSERT INTO "questions_categories"("questionsId", "categorysId") SELECT "questionsId", "categorysId" FROM "temporary_questions_categories"`);
        await queryRunner.query(`DROP TABLE "temporary_questions_categories"`);
        await queryRunner.query(`CREATE INDEX "IDX_02b8a3b3fb37fd4af1af611e42" ON "questions_categories" ("categorysId") `);
        await queryRunner.query(`CREATE INDEX "IDX_572deb4045e08510a274e0c604" ON "questions_categories" ("questionsId") `);
        await queryRunner.query(`DROP INDEX "IDX_02b8a3b3fb37fd4af1af611e42"`);
        await queryRunner.query(`DROP INDEX "IDX_572deb4045e08510a274e0c604"`);
        await queryRunner.query(`DROP TABLE "questions_categories"`);
    }

}
