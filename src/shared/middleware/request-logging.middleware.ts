import { RequestHandler, Request,Response } from "express";

const relevantHeaders = [
    'authorization',
    'content-type',
    'accept',
    'user-agent',
    'X-Correlation-ID',
    'referer',
    'host',
    'x-api-key',
]


export const requestLoggingMiddleware: RequestHandler = (req: Request, res: Response, next) => {
    const { method, url, statusCode } = req
    const correlationId = req.headers['X-Correlation-ID'] as string

    const start = Date.now();
    const isValidUrl = url !== '/health' &&  url !== '/docs'
    const curlCommand = buildCurlCommand(req)

    if (isValidUrl) {
        console.log(`[${correlationId}] --> ${method} ${url} - Status: ${statusCode}`);
        console.log(`[${correlationId}] -->  Request CURL: ${curlCommand}`);
    }


    res.on("finish", () => {
        const ms = Date.now() - start;
        const status = res.statusCode;
        if (status < 300) {
            console.log(`[${correlationId}] --> ${method} ${url} - Status: ${statusCode} Successfully processed ✅ - ms: ${ms}ms`);
        }
        if (status >= 400) {
            console.log(`Error: [${correlationId}] --> ${method} ${url} - Status: ${statusCode} ❌ - ms: ${ms}ms`);

        }
    });

    next();
};

function buildCurlCommand(request: any): string {
    const { method, url, headers, body, hostname, protocol } = request

    const filteredHeaders = Object.entries(headers)
        .filter(([key]) => relevantHeaders.includes(key.toLowerCase()))
        .map(([key, value]) => `-H "${key}: ${value}"`)
        .join(' ')

    const curlBody = body ? ` -d '${JSON.stringify(body)}'` : ''
    return `curl -X ${method} ${protocol}://${hostname}${url} ${filteredHeaders}${curlBody}`
}