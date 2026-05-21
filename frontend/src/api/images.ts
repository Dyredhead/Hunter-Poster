import {
    ImageContract,
    type getImageByIdRequest,
    type uploadImageRequest,
} from "@my-app/shared";
import { apiFetch } from "./client.ts";

export async function uploadImage(
    request: uploadImageRequest,
): Promise<Response> {
    const body = ImageContract.routes.upload.request.body.parse(request);

    const route = ImageContract.routes.upload;
    const response = await apiFetch<unknown>(
        route.frontend_path(),
        route.method,
        body,
    );

    return response;
}

export async function getImage(
    request: getImageByIdRequest,
): Promise<Response> {
    const params = ImageContract.routes.getById.request.params.parse(request);

    const route = ImageContract.routes.getById;
    const response = await apiFetch<unknown>(
        route.frontend_path(params.id),
        route.method,
    );

    return response;
}

export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result;

            if (typeof result !== "string") {
                reject(new Error("Failed to read file"));
                return;
            }

            // result looks like:
            // data:image/png;base64,iVBORw0KGgo...
            const base64 = result.split(",")[1];

            if (!base64) {
                reject(new Error("Invalid base64 result"));
                return;
            }

            resolve(base64);
        };

        reader.onerror = () => {
            reject(reader.error);
        };

        reader.readAsDataURL(file);
    });
}
