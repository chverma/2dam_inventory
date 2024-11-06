import { IsInt, IsOptional, IsString, Length, IsDate } from 'class-validator';

export class CreateIssueDto {
  @IsOptional()
  @IsInt()
  id_issue: number;

  @IsOptional()
  @IsDate()
  created_at: Date;

  @IsString()
  @Length(1, 100)
  description: string;

  @IsOptional()
  @IsDate()
  last_updated: Date;

  @IsString()
  @Length(1, 100)
  notes: string;

  @IsInt()
  user: number;

  @IsInt()
  technician: number;

  @IsInt()
  status: number;

  @IsInt()
  fk_inventari: number;
}

export class UpdateIssueDto {
  @IsOptional()
  @IsInt()
  id_issue?: number;

  @IsOptional()
  @IsDate()
  created_at?: Date;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  description?: string;

  @IsOptional()
  @IsDate()
  last_updated?: Date;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  notes?: string;

  @IsOptional()
  @IsInt()
  user?: number;

  @IsOptional()
  @IsInt()
  technician?: number;

  @IsOptional()
  @IsInt()
  status?: number;

  @IsOptional()
  @IsInt()
  fk_inventari?: number;
}
