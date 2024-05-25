import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>
  ) {}

  async create(
    createScheduleDto: CreateScheduleDto,
    manager?: EntityManager
  ): Promise<Schedule> {
    const schedule = this.scheduleRepository.create(createScheduleDto);
    if (manager) {
      return manager.save(schedule);
    }
    return this.scheduleRepository.save(schedule);
  }

  findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find();
  }

  findOne(id: number): Promise<Schedule> {
    return this.scheduleRepository.findOneOrFail({ where: { id } });
  }

  async update(
    id: number,
    updateScheduleDto: UpdateScheduleDto
  ): Promise<Schedule> {
    await this.scheduleRepository.update(id, updateScheduleDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.scheduleRepository.delete(id);
  }

  async finishSchedule(id: number): Promise<Schedule> {
    await this.scheduleRepository.update(id, { isRead: true });
    return this.findOne(id);
  }
}
