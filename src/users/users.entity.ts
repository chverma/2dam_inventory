import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { IssueConversationEntity } from '../issues_conversation/issues_conversation.entity';
import { Issue } from 'src/issues/issues.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column({ default: 0 })
  role: number;

  @OneToMany(
    () => IssueConversationEntity,
    (issueConversation) => issueConversation.user,
  )
  @JoinColumn()
  issueConversations: IssueConversationEntity[];
  @OneToMany(() => Issue, (issue) => issue.user)
  issues: Issue[];

  @OneToMany(() => Issue, (issue) => issue.technician)
  assignedIssues: Issue[];
}
