import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { correlationIdMiddleware } from '@shared/middleware/correlation_id.middleware'
import { requestLoggingMiddleware } from '@shared/middleware/request-logging.middleware'
import { globalErrorHandler } from '@shared/global_error/global_error'
import router from "@infrastructure/routes";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(correlationIdMiddleware);
app.use(requestLoggingMiddleware);
app.use(router);
app.use(globalErrorHandler);


export default app;
