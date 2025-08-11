import "express";

declare global {
    namespace Express {
        interface Request {
            correlationId?: string;
            user?: TokenPayloadDto;
        }
    }
}

export {};
