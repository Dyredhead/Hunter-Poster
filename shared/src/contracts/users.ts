import { z } from "zod";
import { API_MOUNT as _API_MOUNT } from "./index.js";
const API_MOUNT = _API_MOUNT + "/users";

const UserSchema = z.object({
    id: z.int(),
    username: z.string(),
    email: z.email(),
});

const UserGetByIdContract = {
    method: "GET",
    pattern: "/:id",
    build: (id: number) => `API_MOUNT/${id}`,

    request: {
        params: z.object({
            id: z.int(),
        }),
    },

    response: z.object({
        user: UserSchema,
    }),
};

const UserCreateContract = {
    method: "POST",
    pattern: "/",
    build: () => API_MOUNT,

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
    routes: { getById: UserGetByIdContract, create: UserCreateContract },
} as const;

export type User = z.infer<typeof UserSchema>;

export type UserGetByIdParams = z.infer<
    typeof UserGetByIdContract.request.params
>;
export type UserGetByIdResponse = z.infer<typeof UserGetByIdContract.response>;

export type UserCreateRequest = z.infer<typeof UserCreateContract.request.body>;
export type UserCreateResponse = z.infer<typeof UserCreateContract.response>;
