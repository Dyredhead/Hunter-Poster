import { database } from "@/database/client.js";

type UsersRow = {
    id: string;
    username: string;
    email: string;
    password_hash: string;
    pfp_id: string;
    banner_id: string;
};

type UsersError =
    | { type: "EMAIL_TAKEN" }
    | { type: "USERNAME_TAKEN" }
    | { type: "DB_ERROR"; message: string };

export async function createUser(
    username: string,
    email: string,
    password: string,
) {
    const result = await database
        .query<Number>(
            `
        INSERT INTO users (username, email, password_hash)
        VALUES ($1, $2, crypt($3, gen_salt('md5')))
        RETURNING id
        `,
            [username, email, password],
        )
        .catch((err) => {
            console.error("Error creating user:", err);
            if (err.code === "23505") {
                switch (err.constraint) {
                    case "users_email_key":
                        throw { type: "EMAIL_TAKEN" } as UsersError;
                    case "users_username_key":
                        throw { type: "USERNAME_TAKEN" } as UsersError;
                }
            }
            throw err;
        });
}

export async function verifyUserCredentials(email: string, password: string) {
    const result = await database
        .query<Pick<UsersRow, "id">>(
            `
        SELECT id
        FROM users
        WHERE email = $1
          AND password_hash = crypt($2, password_hash)
        `,
            [email, password],
        )
        .then((res) => res.rows);

    return result[0] ?? null;
}

export async function findUserById(id: string) {
    const result = await database
        .query<UsersRow>(
            `
        SELECT *
        FROM users
        WHERE id = $1
        `,
            [id],
        )
        .then((res) => res.rows);

    return result.find((user) => user.id === id) ?? null;
}

export async function findUserByUsername(id: string) {
    const result = await database
        .query<UsersRow>(
            `
        SELECT *
        FROM users
        WHERE username = $1
        `,
            [id],
        )
        .then((res) => res.rows);

    return result.find((user) => user.id === id) ?? null;
}

export async function findUserByEmail(id: string) {
    const result = await database
        .query<UsersRow>(
            `
        SELECT *
        FROM users
        WHERE email = $1
        `,
            [id],
        )
        .then((res) => res.rows);

    return result.find((user) => user.id === id) ?? null;
}

export async function getFollowing(id: string): Promise<string[]> {
    return (
        await database.query(
            `
        SELECT following_id
        FROM user_follows
        WHERE follower_id = $1
        `,
            [id],
        )
    ).rows.map((row) => row.following_id);
}

export async function getFollowers(id: string): Promise<string[]> {
    return (
        await database.query(
            `
        SELECT follower_id
        FROM user_follows
        WHERE following_id = $1
        `,
            [id],
        )
    ).rows.map((row) => row.follower_id);
}
