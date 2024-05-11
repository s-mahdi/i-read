import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

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
  rank: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user', 'employee'],
    default: 'user',
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'jsonb', default: [] })
  schedule: {
    date: string;
    isRead: boolean;
    suraList: string[];
    startVerseId: number;
  }[];
}
