import { z } from "zod";
import { API_MOUNT as _API_MOUNT } from "./api.js";
const API_MOUNT = _API_MOUNT + "/comment";

const CommentSchema = z.object({
    id: z.uuidv7(),
    user_id: z.uuidv7(),
    username: z.string(),
    comment_id: z.uuidv7().nullish(),
    post_id: z.uuidv7(),
    content: z.string(),
    likes: z.number(),
    liked: z.boolean(),
});

export const ConmmentCreateSchema = z.object({
    comment_id: z.uuidv7().nullish(),
    post_id: z.uuidv7(),
    content: z.string(),
});

const CommentGetPostImmediateContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/post/:id`,
    frontend_path: (id: string) => `${API_MOUNT}/post/${id}`,

    request: {
        params: z.object({
            post_id: z.uuidv7(),
        }),
    },

    response: {
        status: {
            success: 200,
            failed: 404,
        },
        body: z.array(CommentSchema),
    },
};

const CommentGetRepliesContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/replies/:id`,
    frontend_path: (id: string) => `${API_MOUNT}/replies/${id}`,

    request: {
        params: z.object({
            comment_id: z.uuidv7(),
        }),
    },

    response: {
        status: {
            success: 200,
            failed: 404,
        },
        body: z.array(CommentSchema),
    },
};

const CommentGetByIdContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/:id`,
    frontend_path: (id: string) => `${API_MOUNT}/${id}`,

    request: {
        params: z.object({
            comment_id: z.uuidv7(),
        }),
    },

    response: {
        status: {
            success: 200,
            failed: 404,
        },
        body: CommentSchema,
    },
};

const CommentCreateContract = {
    method: "POST",
    backend_path: () => `${API_MOUNT}/create`,
    frontend_path: () => `${API_MOUNT}/create`,

    request: {
        body: ConmmentCreateSchema,
    },

    response: {
        status: {
            success: 200,
            failed: 400,
        },
        body: CommentSchema,
    },
};

export type Comment = z.infer<typeof CommentSchema>;

export const commentContract = {
    mount: API_MOUNT,
    routes: {
        getByPostImm: CommentGetPostImmediateContract,
        getByReplies: CommentGetRepliesContract,
        getById: CommentGetByIdContract,
        create: CommentCreateContract,
    },
};

export type CommentGetPostImmediateRequest = z.infer<
    typeof CommentGetPostImmediateContract.request.params
>;
export type CommentGetPostImmediateResponse = z.infer<
    typeof CommentGetPostImmediateContract.response.body
>;

export type CommentGetRepliesRequest = z.infer<
    typeof CommentGetRepliesContract.request.params
>;
export type CommentGetRepliesResponse = z.infer<
    typeof CommentGetRepliesContract.response.body
>;

export type CommentGetByIdRequest = z.infer<
    typeof CommentGetByIdContract.request.params
>;
export type CommentGetByIdResponse = z.infer<
    typeof CommentGetByIdContract.response.body
>;

export type CommentCreateRequest = z.infer<
    typeof CommentCreateContract.request.body
>;
export type CommentCreateResponse = z.infer<
    typeof CommentCreateContract.response.body
>;
