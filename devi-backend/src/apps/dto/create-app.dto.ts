import { IsNotEmpty, IsOptional } from 'class-validator';
import { Apps } from '../apps.entity';
import { User } from 'src/users/user.entity';

export class CreateAppDto {
  @IsOptional()
  id?: Apps['id'];
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: Apps['name'];
  /* Description is optional */
  @IsOptional()
  description?: Apps['description'];
  @IsOptional()
  websiteUrl?: Apps['websiteUrl'];
  @IsOptional()
  status?: Apps['status'];
  @IsOptional()
  logoUrl?: Apps['logoUrl'];
  @IsOptional()
  createdAt?: Apps['createdAt'];
  @IsOptional()
  updatedAt?: Apps['updatedAt'];
  @IsOptional()
  userId?: Apps['userId'];
  @IsOptional()
  githubUrl?: Apps['githubUrl'];
  @IsOptional()
  user?: User;
}
