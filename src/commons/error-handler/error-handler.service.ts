import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
  NotFoundException,
  RequestTimeoutException,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  handleError(error): never {
    if (error instanceof HttpException) {
      throw error;
    }

    const status = error?.response?.status;

    
    if (status) {
      switch (status) {
        case HttpStatus.BAD_REQUEST:
          throw new BadRequestException(
            'Solicitud inválida al servicio de catálogo',
          );

        case HttpStatus.NOT_FOUND:
          throw new NotFoundException(
            'No se encontraron productos en el servicio de catálogo',
          );

        case HttpStatus.REQUEST_TIMEOUT:
          throw new RequestTimeoutException(
            'El servicio de catálogo tardó demasiado en responder',
          );

        case HttpStatus.SERVICE_UNAVAILABLE:
          throw new ServiceUnavailableException(
            'El servicio de catálogo no está disponible en este momento',
          );

        default:
          throw new HttpException(error?.message ?? 'Error del servicio de catálogo', status);
      }
    }

    throw new HttpException(error.message || 'Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

