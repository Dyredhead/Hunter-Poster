import { Pool } from "pg";
import { env } from "../env.js";

console.log(env.database_url);
export const database = new Pool({
    connectionString: env.database_url,
});
