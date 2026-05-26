import {
    usersContract,
    type UserFollowByIdRequest,
    type UserGetByIdParams,
    type UserGetFollowersByIdRequest,
    type UserGetFollowingByIdRequest,
    type UserGetPostsByIdRequest,
} from "@my-app/shared";
import { apiFetch } from "./client.ts";

export async function userFollowById(
    request: UserFollowByIdRequest,
): Promise<Response> {
    const body = usersContract.routes.followById.request.body.parse(request);

    const response = await apiFetch<unknown>(
        usersContract.routes.followById.frontend_path(),
        usersContract.routes.followById.method,
        body,
    );

    return response;
}

export async function userUnfollowById(
    request: UserFollowByIdRequest,
): Promise<Response> {
    const body = usersContract.routes.unfollowById.request.body.parse(request);

    const response = await apiFetch<unknown>(
        usersContract.routes.unfollowById.frontend_path(),
        usersContract.routes.unfollowById.method,
        body,
    );

    return response;
}

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

export async function userGetFollowersById(
    params: UserGetFollowersByIdRequest,
): Promise<Response> {
    const route = usersContract.routes.getFollowersById;
    const response = await apiFetch<unknown>(
        route.frontend_path(params.id),
        route.method,
    );

    return response;
}

export async function userGetFollowingById(
    params: UserGetFollowingByIdRequest,
): Promise<Response> {
    const route = usersContract.routes.getFollowingById;
    const response = await apiFetch<unknown>(
        route.frontend_path(params.id),
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
