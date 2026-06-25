import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "moon_resort", // 👈 DOĞRU
  password: "123456",
  port: 5433,
});