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
import { ProductsService } from 'src/products/products.service';
import { CreateFavoriteDto } from 'src/dto/create-favorite.dto';
import { ErrorRequestHandler } from 'express';

//TODO Refactorizar que use el errormodule

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  @Get(':userId/favourites')
  getFavourites(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return this.userService.getFavourites(userId);
    } catch (error) {
      return this.errorHandlerService.handleError(error);
    }
  }

  @Post(':userId/favourites')
  async createFavourite(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: CreateFavoriteDto,
  ) {
    const product = await this.productService
      .getProductsById(body.productId)
      .catch(() => {
        throw new NotFoundException('El producto no existe');
      });

    try {
      const favourite = await this.userService.createFavorite(
        userId,
        body.productId,
      );

      return {
        userId,
        productId: body.productId,
        createdAt: favourite.created_at,
        product: {
          title: product.title,
          price: product.price,
        },
      };
    } catch (error: any) {
      throw new BadRequestException(
        error?.message ?? 'No se pudo crear el favorito',
      );
    }
  }

  //Es un delete?
  @Delete(':userId/favourites/:productId')
  @HttpCode(204)
  async removeFavourite(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId') productId: string,
  ) {
    const deleted = await this.userService.deleteFavorite(userId, productId);
    if (deleted === 0) {
      throw new NotFoundException('Favorito no encontrado.');
    }
    return;
  }
}
