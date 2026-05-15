import { database } from "@/database/client.js";
import { getFollowing } from "./users.js";
import { content_type } from "@my-app/shared";

export type PostsRow = {
    id: string;
    user_id: string;
    post_type: string;
};

type PostTextRow = {
    id: string;
    post_id: string;
    text: string;
};

type PostImageRow = {
    id: string;
    post_id: string;
    image_url: string;
};

type PostTextImageRow = {
    id: string;
    post_id: string;
    text: string;
    image_url: string;
};

type PollsRow = {
    id: string;
    post_id: string;
    closes_at: Date;
    question: string;
};

type PollOptionsRow = {
    id: string;
    poll_id: string;
    position: string;
    option: string;
};

export async function getPostsFollowing(id: string): Promise<PostsRow[]> {
    const following = await getFollowing(id);

    return await database
        .query<PostsRow>(
            `
        SELECT * FROM posts
        WHERE user_id = ANY( $1 )
    `,
            [following],
        )
        .then((res) => res.rows);
}

/** 
    Gets most recent posts from all users except own user.
*/
export async function getPostsForYou(id: string): Promise<PostsRow[]> {
    return await database
        .query<PostsRow>(
            `
            SELECT * FROM posts
            WHERE user_id != $1
            ORDER BY id DESC
        `,
            [id],
        )
        .then((res) => res.rows);
}

export async function getPostsById(id: string) {
    const query = `
        SELECT * FROM posts
        WHERE id = $1
    `;
    const values = [id];

    const result = await database
        .query<PostsRow>(query, values)
        .then((res) => res.rows);

    return result.find((post) => post.id === id) ?? null;
}

async function createPost(user_id: string, post_type: string) {
    // query for inserting into posts
    const query = `
        INSERT INTO posts(user_id, post_type) 
        VALUES($1, $2) 
        RETURNING *
    `;
    const values = [user_id, post_type];

    return (await database.query<PostsRow>(query, values)).rows[0].id;
}

export async function createTextPost(user_id: string, text: string) {
    // create post and get id
    const post_id = await createPost(user_id, content_type.text);

    // query for inserting into posts_text
    const query = `
        INSERT INTO posts_text(post_id, text) 
        VALUES($1, $2)
    `;
    const values = [post_id, text];

    await database.query(query, values);
}

export async function createImagePost(user_id: string, image_url: string) {
    // create post and get id
    const post_id = await createPost(user_id, content_type.image);

    // query for inserting into posts_image
    const query = `
        INSERT INTO posts_image(post_id, image_url) 
        VALUES($1, $2)
    `;
    const values = [post_id, image_url];

    await database.query(query, values);
}

export async function createTextImagePost(
    user_id: string,
    text: string,
    image_url: string,
) {
    // create post and get id
    const post_id = await createPost(user_id, content_type.text_image);

    // query for inserting into posts_text_and_image
    const query = `
        INSERT INTO posts_text_and_image(post_id, text, image_url) 
        VALUES($1, $2, $3)
    `;
    const values = [post_id, text, image_url];

    await database.query(query, values);
}

export async function createPollPost(
    user_id: string,
    question: string,
    poll_options: string[],
    closes_at: Date,
) {
    // create post and get id
    const post_id = await createPost(user_id, content_type.poll);

    // create poll and get id
    const pollQuery = `
        INSERT INTO polls(post_id, closes_at, question) 
        VALUES($1, $2, $3) 
        RETURNING *
    `;
    const pollValues = [post_id, closes_at, question];

    const poll_id = (await database.query<PollsRow>(pollQuery, pollValues))
        .rows[0].id;

    // creates poll options
    const optionsQuery = `
        INSERT INTO poll_options(poll_id, position, option) 
        VALUES($1, $2, $3)
    `;

    let position = 0;
    poll_options.forEach(async (option) => {
        position++;
        const optionValues = [poll_id, position.toString(), option];

        if (position === poll_options.length)
            await database.query(optionsQuery, optionValues);
        else database.query(optionsQuery, optionValues);
    });
}

export async function deletePost(id: string) {
    const query = `
        DELETE 
        FROM posts 
        WHERE id = $1
    `;
    const values = [id];

    await database.query(query, values);
}

export async function getPostLikesById(post_id: string) {
    const query = `
        SELECT COUNT(*) 
        FROM post_likes 
        WHERE post_id = $1
    `;
    const values = [post_id];

    return Number(
        (await database.query<{ count: string }>(query, values)).rows[0].count,
    );
}

export async function checkPostLikedByUser(user_id: string, post_id: string) {
    const query = `
        SELECT * FROM post_likes
        WHERE user_id = $1 AND post_id = $2
    `;
    const values = [user_id, post_id];

    return (await database.query(query, values)).rowCount !== null;
}

export async function likePost(user_id: string, post_id: string) {
    const query = `
        INSERT INTO post_likes(user_id, post_id) 
        VALUES($1, $2)
    `;
    const values = [user_id, post_id];

    await database.query(query, values);
}

export async function unlikePost(user_id: string, post_id: string) {
    const query = `
        DELETE FROM post_likes
        WHERE user_id = $1 AND post_id = $2
    `;
    const values = [user_id, post_id];

    await database.query(query, values);
}
