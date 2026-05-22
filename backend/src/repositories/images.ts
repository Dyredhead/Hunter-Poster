import { database } from "@/database/client.js";

type ImagesRow = {
    id: string;
    image_type: "pfp" | "banner" | "post";
    image_mime: string;
    image_data: Buffer;
};

export async function findImageById(id: string) {
    const result = await database
        .query<ImagesRow>(
            `
        SELECT *
        FROM images
        WHERE id = $1
        `,
            [id],
        )
        .then((res) => res.rows);

    return result.find((image) => image.id === id) ?? null;
}

export async function uploadImage(
    image_type: string,
    image_mime: string,
    image_data: Buffer<ArrayBuffer>,
) {
    const result = await database
        .query<String>(
            `
        INSERT INTO images (image_type, image_mime, image_data)
        VALUES ($1, $2, $3)
        RETURNING id
        `,
            [image_type, image_mime, image_data],
        )
        .then((res) => res.rows);

    return result[0];
}
