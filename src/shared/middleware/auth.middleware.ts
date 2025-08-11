import type { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import { getEnv } from "@config/env/env.config";
import { Unauthorized } from 'http-errors'

export const authMiddleware: RequestHandler = (req, res, next) => {
    try {
        const header = req.headers.authorization || "";
        const [, token] = header.split(" ");
        if (!token) Unauthorized('Access token is required');

        req.user = jwt.verify(token, getEnv().JWT_SECRET);
        next();
    } catch {
        throw Unauthorized('Invalid access token');
    }
};
