export async function apiFetch<TRequest>(
    url: string,
    method: string,
    body?: TRequest,
    headers?: Record<string, string>,
    auth?: boolean,
): Promise<Response> {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch(url, {
        method: method,
        headers: {
            ...(body !== undefined
                ? { "Content-Type": "application/json" }
                : {}),
            ...(auth && accessToken
                ? { Authorization: `Bearer ${accessToken}` }
                : {}),
            ...(headers ?? {}),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
    });

    return response;
}
