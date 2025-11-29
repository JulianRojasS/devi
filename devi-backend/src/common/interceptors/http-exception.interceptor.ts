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
    let error: string | string[] = [];
    console.log(exception);
    console.log(exception instanceof HttpException);
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      const message =
        typeof response === 'string'
          ? response
          : (response as { message: string | string[] }).message;
      error = message;
    } else if (exception instanceof Error) {
      error = exception.message;
    } else {
      error = 'Unknown error';
    }

    console.log(error);
    const errorResponse: ErrorResponse = {
      success: false,
      statusCode: status,
      error,
      model,
      date: new Date().toISOString(),
      'ip-access': request.ip || '',
    };

    response.status(status).json(errorResponse);
  }
}
