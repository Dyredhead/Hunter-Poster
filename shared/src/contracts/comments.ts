import { z } from "zod";
import { API_MOUNT as _API_MOUNT } from "./api.js";
import { ProfilePreview } from "./users.js";
const API_MOUNT = _API_MOUNT + "/comment";

export type CommentSchema = {
    id: string;
    profile: ProfilePreview
    comment_id: string | null | undefined;
    post_id: string;
    content: string;
    likes: number;
    liked: boolean;
    replies: CommentSchema[];
}

export const ConmmentCreateSchema = z.object({
    comment_id: z.uuidv7().nullish(),
    post_id: z.uuidv7(),
    content: z.string(),
});

const CommentGetByPostContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/post/:id`,
    frontend_path: (id: string) => `${API_MOUNT}/post/${id}`,

    request: {
        params: z.object({
            id: z.uuidv7(),
        }),
    },

    response: {
        status: {
            success: 200,
            failed: 404,
        },
    },
};

export type CommentGetByPostRequest = z.infer<
    typeof CommentGetByPostContract.request.params
>;
export type CommentGetByPostResponse = CommentSchema[];


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
    },
};

export type CommentGetRepliesRequest = z.infer<
    typeof CommentGetRepliesContract.request.params
>;
export type CommentGetRepliesResponse = CommentSchema;


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
    },
};

export type CommentGetByIdRequest = z.infer<
    typeof CommentGetByIdContract.request.params
>;
export type CommentGetByIdResponse = CommentSchema;


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
    },
};

export type CommentCreateRequest = z.infer<
    typeof CommentCreateContract.request.body
>;
export type CommentCreateResponse = CommentSchema;


export const commentContract = {
    mount: API_MOUNT,
    routes: {
        getByPost: CommentGetByPostContract,
        getByReplies: CommentGetRepliesContract,
        getById: CommentGetByIdContract,
        create: CommentCreateContract,
    },
};

