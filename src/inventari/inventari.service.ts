import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventari } from './inventari.entity';
import { UtilsService } from '../utils/utils.service';
import { CreateInventariDto, UpdateInventariDto } from './inventari.dto';
import { LabelsService } from 'src/utils/labels.service';
import { Readable } from 'stream';

@Injectable()
export class InventariService {
  constructor(
    private readonly utilsService: UtilsService,
    private readonly labelsService: LabelsService,
    @InjectRepository(Inventari)
    private readonly inventariRepository: Repository<Inventari>,
  ) {}

  async getInventari(id?: number, xml?: string): Promise<any> {
    const result = await this.inventariRepository.findOneBy({
      id_inventory: id,
    });

    if (xml === 'true') {
      const jsonFormatted = JSON.stringify({
        Inventari: this.inventariRepository.find(),
      });
      const xmlResult = this.utilsService.convertJSONtoXML(jsonFormatted);
      return xmlResult;
    }

    return result;
  }

  async getInventariAll(xml?: string): Promise<any> {
    const result = await this.inventariRepository.find({
      relations: ['fk_inventary_type', 'fk_issue', 'fk_classroom'],
    });
    if (xml === 'true') {
      const jsonFormatted = JSON.stringify({
        Inventari: result,
      });
      const xmlResult = this.utilsService.convertJSONtoXML(jsonFormatted);
      return xmlResult;
    }

    return result;
  }

  async createInventari(
    createInventariDto: CreateInventariDto,
  ): Promise<{ message: string }> {
    const newInventari = this.inventariRepository.create({
      ...createInventariDto,
      fk_inventary_type: { id_type: createInventariDto.id_type },
      fk_classroom: { id_classroom: createInventariDto.id_classroom },
    });
    const text_etiqueta =
      newInventari.fk_inventary_type.description +
      ' ' +
      newInventari.model +
      '(' +
      newInventari.brand +
      ')';

    newInventari.text_etiqueta = text_etiqueta;
    await this.inventariRepository.save(newInventari);
    return { message: 'Inventario creado' };
  }

  async updateInventari(id: number, inventariDto: UpdateInventariDto) {
    const updatedData = {
      ...inventariDto,
      fk_inventary_type: { id_type: inventariDto.id_type },
      fk_classroom: { id_classroom: inventariDto.id_classroom },
    };

    const inventari = await this.inventariRepository.findOneBy({
      id_inventory: id,
    });
    const text_etiqueta =
      inventari.fk_inventary_type.description +
      ' ' +
      inventari.model +
      '(' +
      inventari.brand +
      ')';

    inventari.text_etiqueta = text_etiqueta;
    if (!inventari) {
      throw new HttpException('Inventario no encontrado', HttpStatus.NOT_FOUND);
    }
    this.inventariRepository.merge(inventari, updatedData);
    return this.inventariRepository.save(inventari);
  }

  async deleteInventari(id: number): Promise<{ message: string }> {
    const result = await this.inventariRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Inventario no encontrado', HttpStatus.NOT_FOUND);
    }
    return { message: 'Inventario eliminado' };
  }

  async generate_qr(inventoryIdItems: any, res: any) {
    try {
      const inventoryItems = await this.inventariRepository.find({
        relations: ['fk_inventary_type', 'fk_issue', 'fk_classroom'],
        where: inventoryIdItems,
      });

      const filterInventoryItems = inventoryItems.filter((item) =>
        inventoryIdItems.includes(item.id_inventory),
      );
      this.labelsService.generateLabels(filterInventoryItems, res);
    } catch (error) {
      throw new HttpException(
        'Inventario no encontrado' + error,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async processCsvStream(fileBuffer: Buffer): Promise<any[]> {
    const stream = new Readable();
    stream.push(fileBuffer);
    stream.push(null);

    const rows = [];
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const parser = require('csv-parser');

    await new Promise<void>((resolve, reject) => {
      stream
        .pipe(parser({ separator: ';' }))
        .on('data', (data) => rows.push(data))
        .on('end', resolve)
        .on('error', reject);
    });

    const matches = [];

    for (const row of rows) {
      const numSerie = row['Número de serie'];

      const inventoryItem = await this.inventariRepository.findOneBy({
        num_serie: numSerie,
      });

      if (inventoryItem) {
        inventoryItem.GVA_cod_article = row['GVA - Codi Article'];
        inventoryItem.GVA_id_glpi = parseInt(row['GVA_id_glpi'], 10);
        inventoryItem.GVA_description_cod_articulo =
          row['GVA - Descripció Codi Article'];

        await this.inventariRepository.save(inventoryItem);

        matches.push(inventoryItem);
      } else {
        console.log(
          `No se encontró coincidencia para Número de serie: ${numSerie}`,
        );
      }
    }

    console.log('Actualizaciones realizadas en las coincidencias:', matches);
    return matches;
  }
}
