import { Injectable } from '@nestjs/common';
import { pool } from 'database/postgres';

@Injectable()
export class UsersService {
  async createFavorite(userId: number, productId: string) {
    const result = await pool.query(
      `
      INSERT INTO favourites (user_id, product_id)
      VALUES ($1, $2)
      RETURNING *
    `,
      [userId, productId],
    );

    return result.rows[0];
  }
}
