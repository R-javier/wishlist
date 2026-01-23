import { ConflictException, Injectable } from '@nestjs/common';
import { pool } from 'database/postgres';

@Injectable()
export class UsersService {
  async createFavorite(userId: number, productId: string) {
    const result = await pool.query(
      `
      INSERT INTO favourites (user_id, product_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, product_id) DO NOTHING
      RETURNING *;
    `,
      [userId, productId],
    );

    if(result.rows.length === 0){
      throw new ConflictException('El favorito ya existe');
    }

    return result.rows[0];
  }

  async deleteFavorite(userId: number, productId: string): Promise<number>{
    const result = await pool.query(
      `
      DELETE FROM favourites
      WHERE user_id = $1 AND product_id = $2
      `,
      [userId, productId],
    );
    return result.rowCount ?? 0
  }
}
