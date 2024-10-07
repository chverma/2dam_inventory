import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { default as IssuesConversationData } from '../data/issues_conversation';
import { UtilsService } from 'src/utils/utils.service';
import { CreateIssueConversationDto } from './issues_conversation.dto';

@Injectable()
export class IssueConversationService {
  constructor(private readonly utilsService: UtilsService) {}
  private currentId = IssuesConversationData.length;

  getIssueConversation(id: number, xml?: string) {
    // Filtrar las conversaciones que coinciden con el id de la issue
    const conversations = IssuesConversationData.filter(
      (conversation) => conversation.id_issue === id,
    );

    if (conversations.length === 0) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    // Si se solicita en formato XML
    if (xml === 'true') {
      const jsonFormatted = JSON.stringify({ Conversations: conversations });
      return this.utilsService.convertJSONtoXML(jsonFormatted);
    }

    return { Conversations: conversations };
  }

  addIssueConversation(dto: CreateIssueConversationDto) {
    //creacion de id y fecha automaticas
    const newId = IssuesConversationData.length + 1;
    const createdAt = new Date().toISOString();

    // Comprobar que al menos uno de los IDs esté presente
    if (!dto.userId && !dto.tecnicId) {
      throw new HttpException(
        'Debe registrarse para poder escribir una nota',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Crear el objeto de la nueva conversación
    const newConversation = {
      id_issue_conversation: newId,
      id_issue: dto.id_issue,
      created_at: createdAt,
      id_user: dto.userId || null,
      id_tecnic: dto.tecnicId || null,
      notes: dto.notes,
    };

    IssuesConversationData.push(newConversation); // Agregar la nueva conversación a la lista
    return newConversation;
  }
}
