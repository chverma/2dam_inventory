import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IssueConversationEntity } from './issues_conversation.entity';
import { UtilsService } from '../utils/utils.service';
@Injectable()
export class IssueConversationService {
  constructor(
    private readonly utilsService: UtilsService,
    @InjectRepository(IssueConversationEntity)
    private readonly issueConversationRepository: Repository<IssueConversationEntity>,
  ) {}

  async getIssueConversation(id_issue: number, xml?: string) {
    const conversations = await this.issueConversationRepository.find({
      where: {
        issue: {
          id_issue: id_issue,
        },
      },
    });

    if (conversations.length === 0) {
      throw new HttpException('No conversations found', HttpStatus.NOT_FOUND);
    }

    if (xml === 'true') {
      const jsonformatted = JSON.stringify({
        IssuesConversations: this.issueConversationRepository.find({
          where: {
            issue: {
              id_issue: id_issue,
            },
          },
        }),
      });
      const xmlResult = this.utilsService.convertJSONtoXML(jsonformatted);
      return xmlResult;
    } else {
      return { conversations };
    }
  }

  async createIssueConversation(body: any) {
    const { id_issue, id_user, notes } = body;

    const newConversation = this.issueConversationRepository.create({
      issue: id_issue,
      user: id_user,
      notes: notes,
      create_at: new Date(),
    });

    return newConversation;
  }

  async deleteIssueConversation(id: number) {
    const result = await this.issueConversationRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('Conversation not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Conversacion eliminada' };
  }

  async updateIssueConversation(id: number, notes: string) {
    const conversation = await this.issueConversationRepository.findOneBy({
      id,
    });

    if (!conversation) {
      throw new HttpException(
        'Conversacion no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    conversation.notes = notes;
    return this.issueConversationRepository.save(conversation);
  }
}
