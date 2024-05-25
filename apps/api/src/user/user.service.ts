import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { getNextNonHolidayDates } from '../utils/calendarUtils';
import { VersesService } from '../verses/verses.service';
import { SchedulesService } from '../schedules/schedules.service';
import { CreateScheduleDto } from '../schedules/dto/create-schedule.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly versesService: VersesService,
    private readonly dataSource: DataSource,
    private readonly schedulesService: SchedulesService
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

    const user = new User();
    user.name = createUserDto.name;
    user.lastName = createUserDto.lastName;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.rank = createUserDto.rank;
    user.nationalCode = createUserDto.nationalCode;

    const startDate = new Date();
    const nonHolidayDates = await getNextNonHolidayDates(startDate, 125);

    return this.dataSource.transaction(async (manager) => {
      const savedUser = await manager.save(User, user);

      const schedules = await Promise.all(
        nonHolidayDates.map(async (date, index) => {
          const startVerseId = 1 + 50 * index;
          const suraList = await this.versesService.getSuraListFromStartVerseId(
            startVerseId,
            50
          );
          const createScheduleDto: CreateScheduleDto = {
            date: date.toISOString(),
            isRead: false,
            startVerseId,
            suraList,
            user: savedUser,
          };
          return this.schedulesService.create(createScheduleDto, manager);
        })
      );

      savedUser.schedules = schedules;
      await manager.save(User, savedUser);

      return manager.findOne(User, {
        where: { username: createUserDto.username },
        relations: ['schedules'],
      });
    });
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  findOne(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { id },
      relations: ['schedules'],
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
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.name = updateUserDto.name;
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.id = id;
    return this.userRepository.save(user);
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
