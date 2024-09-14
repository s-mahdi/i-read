import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { getDates } from '../utils/calendarUtils';
import { VersesService } from '../verses/verses.service';
import { SchedulesService } from '../schedules/schedules.service';
import { CreateScheduleDto } from '../schedules/dto/create-schedule.dto';
import { Schedule } from '../schedules/entities/schedule.entity';
import { County } from '../counties/entities/county.entity';
import { Unit } from '../units/entities/unit.entity';
import { Province } from '../provinces/entities/province.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(County)
    private readonly countyRepository: Repository<County>,
    @InjectRepository(Unit) private readonly unitRepository: Repository<Unit>,
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
    private readonly versesService: VersesService,
    private readonly dataSource: DataSource,
    private readonly schedulesService: SchedulesService,
  ) {}

  /**
   * this is function is used to create User in User Entity.
   * @param createUserDto this will type of createUserDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUser) {
      throw new ConflictException('نام کاربری در حال حاضر ثبت نام شده');
    }

    const existingUserByNationalCode = await this.userRepository.findOne({
      where: { nationalCode: createUserDto.nationalCode },
    });
    if (existingUserByNationalCode) {
      throw new ConflictException('کد ملی در حال حاضر ثبت نام شده');
    }

    let province = null;
    let county = null;
    let unit = null;

    if (createUserDto.province) {
      province = await this.provinceRepository.findOne({
        where: { id: createUserDto.province },
      });
      if (!province) {
        throw new NotFoundException('استان یافت نشد');
      }
    }

    if (createUserDto.county) {
      county = await this.countyRepository.findOne({
        where: { id: createUserDto.county },
      });
      if (!county) {
        throw new NotFoundException('شهرستان یافت نشد');
      }
    }

    if (createUserDto.unit) {
      unit = await this.unitRepository.findOne({
        where: { id: createUserDto.unit },
      });
      if (!unit) {
        throw new NotFoundException('واحد یافت نشد');
      }
    }

    const user = this.userRepository.create({
      ...createUserDto,
      province,
      county,
      unit,
      schedules: [],
    });

    const startDate = new Date();
    const nonHolidayDates = await getDates(startDate, 125);

    return this.dataSource.transaction(async (manager) => {
      try {
        const savedUser = await manager.save(user);

        const schedulePromises = nonHolidayDates.map(async (date, index) => {
          const startVerseId = 1 + 50 * index;
          const suraList = await this.versesService.getSuraListFromStartVerseId(
            startVerseId,
            50,
          );
          const createScheduleDto: CreateScheduleDto = {
            date: date.toISOString(),
            isRead: false,
            startVerseId,
            suraList,
            user: savedUser,
          };
          return this.schedulesService.create(createScheduleDto, manager);
        });

        const schedules = await Promise.all(schedulePromises);

        await manager.save(Schedule, schedules);

        savedUser.schedules = schedules;

        return await manager.findOne(User, {
          where: { username: createUserDto.username },
          relations: ['schedules', 'province', 'county', 'unit'],
        });
      } catch (error) {
        throw new InternalServerErrorException(
          'An error occurred during user creation',
        );
      }
    });
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllUser(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['province', 'county', 'unit'],
    });
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { id },
      relations: ['schedules', 'province', 'county', 'unit'],
      order: {
        schedules: {
          date: 'ASC',
        },
      },
    });
  }

  findOneByUserName(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  /**
   * this function is used to updated specific user whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of user.
   * @param updateUserDto this is partial type of createUserDto.
   * @returns promise of udpate user
   */
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Fetch the existing user by ID
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['province', 'county', 'unit'],
    });

    if (!user) {
      throw new NotFoundException('کاربر یافت نشد');
    }

    // Update basic user fields
    user.name = updateUserDto.name ?? user.name;
    user.username = updateUserDto.username ?? user.username;
    user.password = updateUserDto.password ?? user.password;

    // Update province if provided
    if (updateUserDto.province) {
      const province = await this.provinceRepository.findOne({
        where: { id: updateUserDto.province },
      });
      if (!province) {
        throw new NotFoundException('استان یافت نشد');
      }
      user.province = province;
    }

    // Update county if provided
    if (updateUserDto.county) {
      const county = await this.countyRepository.findOne({
        where: { id: updateUserDto.county },
      });
      if (!county) {
        throw new NotFoundException('شهرستان یافت نشد');
      }
      user.county = county;
    }

    // Update unit if provided
    if (updateUserDto.unit) {
      const unit = await this.unitRepository.findOne({
        where: { id: updateUserDto.unit },
      });
      if (!unit) {
        throw new NotFoundException('واحد یافت نشد');
      }
      user.unit = unit;
    }

    // Save the updated user with related entities
    return await this.userRepository.save(user);
  }

  /**
   * this function is used to remove or delete user from database.
   * @param id is the type of number, which represent id of user
   * @returns nuber of rows deleted or affected
   */
  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }

  async updatePassword(userId: number, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOneByOrFail({ id: userId });
    user.password = newPassword;
    await this.userRepository.save(user);
  }
}
