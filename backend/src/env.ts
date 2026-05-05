import dotenv from "dotenv";
import path from "node:path";

const throwError = (message: string): never => {
  throw new Error(message);
};

dotenv.config({
    path: path.resolve(process.cwd(), "./.env"),
});

const database_url = process.env.DATABASE_URL ?? throwError("Missing DATABASE_URL environment variable");
const express_port = process.env.EXPRESS_PORT ?? throwError("Missing EXPRESS_PORT environment variable");

export const env = {
    "database_url": database_url,
    "express_port": express_port
};
