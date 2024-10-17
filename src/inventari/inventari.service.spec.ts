import { Test, TestingModule } from '@nestjs/testing';
import { InventariService } from './inventari.service';

describe('InventariService', () => {
  let service: InventariService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventariService],
    }).compile();

    service = module.get<InventariService>(InventariService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new inventory item (POST)', async () => {
    const headersList: HeadersInit = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    const bodyContent = JSON.stringify({
      "id_inventory": 1,
      "num_serie": "kg273965",
      "id_type": 2,
      "brand": "HP",
      "model": "Pavilion",
      "GVA_cod_article": 1,
      "GVA_description_cod_articulo": "portatil para clase",
      "status": "usando",
      "id_classroom": 1,
    });

    const response = await fetch("http://localhost:8080/inventari/", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    expect(response.status).toBe(201); 
    const data = await response.json();
    expect(data).toHaveProperty('id_inventory'); 
  });
});

async function fetchInventory(): Promise<void> {
  const headersList: HeadersInit = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)"
  };

  try {
    const response = await fetch("http://localhost:8080/inventari/3", { 
      method: "GET",
      headers: headersList
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error("HTTP Error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function updateInventoryStatus(): Promise<void> {
  const headersList: HeadersInit = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    "status": "disponible",
  });

  try {
    const response = await fetch("http://localhost:8080/inventari/3", {
      method: "PUT",
      body: bodyContent,
      headers: headersList,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}
fetchInventory();
updateInventoryStatus();
