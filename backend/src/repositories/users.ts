import { database } from "../database/client.js";

type UsersRow = {
    id: string;
    username: string;
    email: string;
    password_hash: string;
}

type UsersError =
  | { type: "EMAIL_TAKEN" }
  | { type: "USERNAME_TAKEN" }
  | { type: "DB_ERROR"; message: string };

export async function createUser(username: string, email: string, password: string) {
    const result = await database.query(
        `
        INSERT INTO users (email, username, password_hash)
        VALUES ($1, $2, $3)
        RETURNING username, email;
        `,
        [username, email, password],
    ).catch((err) => {
        if (err.code === "23505") { // PostgreSQL error code for unqiue constraint error

        }
    });

}

export async function findUserById(id: string) {
    const result = await database.query<UsersRow>(
        `
        SELECT *
        FROM users
        WHERE id = $1
        `,
        [id],
    ).then(res => res.rows);

    return result.find((user) => user.id === id) ?? null;
}

export async function findUserByUsername(id: string) {
    const result = await database.query<UsersRow>(
        `
        SELECT *
        FROM users
        WHERE username = $1
        `,
        [id],
    ).then(res => res.rows);

    return result.find((user) => user.id === id) ?? null;
}

export async function findUserByEmail(id: string) {
    const result = await database.query<UsersRow>(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [id],
    ).then(res => res.rows);

    return result.find((user) => user.id === id) ?? null;
}

