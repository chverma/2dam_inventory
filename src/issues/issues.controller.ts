import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpStatus,
  HttpException,
  Body,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
@Controller('issues')
export class IssuesController {
  private IssuesService: IssuesService;
  constructor(IssuesService: IssuesService) {
    this.IssuesService = IssuesService;
  }
  @Get()
  getAllStatus() {
    try {
      return this.IssuesService.getAllIssues();
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: err,
        },
      );
    }
  }

  @Post()
  createIssue(@Body() Issue) {
    return this.IssuesService.createIssue(Issue);
  }

  @Get(':id')
  getIssue(@Param('id') id: string) {
    return this.IssuesService.getIssue(parseInt(id));
  }

  @Put(':id')
  updateIssue(@Param('id') id: string, @Body() Issue) {
    return this.IssuesService.updateIssue({
      ...Issue,
      id_issue: parseInt(id),
    });
  }

  @Delete(':id')
  deleteIssue(@Param('id') id: string) {
    return this.IssuesService.deleteIssue(parseInt(id));
  }
}
