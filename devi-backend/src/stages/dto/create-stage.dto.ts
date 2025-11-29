import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStageDto {
  @IsOptional({ message: 'ID is optional' })
  @IsString({ message: 'ID must be a string' })
  id?: string;
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;
  @IsOptional({ message: 'Description is optional' })
  @IsString({ message: 'Description must be a string' })
  description?: string;
  @IsNotEmpty({ message: 'App ID is required' })
  @IsString({ message: 'App ID must be a string' })
  appId: string;
  @IsOptional({ message: 'Creator ID is optional' })
  @IsString({ message: 'Creator ID must be a string' })
  creatorId: string;
  @IsNotEmpty({ message: 'Status is required' })
  @IsString({ message: 'Status must be a string' })
  status: 'completed' | 'incomplete' | 'pending';
  @IsOptional({ message: 'Expected completion date is optional' })
  @IsString({ message: 'Expected completion date must be a string' })
  expectedCompletionDate?: string;
  @IsNotEmpty({ message: 'User ID is required' })
  @IsString({ message: 'User ID must be a string' })
  userId: string;
  @IsOptional({ message: 'Completion date is optional' })
  @IsString({ message: 'Completion date must be a string' })
  completionDate?: string;
  @IsOptional()
  currentTaskId?: string;
  @IsOptional({ message: 'Progress is optional' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Progress must be a number' },
  )
  progress?: number;
}
