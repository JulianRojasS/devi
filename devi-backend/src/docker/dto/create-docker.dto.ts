import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDockerDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  host: string;
  @IsNotEmpty()
  @IsNumber()
  port: number;
  @IsOptional()
  @IsString()
  creatorId: string;
}
