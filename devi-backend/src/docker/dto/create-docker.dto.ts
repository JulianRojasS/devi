import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDockerDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;
  @IsNotEmpty({ message: 'Host is required' })
  @IsString({ message: 'Host must be a string' })
  host: string;
  @IsNotEmpty({ message: 'Port is required' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Port must be a number' },
  )
  port: number;
  @IsOptional({ message: 'Creator ID is optional' })
  @IsString({ message: 'Creator ID must be a string' })
  creatorId: string;
}
