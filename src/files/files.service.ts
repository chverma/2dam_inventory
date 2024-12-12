import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import {
  GridFSBucket,
  GridFSBucketReadStream,
  MongoClient,
  ObjectId,
} from 'mongodb';
import { FileInfoVm } from './view-models/file-info-vm.model';

@Injectable()
export class FilesService {
  private fileModel: MongoGridFS;
  private bucket: GridFSBucket;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
    const client = new MongoClient(process.env.MONGODB_URI);
    client.connect().then(() => {
      const db = client.db('test');
      this.bucket = new GridFSBucket(db, { bucketName: 'fs' });
    });
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    console.log('Starting readStream with id:', id);

    try {
      const objectId = new ObjectId(id);
      console.log('Converted id to ObjectId:', objectId);

      const filestream = await this.fileModel.readFileStream(objectId.toString());
      if (!filestream) {
        console.error('File stream not found for id:', id);
        throw new HttpException('File stream not found', HttpStatus.NOT_FOUND);
      }

      console.log('File stream retrieved successfully');
      return filestream;
    } catch (error) {
      console.error('Error in readStream for id:', id, error);
      throw new HttpException('Error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED);
    }
  }

  async findInfo(id: string): Promise<FileInfoVm> {
    console.log('Starting findInfo with id:', id);

    try {
      const objectId = new ObjectId(id);
      console.log('Converted id to ObjectId:', objectId);

      // const result = await this.fileModel.findById(objectId.toString());
      // if (!result) {
      //   console.error('File not found for id:', id);
      //   throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      // }

      // console.log('File info found:', result);
      // return {
      //   filename: result.filename,
      //   length: result.length,
      //   chunkSize: result.chunkSize,
      //   contentType: result.contentType,
      // };
      return null;
    } catch (error) {
      console.error('Error in findInfo for id:', id, error);
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteFile(id: string): Promise<boolean> {
    console.log('Starting deleteFile with id:', id);

    try {
      const objectId = new ObjectId(id);
      console.log('Converted id to ObjectId:', objectId);

      const result = await this.fileModel.delete(objectId.toString());
      if (result) {
        console.log('File deleted successfully:', id);
        return true;
      } else {
        console.error('Failed to delete file, file not found for id:', id);
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error('Error in deleteFile for id:', id, error);
      throw new HttpException('Error occurred while deleting file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async processJsonStream(fileId: ObjectId): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
      const stream = this.bucket.openDownloadStream(fileId);
      let jsonString = '';

      stream
        .on('data', (chunk) => {
          jsonString += chunk.toString();
        })
        .on('end', () => {
          try {
            const data = JSON.parse(jsonString);
            if (!Array.isArray(data)) {
              throw new Error('El JSON no contiene un array válido.');
            }
            const secondElement = data[1];
            if (
              secondElement &&
              secondElement.values &&
              secondElement.values.serial_number
            ) {
              resolve(secondElement.values.serial_number);
            } else {
              console.warn('El segundo elemento no contiene "serial_number".');
              resolve(null);
            }
          } catch (error) {
            reject(`Error al parsear el JSON: ${error.message}`);
          }
        })
        .on('error', (err) => {
          reject(`Error al leer el archivo: ${err.message}`);
        });
    });
  }
}
