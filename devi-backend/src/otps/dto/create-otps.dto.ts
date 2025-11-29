import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOtpsDto {
  @IsNotEmpty({ message: 'Secret is required' })
  @IsString({ message: 'Secret must be a string' })
  secret: string;
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;
  @IsOptional({ message: 'App ID is optional' })
  @IsString({ message: 'App ID must be a string' })
  appId: string | null;
}
