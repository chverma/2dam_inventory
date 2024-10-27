import { setSeederFactory } from 'typeorm-extension';
import { Inventari } from '../../../inventari/inventari.entity';
import { faker } from '@faker-js/faker';

export const InventariFactory = setSeederFactory(Inventari, () => {
  const inventari = new Inventari();
  inventari.num_serie = faker.string.alphanumeric(8); 
  inventari.brand = faker.company.name(); 
  inventari.model = faker.commerce.productName(); 
  inventari.GVA_cod_article = faker.number.int({ min: 1, max: 10 }); 
  inventari.GVA_description_cod_articulo = faker.commerce.productDescription(); 
  inventari.status = faker.helpers.arrayElement(['usando', 'disponible', 'reparación']);
  return inventari;
});
