import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts() {
    return await this.productsService.getProducts();
  }

  //     @Get(':id')
  //     async findOne(@Param('id') id: string){
  //         return await this.productsService.getProductsById(id);
  //    }
}
