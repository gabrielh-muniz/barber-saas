import { config } from "dotenv";
import { Pool } from "pg";

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

/**
 * Executes a query on the database
 * @param {string} text - The SQL query text
 * @param {Array} params - The query parameters
 * @returns {Promise<Object>} - A promise that resolves to the query result
 */
function query(text, params) {
  return pool.query(text, params);
}

export { query };
