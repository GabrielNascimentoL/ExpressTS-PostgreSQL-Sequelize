import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    host: process.env.PG_HOST,
    dialect: process.env.PG_DIALECT || 'postgres',
  },
  test: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    host: process.env.PG_HOST,
    dialect: process.env.PG_DIALECT || 'postgres',
  },
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    host: process.env.PG_HOST,
    dialect: process.env.PG_DIALECT || 'postgres',
  },
};

export default config;
