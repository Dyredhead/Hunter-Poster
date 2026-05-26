import { z } from "zod";
import { API_MOUNT as _API_MOUNT } from "./api.js";

const API_MOUNT = _API_MOUNT + "/settings";

const SettingsProfileSchema = z.object({
    pfp_id: z.uuidv7().nullable(),
    banner_id: z.uuidv7().nullable(),
    description: z.string().nullable(),
});

const SettingsAccountSchema = z.object({
    username: z.string().nullable(),
    password: z.string().nullable(),
});

export const SettingsContract = {
    mount: API_MOUNT,
    routes: {
        updateProfile: {
            method: "PUT",
            backend_path: () => `${API_MOUNT}/profile`,
            frontend_path: () => `${API_MOUNT}/profile`,

            request: {
                body: SettingsProfileSchema,
            },

            responses: {
                200: {},
                400: {
                    body: z.object({
                        message: z.literal("Image with id not found"),
                    }),
                },
            },
        },
        updateAccount: {
            method: "PUT",
            backend_path: () => `${API_MOUNT}/account`,
            frontend_path: () => `${API_MOUNT}/account`,

            request: {
                body: SettingsAccountSchema,
            },

            responses: {
                200: {},
                400: {
                    body: z.object({
                        message: z.literal("Image with id not found"),
                    }),
                },
            },
        },
    },
} as const;

export type SettingsProfile = z.infer<typeof SettingsProfileSchema>;
export type SettingsAccount = z.infer<typeof SettingsAccountSchema>;

export type updateSettingsProfileRequest = z.infer<
    typeof SettingsContract.routes.updateProfile.request
>;
export type updateSettingsProfileResponse =
    | {
          status: 200;
          body: z.infer<
              (typeof SettingsContract.routes.updateProfile.responses)[200]
          >;
      }
    | {
          status: 400;
          body: z.infer<
              (typeof SettingsContract.routes.updateProfile.responses)[400]["body"]
          >;
      };

export type updateSettingsAccountRequest = z.infer<
    typeof SettingsContract.routes.updateAccount.request
>;
export type updateSettingsAccountResponse =
    | {
          status: 200;
          body: z.infer<
              (typeof SettingsContract.routes.updateAccount.responses)[200]
          >;
      }
    | {
          status: 400;
          body: z.infer<
              (typeof SettingsContract.routes.updateAccount.responses)[400]["body"]
          >;
      };
