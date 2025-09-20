import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const pool = mysql.createPool({
  // host: process.env.DB_HOST || "localhost",
  // user: process.env.DB_USER || "root",
  // password: process.env.DB_PASS || "",
  // database: process.env.DB_NAME || "sweetshop",
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(process.env.SSL_CA_PATH).toString()
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool.promise(); // enables async/await
