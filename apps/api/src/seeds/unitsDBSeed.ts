import { NestFactory } from '@nestjs/core';
import { EntityManager } from 'typeorm';
import { AppModule } from '../app/app.module';
import { Unit } from '../units/entities/unit.entity';
import { promises as fs } from 'fs';
import { join } from 'path';

const seedUnits = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const entityManager = app.get(EntityManager);

  try {
    const filePath = join(__dirname, '../assets', 'units.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const unitsData = JSON.parse(jsonData);

    const unitEntities = unitsData.map((unitName: string) => {
      const unit = new Unit();
      unit.name = unitName;
      return unit;
    });

    await entityManager.save(Unit, unitEntities);

    console.log('Units database seeding complete.');
  } catch (error) {
    console.error('Error seeding units database:', error);
  } finally {
    await app.close();
  }
};

seedUnits();
