/**
 * Import Sequelize.
 */

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

/**
 * Create a Sequelize instance. This can be done by passing
 * the connection parameters separately to the Sequelize constructor.
 */
const sequelize = new Sequelize(
  "drivewellservice",
  process.env.SQL_USERNAME,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_HOST,
    dialect: "mysql",
  }
);

/**
 * Export the Sequelize instance. This instance can now be
 * used in the index.js file to authenticate and establish a database connection.
 */
export default sequelize;
