import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Schedule } from './schedules/entities/schedule.entity';
import { Verse } from './verses/entities/verse.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Schedule, Verse],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'custom_migration_table',
  synchronize: false,
});
