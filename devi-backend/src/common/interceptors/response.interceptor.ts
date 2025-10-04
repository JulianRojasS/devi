import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const model = this.getModelName(context);

    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode || HttpStatus.OK;

        return {
          success: true,
          data: data,
          ...(Array.isArray(data) ? { count: data.length } : {}),
          model: model,
          date: new Date().toISOString(),
          'ip-access': request.ip || request.connection.remoteAddress,
          statusCode: statusCode,
        };
      }),
    );
  }

  private getModelName(context: ExecutionContext): string {
    const controller = context
      .getClass()
      .name.replace('Controller', '')
      .toLowerCase();
    return controller; // Ejemplo: "users"
  }
}
