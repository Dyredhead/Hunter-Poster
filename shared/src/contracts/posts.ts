import { parseAsync, string, z } from "zod";
import { API_MOUNT as _API_MOUNT } from "./index.js";
const API_MOUNT = _API_MOUNT + "/posts";



const TextSchema = z.object({
    content: z.string()
});


const ImageSchema = z.object({
    Image_url: z.string()
});


const TextImageSchema = z.object({
    content: z.string(),
    Image_url: z.string()
});


const PollSchema = z.object({
    question: z.string(),
    closes_at: z.iso.datetime(),
    options: z.array(z.string()).max(4),
    vote: z.int().min(0).max(4),
    final_votes: z.array(z.int().min(0)).max(4).nullable()
});


const ContentSchema = z.union([
    TextSchema,
    ImageSchema,
    TextImageSchema,
    PollSchema
]);


const ContentUpdateSchema = z.union([
    TextSchema,
    ImageSchema,
    TextImageSchema,
]);


const PostSchema = z.object({
    id: z.uuidv7(),
    created_by: z.string(),
    created_at: z.iso.datetime(),
    content: ContentSchema,
    comments: z.int().min(0),
    likes: z.int().min(0),
    booksmarks: z.int().min(0),
});


const PostUpdateSchema = z.object({
    content: ContentUpdateSchema,
});


const PostGetByIdContract = {
    method: "GET",
    pattern: "/:id",
    build: (id: number) => `${API_MOUNT}/${id}`,

    request: {
        params: z.object({
            id: z.int(),
        }),
    },

    response: z.object({
        post: PostSchema
    }),
};


const PostGetByFollowingContract = {
    method: "GET",
    pattern: "/following",
    build: () => `${API_MOUNT}/following`,

    response: z.object({
        posts: z.array(PostSchema).max(10)
    }),
}


const PostGetByForYouContract = {
    method: "GET",
    pattern: "/for-you",
    build: () => `${API_MOUNT}/for-you`,

    response: z.object({
        posts: z.array(PostSchema).max(10)
    }),
}


const PostUpdateByIdContract = {
    method: "PUT",
    pattern: "/:id",
    build: (id: number) => `${API_MOUNT}/${id}`,

    request: {
        params: z.object({
            id: z.int(),
        }),
        body: z.object({
            post: PostUpdateSchema,
        }),
    },

    response: z.object({
        post: PostSchema
    }),
}


const PostDeleteByIdContract = {
    method: "DELETE",
    pattern: ":id",
    build: (id: number) => `${API_MOUNT}/${id}`,

    request: {
        params: z.object({
            id: z.int(),
        }),
    },

    response: z.object({
        status: 204,
    }),
}


export const postsContract = {
    mount: API_MOUNT,
    routes: {
        getById: PostGetByIdContract,
        getByFollowing: PostGetByFollowingContract,
        getByForYou: PostGetByForYouContract,
        updateById: PostUpdateByIdContract,
        delete: PostDeleteByIdContract,
    },
} as const;

export type Content = z.infer<typeof ContentSchema>;

export type PostGetByIdParams = z.infer<typeof PostGetByIdContract.request.params>;
export type PostGetByIdResponse = z.infer<typeof PostGetByIdContract.response>;

export type PostGetByFollowingResponse = z.infer<typeof PostGetByFollowingContract.response>;
export type PostGetByForYouResponse = z.infer<typeof PostGetByForYouContract.response>;

export type PostUpdateByIdParams = z.infer<typeof PostUpdateByIdContract.request.params>;
export type PostUpdateByIdRequestBody = z.infer<typeof PostUpdateByIdContract.request.body>;
export type PostUpdateByIdResponse = z.infer<typeof PostUpdateByIdContract.response>;

export type PostDeleteById = z.infer<typeof PostDeleteByIdContract.request.params>;