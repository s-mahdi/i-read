import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Verse {
  @PrimaryColumn()
  id: number;

  @Column()
  order: number;

  @Column()
  sura: string;

  @Column()
  suraId: number;

  @Column()
  text: string;

  @Column()
  translation: string;

  @Column()
  audioUrl: string;
}
