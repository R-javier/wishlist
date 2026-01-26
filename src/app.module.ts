import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule],
  // controllers: [UsersController],
  // providers: [UsersService],
})
export class AppModule {}
