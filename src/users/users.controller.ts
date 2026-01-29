import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ErrorHandlerService } from '../commons/error-handler/error-handler.service';
import { ProductsService } from '../products/products.service';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { ErrorRequestHandler } from 'express';
import { CreateFavoriteArgsDto } from 'src/dto/create-favorite-args-dto';

//TODO Refactorizar que use el errormodule

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  @Get(':userId/favourites')
  async getFavourites(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return await this.userService.getFavourites(userId);
    } catch (error) {
      throw this.errorHandlerService.handleError(error);
    }
  }

  @Post(':userId/favourites')
  @HttpCode(201)
  async createFavourite(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: CreateFavoriteArgsDto,
  ) {
    try {
      return await this.userService.postFavorite(userId, body.productId);
    } catch (error) {
      throw this.errorHandlerService.handleError(error);
    }
  }

  //Es un delete?
  @Delete(':userId/favourites/:productId')
  @HttpCode(204)
  async removeFavourite(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId') productId: string,
  ) {
    try {
      await this.userService.deleteFavorite(userId, productId);
    } catch (error) {
      throw this.errorHandlerService.handleError(error);
    }
  }
}
