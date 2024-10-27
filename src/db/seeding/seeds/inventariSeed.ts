import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Inventari } from '../../../inventari/inventari.entity';
import { Inventari_type } from '../../../inventari_type/inventari_type.entity';
import { Classroom } from '../../../classroom/classroom.entity';
import inventoryData from '../../../data/inventory'; 

export class InevntariSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const inventariRepository = dataSource.getRepository(Inventari);
    const inventariTypeRepository = dataSource.getRepository(Inventari_type);
    const classroomRepository = dataSource.getRepository(Classroom);

    const inventariTypes = await inventariTypeRepository.find();
    const classrooms = await classroomRepository.find();
    
    const inventoryEntries = inventoryData.map(item => {
      const inventariEntry = new Inventari();
      inventariEntry.num_serie = item.num_serie;
      inventariEntry.brand = item.brand;
      inventariEntry.model = item.model;
      inventariEntry.GVA_cod_article = item.GVA_cod_article;
      inventariEntry.GVA_description_cod_articulo = item.GVA_description_cod_articulo;
      inventariEntry.status = item.status;
      inventariEntry.fk_inventary_type = inventariTypes.find(type => type.id_type === item.id_type);
      inventariEntry.fk_classroom = classrooms.find(classroom => classroom.id_classroom === item.id_classroom);

      return inventariEntry;
    });

    await inventariRepository.save(inventoryEntries);

    console.log('Inventari seeding completed!');
  }
}
