import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,private readonly errorHandlerService : ErrorHandlerService) {}

  @Get()
  async getProducts() {
    try{
    return await this.productsService.getProducts();
    }
    catch(error){
      this.errorHandlerService.handleError(error)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    try {  
      return await this.productsService.getProductsById(id);
    }
    catch(error){
      this.errorHandlerService.handleError(error)
    }
  }
}
