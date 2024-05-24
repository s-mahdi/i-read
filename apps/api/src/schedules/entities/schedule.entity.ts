import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  isRead: boolean;

  @Column('simple-array')
  suraList: string[];

  @Column()
  startVerseId: number;

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;
}
