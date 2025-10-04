import { Optional } from '@nestjs/common';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;

  @Optional()
  @IsNotEmpty({ message: 'El rol no puede estar vacío si se proporciona' })
  roles: string[] = ['user'];
}
