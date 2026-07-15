import { uuidv7, z } from "zod";
import { API_MOUNT as _API_MOUNT } from "./api.js";
import { ProfilePreviewSchema } from "./users.js";
const POST_MOUNT = _API_MOUNT + "/post";
const COMMENT_MOUNT = _API_MOUNT + "/comment";


const CommentSchema = z.object({
    id: z.uuidv7(),
    profile: ProfilePreviewSchema,
    parent_id: z.uuidv7().nullable(),
    post_id: z.uuidv7(),
    content: z.string(),
    likes: z.number(),
    liked: z.boolean(),
    total_replies: z.number(),
})

export type Comment = z.infer<typeof CommentSchema>;

const CommentCreateSchema = z.object({
    parent_id: z.uuidv7().nullable(),
    post_id: z.uuidv7(),
    content: z.string(),
});

const CommentGetByPostContract = {
    method: "GET",
    backend_path: () => `${POST_MOUNT}/:id/comments`,
    frontend_path: (post_id: string) => `${POST_MOUNT}/${post_id}/comments`,

    request: {
        path_params: z.object({
            id: z.uuidv7(),
        }),
        query_params: z.object({
            cursor: z.uuidv7(),
            page_size: z.coerce.number(),
        }),
    },

    response: z.array(CommentSchema)
};

export type CommentGetByPostRequest = z.Infer<typeof CommentGetByPostContract.request.query_params>;
export type CommentGetByPostResponse = z.Infer<typeof CommentGetByPostContract.response>;


const CommentGetRepliesContract = {
    method: "GET",
    backend_path: () => `${COMMENT_MOUNT}/:id/replies`,
    frontend_path: (parent_id: string) => `${COMMENT_MOUNT}/${parent_id}/replies`,

    request: {
        path_params: z.object({
            id: z.uuidv7(),
        }),
        query_params: z.object({
            cursor: z.uuidv7(),
        }),
    },

    response: z.array(CommentSchema)
};

export type CommentGetRepliesRequest = z.infer<typeof CommentGetRepliesContract.request.query_params>;
export type CommentGetRepliesResponse = z.infer<typeof CommentGetRepliesContract.response>;


const CommentGetByIdContract = {
    method: "GET",
    backend_path: () => `${COMMENT_MOUNT}/:id`,
    frontend_path: (id: string) => `${COMMENT_MOUNT}/${id}`,

    request: {
        path_params: z.object({
            id: z.uuidv7(),
        }),
    },

    response: CommentSchema
};

export type CommentGetByIdResponse = z.infer<typeof CommentGetByIdContract.response>;


const CommentCreateContract = {
    method: "POST",
    backend_path: () => `${POST_MOUNT}/:post_id/create_comment`,
    frontend_path: (post_id: string) => `${POST_MOUNT}/${post_id}/create_comment`,

    request: {
        body: CommentCreateSchema,
    },

    response: CommentSchema
};

export type CommentCreateRequest = z.infer<typeof CommentCreateContract.request.body>;
export type CommentCreateResponse = z.infer<typeof CommentCreateContract.response>;


export const commentContract = {
    routes: {
        getByPost: CommentGetByPostContract,
        getByReplies: CommentGetRepliesContract,
        getById: CommentGetByIdContract,
        create: CommentCreateContract,
    },
};

