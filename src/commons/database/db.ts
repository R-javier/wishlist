import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 5432,
  user: process.env.USER || 'postgres',
  password: process.env.PASSWORD || 'postgres',
  database: process.env.DATABASE || 'productsdb',
});
