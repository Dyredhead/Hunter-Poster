import { jwt, z } from "zod";
import { API_MOUNT as PARENT_API_MOUNT } from "./api.js";

const API_MOUNT = `${PARENT_API_MOUNT}/login`;

export const loginContract = {
    mount: API_MOUNT,
    routes: {
        login: {
            method: "POST",
            backend_path: () => `${API_MOUNT}`,
            frontend_path: () => `${API_MOUNT}`,

            request: {
                body: z.object({
                    email: z.email(),
                    password: z.string(),
                }),
            },

            responses: {
                200: {
                    body: z.object({
                        token: z.jwt(),
                    }),
                },
                401: {
                    body: z.object({
                        error: z.literal("Unauthorized"),
                        message: z.literal(
                            "Either the email or password was incorrect",
                        ),
                    }),
                },
            },
        },
    },
} as const;

export type LoginRequest = z.infer<typeof loginContract.routes.login.request>;
export type LoginResponse =
    | {
          status: 200;
          body: z.infer<
              (typeof loginContract.routes.login.responses)[200]["body"]
          >;
      }
    | {
          status: 401;
          body: z.infer<
              (typeof loginContract.routes.login.responses)[401]["body"]
          >;
      };
