import { Injectable, ConflictException } from '@nestjs/common';
import { pool } from 'src/commons/database/db';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor() {}

  async getFavouriteQuery(userId: number, productId: string) {
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

    return result;
  }

  async getFavouritesQuery(userId: number) {
    const result = await pool.query(
      `SELECT id, user_id, product_external_id, created_at 
     FROM favourites 
     WHERE user_id = $1 AND active = true`,
      [userId],
    );

    if (!result || !result.rows) {
      throw new Error(`Error buscando los favoritos del usuario ${userId}`);
    }

    return result;
  }

  async postFavoriteQuery(userId: number, productId: string) {
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
    return result;
  }

  async deleteFavoriteQuery(
    userId: number,
    productId: string,
  ): Promise<string> {
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
    return result;
  }
}
