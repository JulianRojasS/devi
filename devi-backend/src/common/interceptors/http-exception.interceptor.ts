import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

interface ErrorResponse {
  success: false;
  statusCode: number;
  error: string | object;
  model: string;
  date: string;
  'ip-access': string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request & { ip: string }>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const model = response.req.path.split('/')[1] || 'unknown';
    const error =
      exception instanceof HttpException
        ? exception.getResponse()
        : JSON.stringify(exception);
    console.log(exception);
    const errorResponse: ErrorResponse = {
      success: false,
      statusCode: status,
      error:
        exception instanceof HttpException
          ? JSON.stringify(error)
          : JSON.stringify(exception),
      model,
      date: new Date().toISOString(),
      'ip-access': request.ip || '',
    };

    response.status(status).json(errorResponse);
  }
}
