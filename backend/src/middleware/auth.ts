import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken, type AccessTokenPayload } from "@/jwt.js";

declare global {
    namespace Express {
        interface Request {
            auth?: AccessTokenPayload;
        }
    }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("authorization");

    if (!authorization?.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Missing Authorization bearer token",
        });
    }

    const token = authorization.slice("Bearer ".length).trim();

    try {
        req.auth = verifyAccessToken(token);
        next();
    } catch {
        return res.status(401).json({
            error: "Invalid or expired token",
        });
    }
}
