import { database } from "@/database/client.js";
import { CommentCreateRequest } from "@my-app/shared";

export type CommentRow = {
    id: string;
    user_id: string;
    parent_id: string | null;
    post_id: string;
    content: string;
};

export async function commentGetByPost(
    post_id: string,
    page_size: number,
    cursor?: string,
): Promise<CommentRow[]> {
    const query = 
    
    `
        SELECT * FROM comments
        WHERE post_id = $1
        AND ($2 IS NULL OR id < $2)
        ORDER BY id DESC
        LIMIT $3
    `;
    const values = [post_id, cursor, page_size];

    return (await database.query<CommentRow>(query, values)).rows;
}

export async function commentGetReplies(
    parent_id: string,
    cursor?: string,
): Promise<CommentRow[]> {
    const query = `
        WITH RECURSIVE replies AS (
            SELECT * FROM comments
            WHERE parent_id = $1
            AND ($2 IS NULL OR id < $2)
            ORDER BY id DESC
            LIMIT 10
        )
        SELECT * FROM replies
    `;
    const values = [parent_id, cursor];

    return (await database.query<CommentRow>(query, values)).rows;
}

export async function commentGetById(
    id: string
): Promise<CommentRow | null> {
    const query = `
        SELECT * FROM comments
        WHERE id = $1
    `;
    const values = [id];

    const result = (await database.query<CommentRow>(query, values)).rows;

    return result.find((comment) => comment.id === id) ?? null;
}

export async function commentCreate(
    user_id: string,
    { parent_id, post_id, content }: CommentCreateRequest,
): Promise<CommentRow | null> {
    const query = `
        INSERT INTO comments (user_id, parent_id, post_id, content)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const values = [user_id, parent_id, post_id, content];

    const result = await database
        .query<CommentRow>(query, values)
        .then((res) => res.rows[0])
        .catch((err) => {
            console.log(err);
            return null;
        });

    return result;
}

export async function countTotalReplies(
    id: string
): Promise<number> {
    const query = `
        SELECT COUNT(*) FROM comments
        WHERE parent_id = $1
    `;
    const values = [id];

    return Number((await database.query<{count: string}>(query, values)).rows[0].count);
}