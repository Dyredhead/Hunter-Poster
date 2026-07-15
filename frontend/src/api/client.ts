export async function apiFetch<TRequest>(
    url: string,
    method: string,
    body?: TRequest,
    query?: Record<string, string | number | boolean>,
    headers?: Record<string, string>,
): Promise<Response> {
    const accessToken = localStorage.getItem("token");
    console.log("JWT: ", accessToken);

    if (query != undefined) {
        const tempURL = new URL(url, window.location.origin);
        tempURL.search = new URLSearchParams(query as any).toString();

        url = tempURL.toString();
    }
        

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
