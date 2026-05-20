import { apiFetch } from "@/api/client";
import { registerContract, type RegisterRequest } from "@my-app/shared";

export async function register(request: RegisterRequest): Promise<Response> {
    const body = registerContract.routes.register.request.body.parse(request);

    const response = await apiFetch<RegisterRequest>(
        registerContract.routes.register.frontend_path(),
        registerContract.routes.register.method,
        false,
        body,
    );

    return response;
}
