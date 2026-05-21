import { database } from "@/database/client.js";
import { PostsRow } from "./posts.js";

type UsersRow = {
    id: string;
    username: string;
    email: string;
    is_deleted: boolean;
    description: string | null;
    pfp_id: string | null;
    banner_id: string | null;
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
        .query<String>(
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
        .query<Omit<UsersRow, "password_hash">>(
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

export async function findUserByUsername(username: string) {
    const result = await database
        .query<Omit<UsersRow, "password_hash">>(
            `
        SELECT *
        FROM users
        WHERE username = $1
        `,
            [username],
        )
        .then((res) => res.rows);

    return result.find((user) => user.username === username) ?? null;
}

export async function findUserByEmail(email: string) {
    const result = await database
        .query<Omit<UsersRow, "password_hash">>(
            `
        SELECT *
        FROM users
        WHERE email = $1
        `,
            [email],
        )
        .then((res) => res.rows);

    return result.find((user) => user.email === email) ?? null;
}

export async function getFollowingById(id: string): Promise<string[]> {
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

export async function getFollowersById(id: string): Promise<string[]> {
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

export async function getPostsById(id: string) {
    const result = (
        await database.query<PostsRow>(
            `
        SELECT *
        FROM posts
        WHERE user_id = $1
        `,
            [id],
        )
    ).rows;

    return result;
}

export async function updateUserSettingsProfile(
    id: string,
    description: string,
    pfp_id: string,
    banner_id: string,
) {
    const result = (
        await database.query(
            `
        UPDATE users
        SET description = $2, pfp_id = $3, banner_id = $4
        WHERE id = $1
        `,
            [id, description, pfp_id, banner_id],
        )
    ).rows;

    return;
}

export async function updateUserSettingsAccount(
    id: string,
    username: string,
    password: string,
) {
    const result = (
        await database.query(
            `
        UPDATE users
        SET username = $2, password_hash = crypt($3, gen_salt('md5'))
        WHERE id = $1
        `,
            [id, username, password],
        )
    ).rows;

    return;
}
