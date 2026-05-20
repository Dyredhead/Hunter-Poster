import { database } from "@/database/client.js";

type ImagesRow = {
    id: string;
    image_type: "pfp" | "banner" | "post";
    image_data: string;
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
