import { z } from "zod";
import { API_MOUNT as PARENT_API_MOUNT } from "./api.js";

const API_MOUNT = `${PARENT_API_MOUNT}/images`;

const ImageSchema = z.object({
    image_type: z.string(),
    image_mime: z.string(),
    image_data: z.string(),
});

export const ImageContract = {
    mount: API_MOUNT,
    routes: {
        getById: {
            method: "GET",
            backend_path: () => `${API_MOUNT}/:id`,
            frontend_path: (id: string) => `${API_MOUNT}/${id}`,

            request: {
                params: z.object({
                    id: z.string(),
                }),
            },

            responses: {
                200: {
                    body: ImageSchema,
                },
                404: {
                    body: z.object({
                        message: z.literal("Image with id not found"),
                    }),
                },
            },
        },
        upload: {
            method: "POST",
            backend_path: () => `${API_MOUNT}`,
            frontend_path: () => `${API_MOUNT}`,

            request: {
                body: ImageSchema,
            },

            responses: {
                200: {
                    body: z.object({
                        id: z.uuidv7(),
                    }),
                },
                400: {
                    body: z.object({
                        message: z.literal("Image failed to upload"),
                    }),
                },
            },
        },
    },
} as const;

export type Image = z.infer<typeof ImageSchema>;

export type getImageByIdRequest = z.infer<
    typeof ImageContract.routes.getById.request.params
>;
export type getImageByIdResponse =
    | {
          status: 200;
          body: z.infer<
              (typeof ImageContract.routes.getById.responses)[200]["body"]
          >;
      }
    | {
          status: 404;
          body: z.infer<
              (typeof ImageContract.routes.getById.responses)[404]["body"]
          >;
      };

export type uploadImageRequest = z.infer<
    typeof ImageContract.routes.upload.request.body
>;
export type uploadImageResponse =
    | {
          status: 200;
          body: z.infer<
              (typeof ImageContract.routes.upload.responses)[200]["body"]
          >;
      }
    | {
          status: 400;
          body: z.infer<
              (typeof ImageContract.routes.upload.responses)[400]["body"]
          >;
      };
