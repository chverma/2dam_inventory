import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStatusDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber({}, { each: true })
  issues?: number[];
}