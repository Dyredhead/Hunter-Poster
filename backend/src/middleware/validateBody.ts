import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";

export function validateBody(schema: ZodTypeAny) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                error: "Invalid request body",
                issues: result.error.issues,
            });
        }

        req.body = result.data;
        next();
    };
}
