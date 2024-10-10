import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IssueConversationEntity } from 'src/issues_conversation/issues_conversation.entity';
@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => IssueConversationEntity,
    (issueConversation) => issueConversation.id_issue,
  )
  issueConversations: IssueConversationEntity[];
}
