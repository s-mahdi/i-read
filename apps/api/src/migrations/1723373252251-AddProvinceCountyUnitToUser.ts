import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddProvinceCountyUnitToUser1723373252251
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');

    if (
      !table.foreignKeys.find((fk) => fk.columnNames.includes('provinceId'))
    ) {
      await queryRunner.createForeignKey(
        'user',
        new TableForeignKey({
          columnNames: ['provinceId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'province',
          onDelete: 'SET NULL',
        }),
      );
    }

    if (!table.foreignKeys.find((fk) => fk.columnNames.includes('countyId'))) {
      await queryRunner.createForeignKey(
        'user',
        new TableForeignKey({
          columnNames: ['countyId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'county',
          onDelete: 'SET NULL',
        }),
      );
    }

    if (!table.foreignKeys.find((fk) => fk.columnNames.includes('unitId'))) {
      await queryRunner.createForeignKey(
        'user',
        new TableForeignKey({
          columnNames: ['unitId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'unit',
          onDelete: 'SET NULL',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');

    const provinceForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('provinceId') !== -1,
    );
    if (provinceForeignKey) {
      await queryRunner.dropForeignKey('user', provinceForeignKey);
    }

    const countyForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('countyId') !== -1,
    );
    if (countyForeignKey) {
      await queryRunner.dropForeignKey('user', countyForeignKey);
    }

    const unitForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('unitId') !== -1,
    );
    if (unitForeignKey) {
      await queryRunner.dropForeignKey('user', unitForeignKey);
    }
  }
}
