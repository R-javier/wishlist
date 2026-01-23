import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProductsModule } from 'src/products/products.module';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';

@Module({
  imports: [ProductsModule, ErrorHandlerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
