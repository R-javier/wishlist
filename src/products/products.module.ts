import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { HttpModule } from '@nestjs/axios';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';

@Module({
  imports: [HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService, ErrorHandlerService]
})
export class ProductsModule {}
