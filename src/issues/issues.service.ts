import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { Issue } from './issues.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIssueDto, UpdateIssueDto } from './issues.dto';
import { User } from '../users/users.entity';
import { Status } from '../status/status.entity';
import { Inventari } from '../inventari/inventari.entity';

@Injectable()
export class IssuesService {
  constructor(
    private readonly UtilsService: UtilsService,
    @InjectRepository(Issue) private issueRepository: Repository<Issue>,
  ) {}

  async getAllIssues(xml?: string): Promise<Issue[] | string> {
    const allIssues = await this.issueRepository.find();
    if (xml === 'true') {
      const jsonForXml = JSON.stringify({ Issues: allIssues });
      const xmlResult = this.UtilsService.convertJSONtoXML(jsonForXml);
      return xmlResult;
    } else {
      return allIssues;
    }
  }

  async createIssue(issueDto: CreateIssueDto): Promise<Issue> {
    try {
      const newIssue = this.issueRepository.create({
        description: issueDto.description,
        notes: issueDto.notes,
        user: { id_user: issueDto.user } as User,
        technician: { id_user: issueDto.technician } as User,
        status: { id_status: issueDto.status } as Status,
        fk_inventari: { id_inventory: issueDto.fk_inventari } as Inventari,
      });
      return await this.issueRepository.save(newIssue);
    } catch (error) {
      console.error('Error in createIssue:', error);
      throw new HttpException(
        'Error creating issue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getIssue(id: number, xml?: string): Promise<Issue | string | null> {
    const issue = await this.issueRepository.findOneBy({ id_issue: id });
    if (!issue) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    if (xml === 'true') {
      const jsonForXml = JSON.stringify(issue);
      return this.UtilsService.convertJSONtoXML(jsonForXml);
    } else {
      return issue;
    }
  }

  async updateIssue(id: number, issueDto: UpdateIssueDto): Promise<Issue> {
    const existingIssue = await this.issueRepository.findOneBy({
      id_issue: id,
    });
    if (!existingIssue) {
      throw new HttpException('Issue not found', HttpStatus.NOT_FOUND);
    }

    const updatedFields = {
      description: issueDto.description ?? existingIssue.description,
      notes: issueDto.notes ?? existingIssue.notes,
      user: issueDto.user
        ? ({ id_user: issueDto.user } as User)
        : existingIssue.user,
      technician: issueDto.technician
        ? ({ id_user: issueDto.technician } as User)
        : existingIssue.technician,
      status: issueDto.status
        ? ({ id_status: issueDto.status } as Status)
        : existingIssue.status,
      fk_inventari: issueDto.fk_inventari
        ? ({ id_inventory: issueDto.fk_inventari } as Inventari)
        : existingIssue.fk_inventari,
    };

    try {
      await this.issueRepository.update(id, updatedFields);
      return this.issueRepository.findOneBy({ id_issue: id });
    } catch (error) {
      console.error('Error in updateIssue:', error);
      throw new HttpException(
        'Error updating issue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteIssue(id: number): Promise<void> {
    await this.issueRepository.delete(id);
  }
}
