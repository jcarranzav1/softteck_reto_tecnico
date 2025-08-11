import type { RequestHandler } from "express";
import { v7 as uuidv7 } from "uuid";


export const correlationIdMiddleware: RequestHandler = (req, res, next) => {
    const requestCid = (req.headers["X-Correlation-ID"] as string)
    const cid = requestCid?.length > 0 ? requestCid : uuidv7()

    req.correlationId = cid;
    req.headers["X-Correlation-ID"] = cid;

    next();
};
