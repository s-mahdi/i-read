import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { VersesModule } from '../verses/verses.module';
import { SchedulesModule } from '../schedules/schedules.module';
import { ProvincesModule } from '../provinces/provinces.module';
import { CountiesModule } from '../counties/counties.module';
import { UnitsModule } from '../units/units.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    VersesModule,
    SchedulesModule,
    ProvincesModule,
    CountiesModule,
    UnitsModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
