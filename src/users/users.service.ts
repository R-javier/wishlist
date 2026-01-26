import { Injectable } from '@nestjs/common';
import { pool } from 'src/commons/database/db';
import { ProductDTO } from 'src/dto/product.dto';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class UsersService {
  constructor(private readonly productService: ProductsService) {}

  async getFavourites(userId: number) {
    const debug = await pool.query(`
  SELECT 
    current_database() AS db,
    current_schema() AS schema,
    inet_server_addr() AS host
`);
    console.log('DEBUG DB:', debug.rows);
    const all = await pool.query('SELECT * FROM users');
    console.log('TODOS LOS USERS:', all);
    const result = await pool.query(
      `SELECT id, user_id, product_external_id, created_at 
     FROM users 
     WHERE user_id = $1`,
      [userId],
    );

    console.log('Resultado de la query:', result.rows); // ← Log 2
    console.log('Cantidad de filas:', result.rows.length); // ← Log 3

    if (!result || !result.rows) {
      throw new Error(`Error buscando los favoritos del usuario ${userId}`);
    }

    //TODO se podria tipar rows?
    const favouritesId = result.rows.map((row: any) => row.product_external_id);

    console.log('IDs extraídos:', favouritesId); // ← Log 4

    const favouritesProducts: ProductDTO[] = await Promise.all(
      favouritesId.map((favouriteId: string) => {
        return this.productService.getProductsById(favouriteId);
      }),
    );

    return favouritesProducts;
  }
}
