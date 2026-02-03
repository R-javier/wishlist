import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('productsdb', 'postgres', 'postgres', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});
