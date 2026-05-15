import { parseAsync, string, z } from "zod";
import { API_MOUNT as _API_MOUNT } from "./api.js";
const API_MOUNT = _API_MOUNT + "/posts";

const TextSchema = z.object({
    content: z.string(),
});

const ImageSchema = z.object({
    image_url: z.string(),
});

const TextImageSchema = z.object({
    content: z.string(),
    image_url: z.string(),
});

const PollSchema = z.object({
    question: z.string(),
    closes_at: z.iso.datetime(),
    options: z.array(z.string()).max(4),
    vote: z.int().min(0).max(4),
    final_votes: z.array(z.int().min(0)).max(4).nullable(),
});

const ContentSchema = z.union([
    TextSchema,
    ImageSchema,
    TextImageSchema,
    PollSchema,
]);

// const ContentUpdateSchema = z.union([TextSchema, ImageSchema, TextImageSchema]);

const PostSchema = z.object({
    id: z.uuidv7(),
    created_by: z.string(),
    created_at: z.iso.datetime(),
    content: ContentSchema,
    comments: z.int().min(0),
    likes: z.int().min(0),
    booksmarks: z.int().min(0),
});

// const PostUpdateSchema = z.object({
//     content: ContentUpdateSchema,
// });

const PostLikeContract = {
    method: "POST",
    backend_path: () => `${API_MOUNT}/like`,
    frontend_path: () => `${API_MOUNT}/like`,

    request: {
        body: z.object({
            post_id: z.uuidv7(),
            user_id: z.uuidv7(),
        }),
    },
};

const PostUnLikeContract = {
    method: "POST",
    backend_path: () => `${API_MOUNT}/unlike`,
    frontend_path: () => `${API_MOUNT}/unlike`,

    request: {
        body: z.object({
            post_id: z.uuidv7(),
            user_id: z.uuidv7(),
        }),
    },
};

const PostGetByIdContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/:id`,
    frontend_path: (id: number) => `${API_MOUNT}/${id}`,

    request: {
        params: z.object({
            id: z.int(),
        }),
    },

    response: z.object({
        post: PostSchema,
    }),
};

const PostGetByFollowingContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/following`,
    frontend_path: () => `${API_MOUNT}/following`,

    response: z.object({
        posts: z.array(PostSchema).max(10),
    }),
};

const PostGetByForYouContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/for-you`,
    frontend_path: () => `${API_MOUNT}/for-you`,

    response: z.object({
        posts: z.array(PostSchema).max(10),
    }),
};

// const PostUpdateByIdContract = {
//     method: "PUT",
//     pattern: "/:id",
//     build: (id: number) => `${API_MOUNT}/${id}`,

//     request: {
//         params: z.object({
//             id: z.int(),
//         }),
//         body: z.object({
//             post: PostUpdateSchema,
//         }),
//     },

//     response: z.object({
//         post: PostSchema,
//     }),
// };

const PostCreateContract = {
    method: "POST",
    backend_path: () => `${API_MOUNT}/create`,
    frontend_path: () => `${API_MOUNT}/create`,

    request: {
        body: ContentSchema,
    },

    response: z.object({
        status: 201 | 400,
    }),
};

const PostDeleteByIdContract = {
    method: "DELETE",
    backend_path: () => `${API_MOUNT}/:id`,
    frontend_path: (id: number) => `${API_MOUNT}/${id}`,

    request: {
        params: z.object({
            id: z.int(),
        }),
    },

    response: z.object({
        status: 204,
    }),
};

export const postContract = {
    mount: API_MOUNT,
    routes: {
        getById: PostGetByIdContract,
        getByFollowing: PostGetByFollowingContract,
        getByForYou: PostGetByForYouContract,
        //updateById: PostUpdateByIdContract,
        create: PostCreateContract,
        delete: PostDeleteByIdContract,
        like: PostLikeContract,
        unlike: PostUnLikeContract,
    },
} as const;

export enum content_type {
    text = "text",
    image = "image",
    text_image = "text_image",
    poll = "poll",
}

export type Content = {
    contentType: content_type;
    content: z.infer<typeof ContentSchema>;
};

export type PostGetByIdRequest = z.infer<
    typeof PostGetByIdContract.request.params
>;
export type PostGetByIdResponse = z.infer<typeof PostGetByIdContract.response>;

export type PostGetByFollowingResponse = z.infer<
    typeof PostGetByFollowingContract.response
>;
export type PostGetByForYouResponse = z.infer<
    typeof PostGetByForYouContract.response
>;

// export type PostUpdateByIdParams = z.infer<
//     typeof PostUpdateByIdContract.request.params
// >;
// export type PostUpdateByIdRequestBody = z.infer<
//     typeof PostUpdateByIdContract.request.body
// >;
// export type PostUpdateByIdResponseBody = z.infer<
//     typeof PostUpdateByIdContract.response
//>;

export type PostLikeRequest = z.infer<typeof PostLikeContract.request.body>;
export type PostUnLikeRequest = z.infer<typeof PostUnLikeContract.request.body>;

export type PostDeleteByIdParams = z.infer<
    typeof PostDeleteByIdContract.request.params
>;

export type PostCreateRequest = z.infer<typeof PostCreateContract.request.body>;
