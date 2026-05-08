export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, data: unknown, message?: string) {
    super(message ?? `Request failed with status ${status}`);
    this.status = status;
    this.data = data;
  }
}

type ApiFetchOptions<TBody> = {
  method: string;
  body?: TBody;
  headers?: Record<string, string>;
};

export async function apiFetch<TResponse, TBody = unknown>(
  url: string,
  options: ApiFetchOptions<TBody>
): Promise<TResponse> {
  const response = await fetch(url, {
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
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
