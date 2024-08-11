import { NestFactory } from '@nestjs/core';
import { EntityManager } from 'typeorm';
import { AppModule } from '../app/app.module';
import { Province } from '../provinces/entities/province.entity';
import { County } from '../counties/entities/county.entity';
import { promises as fs } from 'fs';
import { join } from 'path';

const seedDatabase = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const entityManager = app.get(EntityManager);

  try {
    const filePath = join(__dirname, '../assets', 'iran.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const provincesData = JSON.parse(jsonData);

    for (const { name: provinceName, counties } of provincesData) {
      if (!provinceName) {
        console.error(
          'Province name is missing in the JSON data:',
          provinceName,
        );
        continue;
      }

      const province = new Province();
      province.name = provinceName;

      const savedProvince = await entityManager.save(Province, province);

      for (const countyName of counties) {
        const county = new County();
        county.name = countyName;
        county.province = savedProvince;
        await entityManager.save(County, county);
      }
    }

    console.log('Database seeding complete.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await app.close();
  }
};

seedDatabase();
