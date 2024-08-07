import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Schedule } from '../../schedules/entities/schedule.entity';
import { Role } from '../../@types/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  rank?: string;

  @Column({ nullable: true })
  nationalCode?: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.user, { cascade: true })
  schedules: Schedule[];
}
