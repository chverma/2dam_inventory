import { Module } from '@nestjs/common';
import { IssueConversationController } from './issues_conversation.controller';
import { IssueConversationService } from './issues_conversation.service';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
  controllers: [IssueConversationController],
  providers: [IssueConversationService],
})
export class IssuesConversationModule {}
