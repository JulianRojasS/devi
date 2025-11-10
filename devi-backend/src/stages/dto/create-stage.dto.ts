import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStageDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;
  @IsOptional()
  description?: string;
  @IsNotEmpty({ message: 'El appId es obligatorio' })
  appId: string;
  @IsOptional()
  creatorId: string;
  @IsNotEmpty({ message: 'El status es obligatorio' })
  status: 'completed' | 'incomplete' | 'pending';
  @IsOptional()
  expectedCompletionDate?: Date;
  @IsNotEmpty({ message: 'El userId es obligatorio' })
  userId: string;
  @IsOptional()
  completionDate?: Date;
  @IsOptional()
  currentTaskId?: string;
  @IsOptional()
  progress?: number;
}
