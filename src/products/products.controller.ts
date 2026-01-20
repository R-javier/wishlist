import { Controller, Get, Param} from '@nestjs/common';

@Controller('products')
export class ProductsController {

    @Get()
    findAll(){
        return 'Traigo todos los productos';
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return `Traigo solo este producto ${id}`;
   }
}
