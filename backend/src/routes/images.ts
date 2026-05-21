import { requireAuth } from "@/middleware/auth.js";
import { findImageById, uploadImage } from "@/repositories/images.js";
import { ImageContract } from "@my-app/shared";
import { Router } from "express";

const router = Router();

router.get(
    ImageContract.routes.getById.backend_path(),
    requireAuth,
    async (req, res) => {
        const params = ImageContract.routes.getById.request.params.parse(
            req.params,
        );
        await findImageById(params.id)
            .then((image) => {
                if (image != null) {
                    return res.status(200).json({
                        image_type: image.image_type,
                        image_mime: image.image_mime,
                        image_data: image.image_data.toString("base64"),
                    });
                } else {
                    console.log("no such image");
                    return res.status(404);
                }
            })
            .catch((err) => {
                console.log("something went wrong");
                return res.sendStatus(400);
            });

        return;
    },
);

router.post(
    ImageContract.routes.upload.backend_path(),
    requireAuth,
    async (req, res) => {
        let image_type = req.body.image_type;
        let image_mime = req.body.image_mime;
        let image_data = Buffer.from(req.body.image_data, "base64");

        let result = await uploadImage(image_type, image_mime, image_data)
            .then((body) => {
                if (body != null) {
                    return res.status(200).json(body);
                } else {
                }
            })
            .catch((err) => {
                console.log("error with inserting image");
                return res.sendStatus(400);
            });

        return;
    },
);

export default router;
