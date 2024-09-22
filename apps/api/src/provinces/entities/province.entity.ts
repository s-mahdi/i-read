import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { County } from '../../counties/entities/county.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => County, (county) => county.province, { cascade: true })
  counties: County[];

  @OneToMany(() => User, (user) => user.province)
  users: User[];
}
