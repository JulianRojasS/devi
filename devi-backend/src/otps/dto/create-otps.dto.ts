import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOtpsDto {
  @IsNotEmpty()
  @IsString()
  secret: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  appId: string | null;
}
