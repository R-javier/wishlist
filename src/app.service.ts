// import { Injectable } from "@nestjs/common";
// import { pool } from "database/postgres";

// export type Product = {
//   id: string;
//   title: string;
//   category: string;
//   price: number;
//   currency: string;
//   stock: number;
//   rating: number;
//   imageUrl: string;
//   createdAt: string;
// };

// @Injectable()
// export class AppService {
// async getProduct(userId: number, productId: number): Promise<Product[]> {
//   const result = await pool.query(
//     `
//     INSERT INTO products (user_id, product_id)
//     VALUES ($1, $2)
//     RETURNING *;
//     `,
//     [userId, productId],
//   );
 
//   return result.rows;
// }
//  getProductById(productId):Product {

//  }

// }
