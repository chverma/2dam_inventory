import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventari {
  @PrimaryGeneratedColumn()
  id_inventory: number;

  @Column()
  num_serie: string;

  @Column()
  id_type: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  GVA_cod_article: number;

  @Column()
  GVA_description_cod_articulo: string;

  @Column()
  status: string;

  @Column()
  id_classroom: number;
}