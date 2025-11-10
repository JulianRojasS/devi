import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre debe tener menos de 100 caracteres' })
  name: string;
  @IsOptional()
  description?: string;
  @IsNotEmpty({ message: 'El stageId es obligatorio' })
  stageId: string;
  @IsOptional()
  creatorId: string;
  @IsOptional()
  userId: string;
  @IsOptional()
  startDate?: Date;
  @IsOptional()
  endDate?: Date;
  @IsOptional()
  status?: 'pending' | 'in_progress' | 'completed';
}
