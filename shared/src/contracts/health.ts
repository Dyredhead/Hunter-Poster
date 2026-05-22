export const healthContract = {
    method: "GET",
    path: "/api/health",
} as const;

export type HealthResponse = {
    ok: boolean;
    message: string;
};
