interface AxiosErrorOptions {
    message: string
    error: string
    statusCode?: number
    requestUrl?: string
    apiResponse?: any
    cause?: Error
}


export class AxiosException extends Error {
    public readonly cause: Error
    private readonly apiResponse: any
    private readonly statusCode: number
    private readonly requestUrl: any
    private readonly error: string

    constructor(options: AxiosErrorOptions) {
        super(options.message)
        this.apiResponse = options.apiResponse
        this.statusCode = options.statusCode
        this.requestUrl = options.requestUrl
        this.cause = options.cause
        this.error = options.error

        if (options.cause) {
            this.stack = options.cause.stack
        } else {
            Error.captureStackTrace(this, AxiosException)
        }
    }

    getApiResponse(): any {
        return this.apiResponse
    }

    getStatusCode(): number {
        return this.statusCode
    }

    getRequestUrl(): any {
        return this.requestUrl
    }

    getErrorMessage(): string {
        return this.error
    }
}
