import {
  Injectable,
} from '@nestjs/common';
import { ProductDTO } from 'src/dto/product.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductsService {
  private readonly productsServiceUrl: string;
  constructor(private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.productsServiceUrl = this.configService.get<string>('CATALOG_SERVICE_URL')!;
  }

  async getProducts(): Promise<ProductDTO[]> {
   
      const response = await firstValueFrom(
        this.httpService.get<ProductDTO[]>(this.productsServiceUrl),
      );

      return response.data;
    
  }

  async getProductsById(id: string): Promise<ProductDTO> {
      const response = await firstValueFrom(
        this.httpService.get<ProductDTO>(`${this.productsServiceUrl}/${id}`),
      );
      return response.data;
  }
}
