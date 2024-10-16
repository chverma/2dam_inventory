import { Test, TestingModule } from '@nestjs/testing';
import { InventariTypeService } from './inventari_type.service';

describe('InventariTypeService', () => {
  let service: InventariTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventariTypeService],
    }).compile();

    service = module.get<InventariTypeService>(InventariTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

interface InventariType {
  id_type: number;
  description: string;
}

const headersList: HeadersInit = {
  Accept: '*/*',
  'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
  'Content-Type': 'application/json',
};

async function fetchInventariTypes(): Promise<void> {
  try {
    const response: Response = await fetch('http://localhost:8080/inventari_type/', {
      method: 'GET',
      headers: headersList,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: InventariType[] = await response.json();
    console.log('GET response data:', data);
  } catch (error) {
    console.error('Error fetching inventari types:', error);
  }
}

async function createInventariType(): Promise<void> {
  const bodyContent: string = JSON.stringify({
    id: 1,
    descripcion: 'Telefono',
  });

  try {
    const response: Response = await fetch('http://localhost:8080/inventari_type', {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: string = await response.text();
    console.log('POST response data:', data);
  } catch (error) {
    console.error('Error creating inventari type:', error);
  }
}

async function updateInventariType(): Promise<void> {
  const bodyContent: string = JSON.stringify({
    descripcion: 'Playstation',
  });

  try {
    const response: Response = await fetch('http://localhost:8080/inventari_type/1', {
      method: 'PUT',
      body: bodyContent,
      headers: headersList,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: string = await response.text();
    console.log('PUT response data:', data);
  } catch (error) {
    console.error('Error updating inventari type:', error);
  }
}

fetchInventariTypes();
createInventariType();
updateInventariType();
