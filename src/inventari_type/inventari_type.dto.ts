import { IsString, IsOptional } from 'class-validator';

export class CreateInventariTypeDto {
  @IsString()
  description: string;
}

export class UpdateInventariTypeDto {
  @IsOptional()
  @IsString()
  description?: string;
}
