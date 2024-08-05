import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserRoleEnum1722840288016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_enum') THEN
              CREATE TYPE "user_role_enum" AS ENUM('admin', 'user', 'employee');
          END IF;
      END
      $$;
  `);
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN "role";
  `);
    await queryRunner.query(`
      ALTER TABLE "user" ADD "role" "user_role_enum" NOT NULL DEFAULT 'user';
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN "role";
  `);
    await queryRunner.query(`
      DROP TYPE "user_role_enum";
  `);
    await queryRunner.query(`
      ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'user';
  `);
  }
}
