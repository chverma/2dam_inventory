import { Test, TestingModule } from '@nestjs/testing';
import { StatusService } from './status.service';

describe('StatusService', () => {
  let service: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusService],
    }).compile();

    service = module.get<StatusService>(StatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

const fetchStatus = async (): Promise<void> => {
  const headersList = {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    'Content-Type': 'application/json',
  };

  const response = await fetch('http://localhost:8080/status', {
    method: 'GET',
    headers: headersList,
  });

  const data = await response.text();
  console.log(data);
};

const sendRequest = async (): Promise<void> => {
  const headersList = {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    'Content-Type': 'application/json',
  };

  const bodyContent = {
    id_status: 1,
    description: 'Eliminada',
  };

  try {
    const response = await fetch('http://localhost:8080/status', {
      method: 'POST',
      body: JSON.stringify(bodyContent),
      headers: headersList,
    });

    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

async function updateStatus(): Promise<string> {
  const headersList: HeadersInit = {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    'Content-Type': 'application/json',
  };
  const bodyContent = {
    id_status: 1,
    description: 'Eliminada',
  };
  const response: Response = await fetch(
    `http://localhost:8080/status/${bodyContent.id_status}`,
    {
      method: 'PUT',
      body: JSON.stringify(bodyContent),
      headers: headersList,
    },
  );

  const data: string = await response.text();
  return data;
}
sendRequest();
fetchStatus();
updateStatus();
