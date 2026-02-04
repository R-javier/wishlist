import { Injectable, NotFoundException } from '@nestjs/common';
import { FavouriteDTO } from 'src/dto/favourite.dto';
import { ProductDTO } from 'src/dto/product.dto';
import { ProductsService } from 'src/products/products.service';
import { CreateFavoriteArgsDto } from 'src/dto/create-favorite-args-dto';
import { CreateFavouriteDTO } from 'src/dto/create-favourite-dto';
import { UsersRepository } from 'src/users/users.repository';
import { FavouriteModel } from 'src/commons/sequelize/models/favourite_model';

@Injectable()
export class UsersService {
  constructor(
    private readonly productService: ProductsService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getFavourites(userId: number): Promise<ProductDTO[]> {
    const favourites = await this.usersRepository.getFavouritesQuery(userId);

    const favouritesId = favourites.map(
      (favourite: FavouriteDTO) => favourite.product_external_id,
    );

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

    //TODO: Esto deberia usar el errorHandler

    if (!result) {
      throw new NotFoundException(
        'No se encontro el favorito con el id solicitado.',
      );
    }

    const favouriteId = result.product_external_id;

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
    const restored = await this.usersRepository.restoreFavourite(
      userId,
      productId,
    );
    let favourite: FavouriteModel;

    if (restored) {
      favourite = restored;
    } else {
      favourite = await this.usersRepository.createFavourite(userId, productId);
    }
    return new FavouriteDTO(favourite.toJSON());
  }

  async deleteFavorite(userId: number, productId: string): Promise<string> {
    await this.usersRepository.deleteFavoriteQuery(userId, productId);
    return `El producto ${productId} ha sido eliminado de los favoritos del usuario ${userId}`;
  }
}
