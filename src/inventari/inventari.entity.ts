import { Inventari_type } from 'src/inventari_type/inventari_type.entity';
import { Issue } from '../issues/issues.entity';
import { Classroom } from '../classroom/classroom.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';

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

  @ManyToOne(() => Inventari_type, fk_inventary_type => fk_inventary_type.fk_inventari)
  fk_inventary_type: Inventari_type;

  @OneToOne(() => Issue, fk_issue => fk_issue.fk_inventari)
  fk_issue: Issue;

  @ManyToOne(() => Classroom, fk_classroom => fk_classroom.fk_inventari)
  fk_classroom: Classroom;
}
