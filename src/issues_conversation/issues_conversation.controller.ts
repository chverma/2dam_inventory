import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  Body,
  Post,
} from '@nestjs/common';
import { IssueConversationService } from './issues_conversation.service';
import { CreateIssueConversationDto } from './issues_conversation.dto';

@Controller('issue_conversation')
export class IssueConversationController {
  constructor(
    private readonly issueConversationService: IssueConversationService,
  ) {}

  @Get(':id')
  getIssueConversation(@Param('id') id: string, @Query('xml') xml?: string) {
    const issueConversationId = parseInt(id);
    if (isNaN(issueConversationId)) {
      throw new HttpException('Invalid issue ID', HttpStatus.BAD_REQUEST);
    }
    return this.issueConversationService.getIssueConversation(
      issueConversationId,
      xml,
    );
  }

  @Post()
  postIssueConversation(
    @Body() createIssueConversationDto: CreateIssueConversationDto,
  ) {
    const { id_issue, notes } = createIssueConversationDto;

    // Validar que el id_issue y notes están presentes
    if (!id_issue || !notes) {
      throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    }

    return this.issueConversationService.addIssueConversation(
      createIssueConversationDto,
    );
  }
}
