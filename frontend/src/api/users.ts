import {
    usersContract,
    type UserGetByIdParams,
    type UserGetPostsByIdRequest,
} from "@my-app/shared";
import { apiFetch } from "./client.ts";

export async function userGetById(
    params: UserGetByIdParams,
): Promise<Response> {
    const route = usersContract.routes.getById;
    const response = await apiFetch<unknown>(
        route.frontend_path(params.id),
        route.method,
    );

    return response;
}

export async function userGetCurrent(): Promise<Response> {
    const route = usersContract.routes.getCurrent;
    const response = await apiFetch<unknown>(
        route.frontend_path(),
        route.method,
    );

    return response;
}

export async function userGetPostsById(
    params: UserGetPostsByIdRequest,
): Promise<Response> {
    const route = usersContract.routes.getPostsbyId;
    const response = await apiFetch<unknown>(
        route.frontend_path(params.id),
        route.method,
    );

    return response;
}
