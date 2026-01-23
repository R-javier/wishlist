import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { HttpModule } from '@nestjs/axios';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [ProductsController],
  providers: [ProductsService, ErrorHandlerService],
  exports: [ProductsService],
})
export class ProductsModule {}
