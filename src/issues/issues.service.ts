import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
const fs = require('node:fs');
const path = require('path');
const filePath = path.join(
  path.resolve(__dirname, '..'),
  'data/inventory_issues.json',
);
const issuesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function saveData() {
  fs.writeFileSync(filePath, JSON.stringify(issuesData));
}
@Injectable()
export class IssuesService {
  getAllIssues() {
    return issuesData;
  }
  createIssue(Issue: any) {
    issuesData.push({
      id_issue: issuesData[issuesData.length - 1].id_issue + 1,
      ...Issue,
    });
    saveData();
    return { message: 'Estado creado satisfactoriamente' };
  }

  getIssue(idIssue: number) {
    let contadorIssues = 0;
    while (
      contadorIssues < issuesData.length &&
      issuesData[contadorIssues].id_issue != idIssue
    ) {
      contadorIssues++;
    }
    if (issuesData[contadorIssues]) return issuesData[contadorIssues];
    else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  updateIssue(IssueUpdated) {
    let contadorIssues = 0;
    while (
      contadorIssues < issuesData.length &&
      issuesData[contadorIssues].id_issue != IssueUpdated.id_issue
    ) {
      contadorIssues++;
    }
    if (issuesData[contadorIssues]) {
      issuesData[contadorIssues] = IssueUpdated;
      return issuesData[contadorIssues];
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
  deleteIssue(id: number) {
    let contadorIssues = 0;
    while (
      contadorIssues < issuesData.length &&
      issuesData[contadorIssues].id_issue != id
    ) {
      contadorIssues++;
    }
    if (issuesData[contadorIssues]) {
      return issuesData.splice(contadorIssues, 1);
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
