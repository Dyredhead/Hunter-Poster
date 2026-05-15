import { postContract, type PostLikeRequest } from "@my-app/shared";
import { apiFetch } from "@/api/client";

// export async function register(request: RegisterRequest): Promise<Response> {
//     const body = registerContract.routes.register.request.body.parse(request);

// const response = await apiFetch<RegisterRequest>(
//     registerContract.routes.register.frontend_path(),
//     registerContract.routes.register.method,
//     body,
// );

//     return response;
// }

export async function likePost(request: PostLikeRequest): Promise<Response> {
    const body = postContract.routes.like.request.body.parse(request);

    const response = await apiFetch<PostLikeRequest>(
        postContract.routes.like.frontend_path(),
        postContract.routes.like.method,
        body,
    );

    return response;
}

export async function unlikePost(request: PostLikeRequest): Promise<Response> {
    const body = postContract.routes.unlike.request.body.parse(request);

    const response = await apiFetch<PostLikeRequest>(
        postContract.routes.unlike.frontend_path(),
        postContract.routes.unlike.method,
        body,
    );

    return response;
}
