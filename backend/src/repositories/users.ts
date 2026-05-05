import { database } from "../database/client.js";

export async function findUserById(id: number) {
    
    const fakeUsers = [
        { id: 1, email: "alice@example.com" },
        { id: 2, email: "bob@example.com" },
    ];
    
    // const result = await database.query<UserRow>(
    //     `
    //     SELECT id, email, password_hash, created_at
    //     FROM users
    //     WHERE id = $1
    //     `,
    //     [id],
    // );

    return fakeUsers.find((user) => user.id === id) ?? null;
}

