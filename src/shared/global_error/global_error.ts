import type { ErrorRequestHandler, Request, Response } from "express";
import { AxiosException } from "@shared/global_error/custom_errors";
import { ZodError } from 'zod'
import { isHttpError } from "http-errors";
import { ErrorResponse } from '@shared/interfaces/response/error_response.dto'


const STATUS_MESSAGES: Record<number, string> = {
    400: "Bad Request: The server could not interpret the request.",
    401: "Unauthorized: You do not have permission to access this resource.",
    403: "Forbidden: Access to this resource is prohibited.",
    404: "Not Found: The requested resource does not exist.",
    405: "Method Not Allowed: The HTTP method is not valid for this resource.",
    408: "Request Timeout: The server timed out waiting for the request.",
    409: "Conflict: The request conflicts with the current state of the resource.",
    410: "Gone: The requested resource is no longer available.",
    413: "Payload Too Large: The request body is too large.",
    415: "Unsupported Media Type: The data format is not supported.",
    422: "Unprocessable Entity: The request could not be processed.",
    429: "Too Many Requests: You have made too many requests.",
    500: "Internal Server Error: An internal server error occurred.",
    502: "Bad Gateway: The server received an invalid response.",
    503: "Service Unavailable: The server is temporarily unavailable.",
    504: "Gateway Timeout: The server did not receive a timely response.",
    505: "HTTP Version Not Supported: The HTTP version is not supported.",
    507: "Insufficient Storage: The server cannot store the representation.",
    511: "Network Authentication Required: Network authentication is required.",
};


function handleAxios(exception: AxiosException, req: Request, res: Response) {
    const correlationId =
        (req.correlationId as string) ||
        (req.headers["x-correlation-id"] as string)

    const status = exception.getStatusCode();
    const code = exception.getErrorMessage();
    const message = exception.message;
    const url = exception.getRequestUrl();
    const apiResponse = exception.getApiResponse();

    console.error(
        `[${correlationId}] AxiosException ${status} - ${code} - ${message} - API: ${url} - Details: ${JSON.stringify(apiResponse)}`
    );

    const body: ErrorResponse = {
        error: message,
        message: code,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
    };


    res.status(status).json(body)
}

function handleZod(err: ZodError, req: Request, res: Response) {
    const correlationId =
        (req.correlationId as string) ||
        (req.headers["x-correlation-id"] as string)

    const details = err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
        code: issue.code,
    }));

    console.warn(`[${correlationId}] ZodError 400 - Validation failed: ${JSON.stringify(details)}`);

    const body: ErrorResponse = {
        error: "VALIDATION_ERROR",
        message: "Validation failed",
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        validationErrors: details,
    };

    res.status(400).json(body)
}

function handleHttp(err: any, req: Request, res: Response) {
    const correlationId =
        (req.correlationId as string) ||
        (req.headers["x-correlation-id"] as string)
    const status = err.status ?? 400;
    const generic = STATUS_MESSAGES[status] || STATUS_MESSAGES[500];
    const errorCode = err.name || "HTTP_ERROR";
    const errorMessage = err.message || generic;

    console.warn(`[${correlationId}] HttpError ${status}: ${errorMessage}`);

    const body: ErrorResponse = {
        error: errorCode,
        message: errorMessage,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
    };

    res.status(status).json(body)
}

function handleUnknown(err: any, req: Request, res: Response) {
    const correlationId =
        (req.correlationId as string) ||
        (req.headers["x-correlation-id"] as string)
    const status = err?.status ?? 500;
    const generic = STATUS_MESSAGES[status] || "Unknown Error";
    const errorCode = err?.message || "INTERNAL_SERVER_ERROR";
    const errorMessage = err?.cause ?? generic;

    console.error(`[${correlationId}] Unhandled ${status}: ${errorMessage}`);
    if (err?.stack) console.error(err.stack);

    const body: ErrorResponse = {
        error: errorCode,
        message: errorMessage,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
    };


    res.status(status).json(body)
}


export const globalErrorHandler: ErrorRequestHandler = (exception, req, res, _next) => {
    if (exception instanceof AxiosException) return handleAxios(exception, req, res);
    if (exception instanceof ZodError) return handleZod(exception, req, res);
    if (isHttpError(exception)) return handleHttp(exception, req, res);
    return handleUnknown(exception, req, res);
};