import { Inventari } from 'src/inventari/inventari.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Inventari_type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @OneToMany(() => Inventari, (fk_inventari) => fk_inventari.fk_inventary_type)
  fk_inventari: Inventari[];
}
