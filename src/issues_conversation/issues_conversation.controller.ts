import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Body,
  Post,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { IssueConversationService } from './issues_conversation.service';
import { CreateIssueConversationDto } from './issues_conversation.dto';

@Controller('issue_conversation')
export class IssueConversationController {
  constructor(
    private readonly issueConversationService: IssueConversationService,
  ) {}

  @Get(':id')
  async getIssueConversation(
    @Param('id') id: string,
    @Query('xml') xml: string,
  ) {
    const issueConversationId = parseInt(id);
    if (isNaN(issueConversationId)) {
      throw new HttpException('Invalid issue ID', HttpStatus.BAD_REQUEST);
    }

    const conversations =
      await this.issueConversationService.getConversationsByIssueId(
        issueConversationId,
        xml,
      );

    return conversations;
  }

  @Post()
  createIssueConversation(
    @Body() createIssueConversationDto: CreateIssueConversationDto,
  ) {
    return this.issueConversationService.addIssueConversation(
      createIssueConversationDto,
    );
  }

  @Delete(':id')
  deleteIssueConversation(@Param('id') id: string) {
    const conversationId = parseInt(id);
    if (isNaN(conversationId)) {
      throw new HttpException(
        'Invalid conversation ID',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.issueConversationService.deleteIssueConversation(
      conversationId,
    );
  }

  @Put(':id')
  updateIssueConversation(
    @Param('id') id: string,
    @Body('notes') notes: string,
  ) {
    const conversationId = parseInt(id);
    if (isNaN(conversationId)) {
      throw new HttpException(
        'Invalid conversation ID',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!notes) {
      throw new HttpException('Notes cannot be empty', HttpStatus.BAD_REQUEST);
    }

    return this.issueConversationService.updateIssueConversation(
      conversationId,
      notes,
    );
  }
}
