import { IsNotEmpty, IsOptional } from 'class-validator';
import { Apps } from '../apps.entity';

export class CreateAppDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: Apps['name'];
  /* Description is optional */
  @IsOptional()
  description?: Apps['description'];
}
