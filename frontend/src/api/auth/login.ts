import { apiFetch } from "@/api/client";
import { loginContract, type LoginRequest } from "@my-app/shared";

export async function login(request: LoginRequest): Promise<Response> {
    const body = loginContract.routes.login.request.body.parse(request);

    const response = await apiFetch<LoginRequest>(
        loginContract.routes.login.frontend_path(),
        loginContract.routes.login.method,
        body,
    );

    return response;
}
