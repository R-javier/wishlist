import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.HOST || 'localhost',
  port: process.env.DATABASEPORT || 5432,
  user: process.env.DATABASEUSER || 'postgres',
  password: process.env.DATABASEPPASSWORD || 'postgres',
  database: process.env.DATABASE || 'productsdb',
});
