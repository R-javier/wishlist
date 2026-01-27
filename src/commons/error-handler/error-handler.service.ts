import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  RequestTimeoutException,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  handleError(error): never {
    if (error instanceof HttpException) {
      throw error;
    }

    if (error instanceof ConflictException) {
      throw error;
    }

    if (error instanceof NotFoundException) {
      throw error;
    }

    if (error.response?.status) {
      switch (error.response.status) {
        case 400:
          throw new BadRequestException(
            'Solicitud inválida al servicio de catálogo',
          );

        case 404:
          throw new NotFoundException(
            'No se encontraron productos en el servicio de catálogo',
          );

        case 408:
          throw new RequestTimeoutException(
            'El servicio de catálogo tardó demasiado en responder',
          );

        case 504:
          throw new ServiceUnavailableException(
            'El servicio de catálogo no está disponible en este momento',
          );

        default:
          throw new HttpException(error.message, 500);
      }
    }

    throw new HttpException(error.message || 'Error interno del servidor', 500);
  }
}
