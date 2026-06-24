import { database } from "@/database/client.js";
import { CommentCreateRequest } from "@my-app/shared";

export type CommentRow = {
    id: string;
    user_id: string;
    parent_id?: string;
    post_id: string;
    content: string;
};

export async function commentGetRoot(
    post_id: string,
): Promise<CommentRow[]> {
    const query = `
        SELECT * FROM comments
        WHERE post_id = $1
    `;
    const values = [post_id];

    return (await database.query<CommentRow>(query, values)).rows;
}

export async function commentGetReplies(
    comment_id: string,
): Promise<CommentRow[]> {
    const query = `
        SELECT * FROM comments
        WHERE comment_id = $1
    `;
    const values = [comment_id];

    return (await database.query<CommentRow>(query, values)).rows;
}

export async function commentGetById(id: string): Promise<CommentRow | null> {
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