import serverless from "serverless-http";
import app from '@src/app'

export const wrapped = serverless(app, {
    request: (_req, _evt, ctx) => {
        ctx.callbackWaitsForEmptyEventLoop = false;
    }
});

export const health = wrapped;
export const fusionados = wrapped;
export const historial = wrapped;
export const almacenar = wrapped;
export const signup = wrapped;
export const login = wrapped;
