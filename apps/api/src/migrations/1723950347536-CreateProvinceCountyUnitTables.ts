import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProvinceCountyUnitTables1723950347536
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the enum type for role if it doesn't already exist
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_role') THEN
          CREATE TYPE "enum_role" AS ENUM('superAdmin', 'admin', 'user', 'employee');
        END IF;
      END$$;
    `);

    // Create Province table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "province" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        PRIMARY KEY ("id")
      )
    `);

    // Create County table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "county" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "provinceId" integer,
        CONSTRAINT "FK_province" FOREIGN KEY ("provinceId") REFERENCES "province"("id") ON DELETE CASCADE,
        PRIMARY KEY ("id")
      )
    `);

    // Create Unit table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "unit" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        PRIMARY KEY ("id")
      )
    `);

    // Check if provinceId column exists and add it if it doesn't
    const hasProvinceId = await queryRunner.hasColumn('user', 'provinceId');
    if (!hasProvinceId) {
      await queryRunner.query(`ALTER TABLE "user" ADD "provinceId" integer`);
    }

    // Check if countyId column exists and add it if it doesn't
    const hasCountyId = await queryRunner.hasColumn('user', 'countyId');
    if (!hasCountyId) {
      await queryRunner.query(`ALTER TABLE "user" ADD "countyId" integer`);
    }

    // Check if unitId column exists and add it if it doesn't
    const hasUnitId = await queryRunner.hasColumn('user', 'unitId');
    if (!hasUnitId) {
      await queryRunner.query(`ALTER TABLE "user" ADD "unitId" integer`);
    }

    // Check if role column exists and add it if it doesn't
    const hasRole = await queryRunner.hasColumn('user', 'role');
    if (!hasRole) {
      await queryRunner.query(
        `ALTER TABLE "user" ADD "role" "enum_role" NOT NULL DEFAULT 'user'`,
      );
    }

    // Check if the foreign key constraints exist and add them if they don't
    const table = await queryRunner.getTable('user');

    if (
      !table.foreignKeys.find((fk) => fk.columnNames.includes('provinceId'))
    ) {
      await queryRunner.query(
        `ALTER TABLE "user" ADD CONSTRAINT "FK_provinceId" FOREIGN KEY ("provinceId") REFERENCES "province"("id") ON DELETE SET NULL`,
      );
    }

    if (!table.foreignKeys.find((fk) => fk.columnNames.includes('countyId'))) {
      await queryRunner.query(
        `ALTER TABLE "user" ADD CONSTRAINT "FK_countyId" FOREIGN KEY ("countyId") REFERENCES "county"("id") ON DELETE SET NULL`,
      );
    }

    if (!table.foreignKeys.find((fk) => fk.columnNames.includes('unitId'))) {
      await queryRunner.query(
        `ALTER TABLE "user" ADD CONSTRAINT "FK_unitId" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE SET NULL`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the added columns and constraints from the User table
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "FK_provinceId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "FK_countyId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "FK_unitId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN IF EXISTS "provinceId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN IF EXISTS "countyId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN IF EXISTS "unitId"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN IF EXISTS "role"`);

    // Drop the Unit table
    await queryRunner.query(`DROP TABLE IF EXISTS "unit"`);

    // Drop the County table
    await queryRunner.query(`DROP TABLE IF EXISTS "county"`);

    // Drop the Province table
    await queryRunner.query(`DROP TABLE IF EXISTS "province"`);

    // Drop the enum type for role if no other table is using it
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_role') THEN
          DROP TYPE "enum_role";
        END IF;
      END$$;
    `);
  }
}
