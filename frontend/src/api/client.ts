export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, data: unknown, message?: string) {
    super(message ?? `Request failed with status ${status}`);
    this.status = status;
    this.data = data;
  }
}


export async function apiFetch<TResponse, TBody = unknown>(
  url: string,
  method: string,
  body?: TBody,
  headers?: Record<string, string>,
): Promise<TResponse> {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers ?? {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  let json: unknown = null;
  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    json = await response.json();
  }

  if (!response.ok) {
    throw new ApiError(response.status, json);
  }

  return json as TResponse;
}
