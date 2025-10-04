import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { headers: Record<string, string>; user?: User }>();
    const token = request.headers['authorization'].replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Token requerido');
    }

    const user = await this.usersService.getByToken(token);
    if (!user) {
      throw new UnauthorizedException('Token inválido');
    }

    if (user.token !== token) {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    // 👉 Guardamos el usuario en la request
    request.user = user;
    return true;
  }
}
