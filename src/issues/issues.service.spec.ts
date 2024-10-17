import { Test, TestingModule } from '@nestjs/testing';
import { IssuesService } from './issues.service';

describe('IssuesService', () => {
  let service: IssuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssuesService],
    }).compile();

    service = module.get<IssuesService>(IssuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

async function fetchIssues(): Promise<void> {
  const headersList: { [key: string]: string } = {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
  };

  try {
    const response = await fetch('http://localhost:8080/issues/', {
      method: 'GET',
      headers: headersList,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: string = await response.text();
    console.log(data);
  } catch (error) {
    console.error('Error fetching issues:', error);
  }
}

async function postIssues(): Promise<void> {
  const headersList: HeadersInit = {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    'Content-Type': 'application/json',
  };

  const bodyContent = JSON.stringify({
    id_issue: 2,
    id_inventory: 4,
    created_at: '18/09/2024',
    description: 'Lorem ipsum.',
    id_status: 1,
    id_user: 1,
    id_tecnic: 3,
    last_updated: '18/09/2024',
    notes: 'Lorem ipsum.',
  });

  try {
    const response = await fetch('http://localhost:8080/issues', {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    });

    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error('Error posting issues:', error);
  }
}

async function putIssues(): Promise<void> {
  const headersList: HeadersInit = {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    'Content-Type': 'application/json',
  };

  const bodyContent = JSON.stringify({
    notes: 'Lorem hola.',
  });

  try {
    const response = await fetch('http://localhost:8080/issues/3', {
      method: 'PUT',
      body: bodyContent,
      headers: headersList,
    });

    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error('Error updating issue:', error);
  }
}

fetchIssues();
postIssues();
putIssues();
