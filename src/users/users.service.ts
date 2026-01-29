import { Injectable, ConflictException } from '@nestjs/common';
import { pool } from '../commons/database/db';
import { FavouriteDTO } from '../dto/favourite.dto';
import { ProductDTO } from '../dto/product.dto';
import { ProductsService } from '../products/products.service';
import { NotFoundException } from '@nestjs/common';

//TODO como usar el errorHandler para gestionar los errores?

@Injectable()
export class UsersService {
  constructor(private readonly productService: ProductsService) {}

  async getFavourites(userId: number) {
    const result = await pool.query(
      `SELECT id, user_id, product_external_id, created_at 
     FROM favourites 
     WHERE user_id = $1`,
      [userId],
    );

    if (!result || !result.rows) {
      throw new Error(`Error buscando los favoritos del usuario ${userId}`);
    }

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
    const result = await pool.query(
      `SELECT id, user_id, product_external_id, created_at 
     FROM favourites 
     WHERE user_id = $1 AND product_external_id = $2 AND active = true`,
      [userId, productId],
    );

    if (result.rows.length === 0) {
      throw new Error(
        `Error, el producto no figura en los favoritos del usuario ${userId}`,
      );
    }

    const favouriteId = result.rows[0];

    const favouriteProduct: ProductDTO =
      await this.productService.getProductsById(favouriteId);

    return favouriteProduct;
  }

  async createFavorite(
    userId: number,
    productId: string,
  ): Promise<FavouriteDTO> {
    const result = await pool.query(
      `
      INSERT INTO favourites (user_id, product_external_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, product_external_id) DO NOTHING
      RETURNING *;
    `,
      [userId, productId],
    );

    if (result.rows.length === 0) {
      throw new ConflictException('El favorito ya existe');
    }
    return new FavouriteDTO(result.rows[0]);
  }

  async deleteFavorite(userId: number, productId: string): Promise<string> {
    const result = await pool.query(
      `
      UPDATE favourites
      SET active = false
      WHERE user_id = $1 
      AND product_external_id = $2 
      AND active = true
      RETURNING *;
      `,
      [userId, productId],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException('Favourite not found');
    }
    return `El producto ${productId} ha sido eliminado de los favoritos del usuario ${userId}`;
  }
}
