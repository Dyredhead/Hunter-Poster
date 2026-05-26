import { parseAsync, string, z } from "zod";
import { API_MOUNT as _API_MOUNT } from "./api.js";
const API_MOUNT = _API_MOUNT + "/posts";

const TextSchema = z.object({
    type: z.literal("text"),
    content: z.string(),
});

const ImageSchema = z.object({
    type: z.literal("image"),
    image_id: z.string(),
});

const TextImageSchema = z.object({
    type: z.literal("text_image"),
    content: z.string(),
    image_id: z.string(),
});

const PollSchema = z.object({
    type: z.literal("poll"),
    question: z.string(),
    closes_at: z.iso.datetime(),
    options: z.array(z.string()).max(4),
    vote: z.int().min(0).max(4),
    current_votes: z.array(z.int().min(0)).max(4),
});

const PollCreateSchema = z.object({
    type: z.literal("poll"),
    question: z.string(),
    closes_at: z.iso.datetime(),
    options: z.array(z.string()).max(4),
});

const ContentCreateSchema = z.discriminatedUnion("type", [
    TextSchema,
    ImageSchema,
    TextImageSchema,
    PollCreateSchema,
]);

const ContentSchema = z.discriminatedUnion("type", [
    TextSchema,
    ImageSchema,
    TextImageSchema,
    PollSchema,
]);

// const ContentUpdateSchema = z.union([TextSchema, ImageSchema, TextImageSchema]);

export const PostSchema = z.object({
    id: z.uuidv7(),
    author_id: z.uuidv7(),
    content: ContentSchema,
    comments: z.int().min(0),
    likes: z.int().min(0),
    bookmarks: z.int().min(0),
});

const PostCheckLikedContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/like/:id`,
    frontend_path: (id: string) => `${API_MOUNT}/like/${id}`,

    request: {
        params: z.object({
            id: z.uuidv7(),
        }),
    },

    responses: {
        200: {
            body: z.object({
                isLiked: z.boolean(),
            }),
        },
        404: {
            body: z.object({
                message: z.literal("Post with id not found"),
            }),
        },
    },
};

const PostLikeContract = {
    method: "POST",
    backend_path: () => `${API_MOUNT}/like`,
    frontend_path: () => `${API_MOUNT}/like`,

    request: {
        body: z.object({
            post_id: z.uuidv7(),
        }),
    },

    response: z.union([
        z.object({
            success: z.literal(200),
        }),
        z.object({
            failed: z.literal(400),
        }),
    ]),
};

const PostUnlikeContract = {
    method: "DELETE",
    backend_path: () => `${API_MOUNT}/like`,
    frontend_path: () => `${API_MOUNT}/like`,

    request: {
        body: z.object({
            post_id: z.uuidv7(),
        }),
    },

    response: z.union([
        z.object({
            success: z.literal(200),
        }),
        z.object({
            failed: z.literal(400),
        }),
    ]),
};

const PostCheckBookmarkedContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/bookmark/:id`,
    frontend_path: (id: string) => `${API_MOUNT}/bookmark/${id}`,

    request: {
        params: z.object({
            id: z.uuidv7(),
        }),
    },

    responses: {
        200: {
            body: z.object({
                isBookmarked: z.boolean(),
            }),
        },
        404: {
            body: z.object({
                message: z.literal("Post with id not found"),
            }),
        },
    },
};

const PostBookmarkContract = {
    method: "POST",
    backend_path: () => `${API_MOUNT}/bookmark`,
    frontend_path: () => `${API_MOUNT}/bookmark`,

    request: {
        body: z.object({
            post_id: z.uuidv7(),
        }),
    },

    response: z.union([
        z.object({
            success: z.literal(200),
        }),
        z.object({
            failed: z.literal(400),
        }),
    ]),
};

const PostUnbookmarkContract = {
    method: "DELETE",
    backend_path: () => `${API_MOUNT}/bookmark`,
    frontend_path: () => `${API_MOUNT}/bookmark`,

    request: {
        body: z.object({
            post_id: z.uuidv7(),
        }),
    },

    response: z.union([
        z.object({
            success: z.literal(200),
        }),
        z.object({
            failed: z.literal(400),
        }),
    ]),
};

const PostGetByIdContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/:id`,
    frontend_path: (id: string) => `${API_MOUNT}/${id}`,

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
        body: PostSchema.nullish(),
    },
};

const PostGetByFollowingContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/following`,
    frontend_path: () => `${API_MOUNT}/following`,

    response: z.array(PostSchema),
};

const PostGetByForYouContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/for-you`,
    frontend_path: () => `${API_MOUNT}/for-you`,

    response: z.array(PostSchema),
};

const PostDeleteByIdContract = {
    method: "DELETE",
    backend_path: () => `${API_MOUNT}/:id`,
    frontend_path: (id: string) => `${API_MOUNT}/${id}`,

    request: {
        params: z.object({
            id: z.int(),
        }),
    },

    response: z.object({
        status: 204,
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
        body: ContentCreateSchema,
    },

    response: {
        failed: 400,
        post_created: 201,
    },
};

export const postContract = {
    mount: API_MOUNT,
    routes: {
        getById: PostGetByIdContract,
        getByFollowing: PostGetByFollowingContract,
        getByForYou: PostGetByForYouContract,
        create: PostCreateContract,
        delete: PostDeleteByIdContract,
        // Like
        checkLiked: PostCheckLikedContract,
        like: PostLikeContract,
        unlike: PostUnlikeContract,
        // Bookmark
        checkBookmarked: PostCheckBookmarkedContract,
        bookmark: PostBookmarkContract,
        unbookmark: PostUnbookmarkContract,
    },
} as const;

export enum content_type {
    text = "text",
    image = "image",
    text_image = "text_image",
    poll = "poll",
}

export enum poll_position_type {
    _1 = "1",
    _2 = "2",
    _3 = "3",
    _4 = "4",
}

export type Content = z.infer<typeof ContentSchema>;
export type ContentPoll = z.infer<typeof PollSchema>;

export type Post = z.infer<typeof PostSchema>;

export type PostCheckLikedRequest = z.infer<
    typeof PostCheckLikedContract.request.params
>;
export type PostCheckLikedResponse =
    | {
          status: 200;
          body: z.infer<
              (typeof postContract.routes.checkLiked.responses)[200]["body"]
          >;
      }
    | {
          status: 404;
          body: z.infer<
              (typeof postContract.routes.checkLiked.responses)[404]["body"]
          >;
      };

export type PostCheckBookmarkedRequest = z.infer<
    typeof PostCheckBookmarkedContract.request.params
>;
export type PostCheckBookmarkedResponse =
    | {
          status: 200;
          body: z.infer<
              (typeof postContract.routes.checkBookmarked.responses)[200]["body"]
          >;
      }
    | {
          status: 404;
          body: z.infer<
              (typeof postContract.routes.checkBookmarked.responses)[404]["body"]
          >;
      };

export type PostGetByIdRequest = z.infer<
    typeof PostGetByIdContract.request.params
>;
// export type PostGetByIdResponse = z.infer<typeof PostGetByIdContract.responses>;
export type PostGetByIdResponse = z.infer<
    typeof PostGetByIdContract.response.body
>;

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
export const PostLikeResponse = PostLikeContract.response;
export type PostUnlikeRequest = z.infer<typeof PostUnlikeContract.request.body>;
export const PostUnLikeResponse = PostUnlikeContract.response;

export type PostBookmarkRequest = z.infer<
    typeof PostBookmarkContract.request.body
>;
export const PostBookmarkResponse = PostBookmarkContract.response;
export type PostUnbookmarkRequest = z.infer<
    typeof PostUnbookmarkContract.request.body
>;
export const PostUnbookmarkResponse = PostUnbookmarkContract.response;

export type PostDeleteByIdParams = z.infer<
    typeof PostDeleteByIdContract.request.params
>;

export type PostCreateRequest = z.infer<typeof PostCreateContract.request.body>;
export enum creationStateType {
    Basic = "Basic",
    Poll = "Poll",
}
