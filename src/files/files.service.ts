import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import { GridFSBucketReadStream, ObjectId } from 'mongodb';
import { FileInfoVm } from './view-models/file-info-vm.model';

@Injectable()
export class FilesService {
  private fileModel: MongoGridFS;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
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

      const result = await this.fileModel.findById(objectId.toString());
      if (!result) {
        console.error('File not found for id:', id);
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }

      console.log('File info found:', result);
      return {
        filename: result.filename,
        length: result.length,
        chunkSize: result.chunkSize,
        contentType: result.contentType,
      };
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
}
