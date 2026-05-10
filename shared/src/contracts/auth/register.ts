import { z } from "zod";
import { API_MOUNT as PARENT_API_MOUNT } from "./api.js";

const API_MOUNT = `${PARENT_API_MOUNT}/register`;

export const registerContract = {
    mount: API_MOUNT,
    routes: {
        register: {
            method: "POST",
            backend_path: () => `${API_MOUNT}`,
            frontend_path: () => `${API_MOUNT}`,

            request: {
                body: z.object({
                    username: z.string(),
                    email: z.email(),
                    password: z.string(),
                }),
            },

            responses: {
                200: {
                    body: z.undefined(),
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

export type RegisterRequest = z.infer<
    typeof registerContract.routes.register.request
>;
export type RegisterResponse =
    | {
          status: 200;
          body?: undefined;
      }
    | {
          status: 401;
          body: z.infer<
              (typeof registerContract.routes.register.responses)[401]["body"]
          >;
      };
