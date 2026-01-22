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
handleError(error): never{  


 switch (error.response?.status) {
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
            throw new HttpException(
              'Error inesperado del servicio de catálogo',
              500,
            );
        }
      }




  }
 
