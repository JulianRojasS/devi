import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOtpsDto {
  @IsNotEmpty()
  @IsString()
  secret: string;
  @IsNotEmpty()
  @IsString()
  name: string;
}
