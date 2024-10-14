import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IssueConversationEntity } from './issues_conversation.entity';
import { CreateIssueConversationDto } from './issues_conversation.dto';
import { UtilsService } from 'src/utils/utils.service';
@Injectable()
export class IssueConversationService {
  constructor(
    private readonly utilsService: UtilsService,
    @InjectRepository(IssueConversationEntity)
    private readonly issueConversationRepository: Repository<IssueConversationEntity>,
  ) {}

  async getConversationsByIssueId(issueId: number, xml: string) {
    const conversations = await this.issueConversationRepository.find({
      where: { id_issue: { id: issueId } },
      relations: ['user'], //posiblemente no sea necesario
      order: { create_at: 'ASC' },
    });

    if (conversations.length === 0) {
      throw new HttpException('No conversations found', HttpStatus.NOT_FOUND);
    }

    if (xml === 'true') {
      const jsonformatted = JSON.stringify({
        IssuesConversations: this.issueConversationRepository.find(),
      });
      const xmlResult = this.utilsService.convertJSONtoXML(jsonformatted);
      return xmlResult;
    } else {
      return { conversations };
    }
  }

  async addIssueConversation(dto: CreateIssueConversationDto) {
    // if (!dto.userId && !dto.tecnicId) {
    //   throw new HttpException(
    //     'Debe registrarse para poder escribir una nota',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    // Crear la nueva conversación
    const newConversation = this.issueConversationRepository.create({
      id_issue: { id: dto.id_issue },
      user: { id: dto.userId },
      notes: dto.notes,
      create_at: new Date(),
    });

    return this.issueConversationRepository.save(newConversation);
  }

  // Método para eliminar una conversación por su id
  async deleteIssueConversation(id: number) {
    const result = await this.issueConversationRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('Conversation not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Conversacion eliminada' };
  }

  // Método para actualizar una conversación por su id
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
