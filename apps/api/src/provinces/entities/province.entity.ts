import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { County } from '../../counties/entities/county.entity';

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => County, (county) => county.province, { cascade: true })
  counties: County[];
}
