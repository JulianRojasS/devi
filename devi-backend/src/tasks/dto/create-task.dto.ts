import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  IsIn,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre debe tener menos de 100 caracteres' })
  name: string;
  @IsOptional({ message: 'La descripción es opcional' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(500, {
    message: 'La descripción debe tener menos de 500 caracteres',
  })
  description?: string;
  @IsNotEmpty({ message: 'El stageId es obligatorio' })
  @IsString({ message: 'El stageId debe ser una cadena de texto' })
  @IsUUID(4, { message: 'El stageId debe ser un UUID válido' })
  stageId: string;
  @IsOptional({ message: 'El creatorId es opcional' })
  @IsString({ message: 'El creatorId debe ser una cadena de texto' })
  @IsUUID(4, { message: 'El creatorId debe ser un UUID válido' })
  creatorId: string;
  @IsOptional({ message: 'El userId es opcional' })
  @IsString({ message: 'El userId debe ser una cadena de texto' })
  @IsUUID(4, { message: 'El userId debe ser un UUID válido' })
  userId: string;
  @IsOptional({ message: 'La fecha de inicio es opcional' })
  @IsString({ message: 'La fecha de inicio debe ser una cadena de texto' })
  startDate?: string;
  @IsOptional({ message: 'La fecha de fin es opcional' })
  @IsString({ message: 'La fecha de fin debe ser una cadena de texto' })
  endDate?: string;
  @IsOptional()
  @IsString({ message: 'El status debe ser una cadena de texto' })
  @IsIn(['pending', 'in_progress', 'completed', 'expired'], {
    message: 'El status debe ser un valor válido',
  })
  status?: 'pending' | 'in_progress' | 'completed' | 'expired';
}
