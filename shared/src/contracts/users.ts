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
    pfp_id: z.url().nullable(),
    banner_id: z.url().nullable(),
});

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
        getCurrent: UserGetCurrent,
        getById: UserGetByIdContract,
        getPostsbyId: UserGetPostsByIdContract,
        create: UserCreateContract,
    },
} as const;

export type User = z.infer<typeof UserSchema>;

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
