import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Schedule } from '../../schedules/entities/schedule.entity';
import { Role } from '../../@types/roles.enum';
import { Province } from '../../provinces/entities/province.entity';
import { County } from '../../counties/entities/county.entity';
import { Unit } from '../../units/entities/unit.entity';

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

  @ManyToOne(() => Province, { nullable: true })
  province?: Province;

  @ManyToOne(() => County, { nullable: true })
  county?: County;

  @ManyToOne(() => Unit, { nullable: true })
  unit?: Unit;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.user, { cascade: true })
  schedules: Schedule[];
}
