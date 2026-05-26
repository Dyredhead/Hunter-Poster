import { z } from "zod";
import { API_MOUNT as _API_MOUNT } from "./api.js";
import { PostSchema } from "./posts.js";

const API_MOUNT = _API_MOUNT + "/users";

const UserSchema = z.object({
    id: z.uuidv7(),
    username: z.string(),
    email: z.email(),
    is_deleted: z.boolean(),
    description: z.string().nullable(),
    pfp_id: z.uuidv7().nullable(),
    banner_id: z.uuidv7().nullable(),
});

const UserFollowById = {
    method: "POST",
    backend_path: () => `${API_MOUNT}/follow`,
    frontend_path: () => `${API_MOUNT}/follow`,

    request: {
        body: z.object({
            id: z.uuidv7(),
        }),
    },

    responses: {
        200: {},
        404: {
            body: z.object({
                message: z.literal("User Id does not exist"),
            }),
        },
    },
};

const UserUnfollowById = {
    method: "DELETE",
    backend_path: () => `${API_MOUNT}/unfollow`,
    frontend_path: () => `${API_MOUNT}/unfollow`,

    request: {
        body: z.object({
            id: z.uuidv7(),
        }),
    },

    responses: {
        200: {},
        404: {
            body: z.object({
                message: z.literal("User Id does not exist"),
            }),
        },
    },
};

const UserGetCurrent = {
    method: "GET",
    backend_path: () => `${API_MOUNT}`,
    frontend_path: () => `${API_MOUNT}`,

    request: {},

    responses: {
        200: {
            body: UserSchema,
        },
        404: {
            body: z.object({
                message: z.literal("User Id does not exist"),
            }),
        },
    },
};

const UserGetByIdContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/:id`,
    frontend_path: (id: string) => `${API_MOUNT}/${id}`,

    request: {
        params: z.object({
            id: z.string(),
        }),
    },

    responses: {
        200: {
            body: UserSchema,
        },
        404: {
            body: z.object({
                message: z.literal("User Id does not exist"),
            }),
        },
    },
};

const UserGetFollowingByIdContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/:id/following`,
    frontend_path: (id: string) => `${API_MOUNT}/${id}/following`,

    request: {
        params: z.object({
            id: z.string(),
        }),
    },

    responses: {
        200: {
            body: z.array(z.uuidv7()),
        },
        404: {
            body: z.object({
                message: z.literal("User Id does not exist"),
            }),
        },
    },
};

const UserGetFollowersByIdContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/:id/followers`,
    frontend_path: (id: string) => `${API_MOUNT}/${id}/followers`,

    request: {
        params: z.object({
            id: z.string(),
        }),
    },

    responses: {
        200: {
            body: z.array(z.uuidv7()),
        },
        404: {
            body: z.object({
                message: z.literal("User Id does not exist"),
            }),
        },
    },
};

const UserGetPostsByIdContract = {
    method: "GET",
    backend_path: () => `${API_MOUNT}/:id/posts`,
    frontend_path: (id: string) => `${API_MOUNT}/${id}/posts`,

    request: {
        params: z.object({
            id: z.uuidv7(),
        }),
    },

    responses: {
        200: {
            body: z.array(PostSchema),
        },
        404: {
            body: z.object({
                message: z.literal("Posts by id not found"),
            }),
        },
    },
};

const UserCreateContract = {
    method: "POST",
    backend_path: () => `${API_MOUNT}`,
    frontend_path: () => `${API_MOUNT}`,

    request: {
        body: z.object({
            email: z.email(),
            password: z.string().min(8),
        }),
    },

    response: z.object({
        user: UserSchema,
    }),
};

export const usersContract = {
    mount: API_MOUNT,
    routes: {
        followById: UserFollowById,
        unfollowById: UserUnfollowById,
        getCurrent: UserGetCurrent,
        getById: UserGetByIdContract,
        getFollowersById: UserGetFollowersByIdContract,
        getFollowingById: UserGetFollowingByIdContract,
        getPostsbyId: UserGetPostsByIdContract,
        create: UserCreateContract,
    },
} as const;

export type User = z.infer<typeof UserSchema>;

export type UserFollowByIdRequest = z.infer<
    typeof usersContract.routes.followById.request.body
>;

export type UserUnfollowByIdRequest = z.infer<
    typeof usersContract.routes.unfollowById.request.body
>;

export type UserGetCurrent =
    | {
          status: 200;
          body: z.infer<
              (typeof usersContract.routes.getCurrent.responses)[200]["body"]
          >;
      }
    | {
          status: 404;
          body: z.infer<
              (typeof usersContract.routes.getCurrent.responses)[404]["body"]
          >;
      };

export type UserGetByIdParams = z.infer<
    typeof UserGetByIdContract.request.params
>;
export type UserGetByIdResponse =
    | {
          status: 200;
          body: z.infer<
              (typeof usersContract.routes.getById.responses)[200]["body"]
          >;
      }
    | {
          status: 404;
          body: z.infer<
              (typeof usersContract.routes.getById.responses)[404]["body"]
          >;
      };

export type UserCreateRequest = z.infer<typeof UserCreateContract.request.body>;
export type UserCreateResponse = z.infer<typeof UserCreateContract.response>;

export type UserGetFollowersByIdRequest = z.infer<
    typeof UserGetFollowersByIdContract.request.params
>;
export type UserGetFollowingByIdRequest = z.infer<
    typeof UserGetFollowingByIdContract.request.params
>;
export type UserGetPostsByIdRequest = z.infer<
    typeof UserGetPostsByIdContract.request.params
>;

export type UserGetPostsByUserIdResponse =
    | {
          status: 200;
          body: z.infer<
              (typeof UserGetPostsByIdContract.responses)[200]["body"]
          >;
      }
    | {
          status: 404;
          body: z.infer<
              (typeof UserGetPostsByIdContract.responses)[404]["body"]
          >;
      };
