import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const responseBody: any = exception.getResponse();

    if (status === 400 || status === 401) {
      const errorResponse: any = {
        errorsMessages: [],
        timestamp: new Date().toISOString(),
        path: request.url,
      };

      if (Array.isArray(responseBody.message)) {
        responseBody.message.forEach((m) => {
          const match = m.match(/^(.+?) /);
          const field = match ? match[1] : null;

          errorResponse.errorsMessages.push({
            message: m,
            field: field,
          });
        });
      }

      if (errorResponse.errorsMessages.length === 0) {
        response.status(status).json({
          statusCode: status,
          error: responseBody.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      }

      response.status(status).json(errorResponse);
    } else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
