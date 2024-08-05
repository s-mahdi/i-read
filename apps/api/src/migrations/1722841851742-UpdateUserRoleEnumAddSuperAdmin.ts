import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserRoleEnumAddSuperAdmin1722841851742
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Rename the existing enum type
    await queryRunner.query(`
            ALTER TYPE "user_role_enum" RENAME TO "user_role_enum_old";
        `);

    // Step 2: Create the new enum type with the additional value
    await queryRunner.query(`
            CREATE TYPE "user_role_enum" AS ENUM('superAdmin', 'admin', 'user', 'employee');
        `);

    // Step 3: Remove the default constraint from the role column
    await queryRunner.query(`
            ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
        `);

    // Step 4: Update columns to use the new enum type
    await queryRunner.query(`
            ALTER TABLE "user" ALTER COLUMN "role" TYPE "user_role_enum" USING "role"::text::"user_role_enum";
        `);

    // Step 5: Re-apply the default constraint
    await queryRunner.query(`
            ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';
        `);

    // Step 6: Drop the old enum type
    await queryRunner.query(`
            DROP TYPE "user_role_enum_old";
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Rename the existing enum type
    await queryRunner.query(`
            ALTER TYPE "user_role_enum" RENAME TO "user_role_enum_new";
        `);

    // Step 2: Create the old enum type without the additional value
    await queryRunner.query(`
            CREATE TYPE "user_role_enum" AS ENUM('admin', 'user', 'employee');
        `);

    // Step 3: Remove the default constraint from the role column
    await queryRunner.query(`
            ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
        `);

    // Step 4: Update columns to use the old enum type
    await queryRunner.query(`
            ALTER TABLE "user" ALTER COLUMN "role" TYPE "user_role_enum" USING "role"::text::"user_role_enum";
        `);

    // Step 5: Re-apply the default constraint
    await queryRunner.query(`
            ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';
        `);

    // Step 6: Drop the new enum type
    await queryRunner.query(`
            DROP TYPE "user_role_enum_new";
        `);
  }
}
