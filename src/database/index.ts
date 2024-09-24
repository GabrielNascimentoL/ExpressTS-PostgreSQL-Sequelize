import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

declare namespace NodeJS {
  interface ProcessEnv {
    PG_USER: string;
    PG_PASSWORD: string;
    PG_DB: string;
    PG_DIALECT: string;
    PG_HOST: string;
  }
}

const { PG_DB, PG_USER, PG_PASSWORD, PG_HOST, PG_DIALECT } = process.env;

if (!PG_DB || !PG_USER || !PG_PASSWORD || !PG_HOST || !PG_DIALECT) {
  throw new Error('One or more environment variables are not defined');
}

const sequelize = new Sequelize(PG_DB, PG_USER, PG_PASSWORD, {
  host: PG_HOST,
  dialect: PG_DIALECT as 'postgres',
});

export default sequelize;
