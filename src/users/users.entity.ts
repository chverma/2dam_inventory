import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IssueConversationEntity } from 'src/issues_conversation/issues_conversation.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  surnamea: string;

  @Column()
  email: string;

  @Column({ default: 0 })
  role: number;

  @OneToMany(
    () => IssueConversationEntity,
    (issueConversation) => issueConversation.user,
  )
  issueConversations: IssueConversationEntity[];
}
