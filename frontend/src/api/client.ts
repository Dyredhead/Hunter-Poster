export async function apiFetch<TRequest>(
    url: string,
    method: string,
    body?: TRequest,
    headers?: Record<string, string>,
): Promise<Response> {
    const accessToken = localStorage.getItem("token");
    console.log("HELLO THIS IS API TOKENAWDAWDDW");
    console.log(accessToken);

    const response = await fetch(url, {
        method: method,
        headers: {
            ...(body !== undefined
                ? { "Content-Type": "application/json" }
                : {}),
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...(headers ?? {}),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
    });

    return response;
}
