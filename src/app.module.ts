import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ProductsModule,
    ErrorHandlerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
