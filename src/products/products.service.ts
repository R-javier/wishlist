import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
  NotFoundException,
  RequestTimeoutException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ProductDTO } from 'src/dto/product.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CatalogResponse } from 'src/dto/catalog-response.interface';

@Injectable()
export class ProductsService {
  private readonly productsServiceUrl =
    process.env.CATALOG_SERVICE_URL || 'http://localhost:3001/products';
  constructor(private readonly httpService: HttpService) {}

  async getProducts(): Promise<ProductDTO[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<CatalogResponse>(this.productsServiceUrl),
      );

      return response.data?.products ?? [];
    } catch (err) {
      if (err.isAxiosError || err.response) {
        const status = err.response?.status;

        switch (status) {
          case 400:
            throw new BadRequestException(
              err.response?.data.message ||
                'Solicitud inválida al servicio de catálogo',
            );

          case 404:
            throw new NotFoundException(
              err.response?.data?.message ||
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
              status ?? HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
      }
      throw new ServiceUnavailableException(
        'Error al obtener productos del servicio externo',
      );
    }
  }
}
