import { Injectable } from '@nestjs/common';
import { FavouriteDTO } from 'src/dto/favourite.dto';
import { ProductDTO } from 'src/dto/product.dto';
import { ProductsService } from 'src/products/products.service';
import { CreateFavoriteArgsDto } from 'src/dto/create-favorite-args-dto';
import { CreateFavouriteDTO } from 'src/dto/create-favourite-dto';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly productService: ProductsService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getFavourites(userId: number): Promise<ProductDTO[]> {
    const result = await this.usersRepository.getFavouritesQuery(userId);

    //TODO se podria tipar rows?
    const favouritesId = result.rows.map((row: any) => row.product_external_id);

    const favouritesProducts: ProductDTO[] = await Promise.all(
      favouritesId.map((favouriteId: string) => {
        return this.productService.getProductsById(favouriteId);
      }),
    );

    return favouritesProducts;
  }

  async getFavourite(userId: number, productId: string) {
    const result = await this.usersRepository.getFavouriteQuery(
      userId,
      productId,
    );
    const favouriteId = result.rows[0];

    const favouriteProduct: ProductDTO =
      await this.productService.getProductsById(favouriteId);

    return favouriteProduct;
  }

  async createFavourite(
    userId: number,
    body: CreateFavoriteArgsDto,
  ): Promise<CreateFavouriteDTO> {
    const product = await this.productService.getProductsById(body.productId);
    const favourite = await this.postFavorite(userId, body.productId);

    return {
      user_id: userId,
      product_external_id: body.productId,
      created_at: favourite.created_at,
      product: {
        title: product.title,
        price: product.price,
      },
    };
  }

  async postFavorite(userId: number, productId: string): Promise<FavouriteDTO> {
    const result = await this.usersRepository.postFavoriteQuery(
      userId,
      productId,
    );
    return new FavouriteDTO(result.rows[0]);
  }

  async deleteFavorite(userId: number, productId: string): Promise<string> {
    await this.usersRepository.deleteFavoriteQuery(userId, productId);
    return `El producto ${productId} ha sido eliminado de los favoritos del usuario ${userId}`;
  }
}
