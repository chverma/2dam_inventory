import { IssueConversationEntity } from 'src/issues_conversation/issues_conversation.entity';
import { User } from '../users/users.entity';
import { Status } from '../status/status.entity';
import { Inventari } from '../inventari/inventari.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id_issue: number;

  @Column()
  created_at: string;

  @Column('text')
  description: string;

  @Column()
  last_updated: string;

  @Column('text')
  notes: string;

  @OneToMany(
    () => IssueConversationEntity,
    (issueConversation) => issueConversation.issue,
  )
  conversations: IssueConversationEntity[];

  @ManyToOne(() => User, (user) => user.issues)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => User, (user) => user.assignedIssues)
  @JoinColumn({ name: 'id_tecnic' })
  technician: User;

  @ManyToOne(() => Status, (status) => status.issues)
  @JoinColumn({ name: 'id_status' })
  status: Status;

  @OneToOne(() => Inventari, (fk_inventari) => fk_inventari.fk_issue)
  @JoinColumn({ name: 'id_inventory' })
  fk_inventari: Inventari;
}
