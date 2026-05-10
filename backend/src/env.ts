import dotenv from "dotenv";
import dotenv_expand from "dotenv-expand";
import path from "node:path";

const throwError = (message: string): never => {
    throw new Error(message);
};

dotenv_expand.expand(
    dotenv.config({
        path: path.resolve(process.cwd(), "./.env"),
    }),
);

dotenv.config({
    path: path.resolve(process.cwd(), "./.env"),
});

const express_port =
    process.env.EXPRESS_PORT ??
    throwError("Missing EXPRESS_PORT environment variable");
const database_url =
    process.env.DATABASE_URL ??
    throwError("Missing DATABASE_URL environment variable");
const jwt_secret =
    process.env.JWT_SECRET ??
    throwError("Missing JWT_SECRET environment variable");
const jwt_expires_in =
    process.env.JWT_EXPIRES_IN ??
    throwError("Missing JWT_EXPIRES_IN environment variable");

export const env = {
    database_url: database_url,
    express_port: express_port,
    jwt_secret: jwt_secret,
    jwt_expires_in: jwt_expires_in,
};
