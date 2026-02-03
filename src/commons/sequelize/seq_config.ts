import { Sequelize } from 'sequelize';

export function config_db() {
  const sequelize = new Sequelize('productsdb', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  });
  return sequelize;
}
