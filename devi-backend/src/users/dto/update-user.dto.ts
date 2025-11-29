import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  roles?: string[];

  @IsOptional()
  status?: 'active' | 'inactive' | 'banned';

  @IsOptional()
  verified?: boolean;

  @IsOptional()
  @IsString()
  profilePictureUrl?: string;

  @IsOptional()
  lastLogin?: Date;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  githubUrl?: string;

  @IsOptional()
  @IsString()
  linkedinUrl?: string;

  @IsOptional()
  @IsString()
  token?: string | null;

  @IsOptional()
  @IsString()
  githubToken?: string;
}
