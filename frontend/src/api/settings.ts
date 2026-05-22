import {
    SettingsContract,
    type updateSettingsAccountRequest,
    type updateSettingsProfileRequest,
} from "@my-app/shared";
import { apiFetch } from "./client.ts";

export async function updateSettingsProfile(
    request: updateSettingsProfileRequest,
): Promise<Response> {
    const body =
        SettingsContract.routes.updateProfile.request.body.parse(request);

    const route = SettingsContract.routes.updateProfile;
    const response = await apiFetch<unknown>(
        route.frontend_path(),
        route.method,
        body,
    );

    return response;
}

export async function updateSettingsAccount(
    request: updateSettingsAccountRequest,
): Promise<Response> {
    const body =
        SettingsContract.routes.updateAccount.request.body.parse(request);

    const route = SettingsContract.routes.updateAccount;
    const response = await apiFetch<unknown>(
        route.frontend_path(),
        route.method,
        body,
    );

    return response;
}
