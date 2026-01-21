import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductDTO } from 'src/dto/product.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CatalogResponse } from 'src/dto/catalog-response.interface';


@Injectable()
export class ProductsService {
    private readonly productsServiceUrl =
    process.env.CATALOG_SERVICE_URL || 'http://localhost:3001/products';
    constructor(private readonly httpService: HttpService){}

    async getProducts() : Promise<ProductDTO[]> {
        try{
            const response = await firstValueFrom(
                this.httpService.get<CatalogResponse>(this.productsServiceUrl),
            );
            return response.data?.products ?? [];
        }catch(error){
            throw new HttpException(
                'Error al obtener productos del servicio externo',
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }
    
}

