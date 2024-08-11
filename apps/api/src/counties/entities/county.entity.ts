import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Province } from '../../provinces/entities/province.entity';

@Entity()
export class County {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Province, (province) => province.counties)
  province: Province;
}
