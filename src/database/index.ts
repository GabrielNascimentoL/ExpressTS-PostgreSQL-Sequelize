import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { PG_DB, PG_USER, PG_PASSWORD, PG_HOST } = process.env;

if (!PG_DB || !PG_USER || !PG_PASSWORD || !PG_HOST) {
  throw new Error('One or more environment variables are not defined');
}

const sequelize = new Sequelize(PG_DB, PG_USER, PG_PASSWORD, {
  host: PG_HOST,
  dialect: 'postgres'
});

export default sequelize;
