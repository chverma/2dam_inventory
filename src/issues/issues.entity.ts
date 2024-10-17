import { IssueConversationEntity } from 'src/issues_conversation/issues_conversation.entity';
import { Inventari } from '../inventari/inventari.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id_issue: number;

  @Column()
  id_inventory: number;

  @Column()
  created_at: string;

  @Column('text')
  description: string;

  @Column()
  id_status: number;

  @Column()
  id_user: number;

  @Column()
  id_tecnic: number;

  @Column()
  last_updated: string;

  @Column('text')
  notes: string;

  @OneToMany(
    () => IssueConversationEntity,
    (issueConversation) => issueConversation.issue,
  )
  conversations: IssueConversationEntity[];

  @OneToOne(() => Inventari, fk_inventari => fk_inventari.fk_issue)
  @JoinColumn({ name: 'id_inventory' })
  inventari: Inventari;
  fk_inventari: any;
}
