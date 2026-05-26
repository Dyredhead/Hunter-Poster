import jwt from "jsonwebtoken";
import { env } from "./env.js";

export type AccessTokenPayload = {
    sub: string;
};

export function signAccessToken(user_id: string): string {
    let payload: AccessTokenPayload = {
        sub: user_id,
    };
    let secret = env.jwt_secret;
    let options: jwt.SignOptions = {
        expiresIn: Number(env.jwt_expires_in),
    };

    return jwt.sign(payload, secret, options);
}

export function verifyAccessToken(token: string): AccessTokenPayload {
    const decoded = jwt.verify(token, env.jwt_secret);

    if (
        typeof decoded !== "object" ||
        decoded === null ||
        typeof decoded.sub !== "string"
    ) {
        throw new Error("Invalid token payload");
    }

    return {
        sub: decoded.sub,
    };
}
