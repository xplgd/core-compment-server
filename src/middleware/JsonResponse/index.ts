import * as Router from 'koa-router';
import * as isJSON from 'koa-is-json';
import * as stringify from 'streaming-json-stringify';
import * as util from '../../util';
import { IAppOption } from '..';
import { getLogger } from '../logger';

const initJsonResp = (option: IAppOption) => {
    const errorLogger = getLogger('error', option.home, option.logPath);

    return async (ctx: Router.IRouterContext, next: () => Promise<any>) => {
        let statusCode: number = 0;
        let userData: any = null;

        // suppress query flag define
        const spaces: number = 2;
        const prettify: boolean = Object.hasOwnProperty.call(ctx.query, 'pretty');
        const suppressResponseCode: boolean = Object.hasOwnProperty.call(ctx.query, 'suppress_response_code');

        try {
            // 记录处理时间
            ctx.state.start = new Date();
            await next();
            if (ctx.response.status === 404 && !ctx.response.body) {
                ctx.throw(404);
            }

            userData = ctx.body;

            // always in json
            // unsupported body type
            const stream = userData && typeof userData.pipe === 'function' && userData._readableState && userData._readableState.objectMode;
            const json = isJSON(userData);

            if (!json && !stream) {
                return;
            }

            if (stream) {
                const sfy = stringify();

                if (prettify) {
                    sfy.space = spaces;
                }
                ctx.body = userData.pipe(sfy);

                return;
            }

            jsonFormatter(ctx, statusCode, userData, prettify, spaces, suppressResponseCode);
        } catch (err) {
            ctx.status = typeof err.status === 'number' ? err.status : 500;
            // application
            ctx.app.emit('error', err, ctx);
            // always response in json format
            statusCode = ctx.status;
            userData = {
                name: err.name,
                message: err.message,
                code: err.code
            };

            // Save exception to log
            if (!(err.status === 404)) {
                if (errorLogger !== null && errorLogger !== undefined) {
                    try {
                        const log = [];
                        log.push(`[${util.requestIp(ctx)}]`);
                        log.push(`[${ctx.method}]`);
                        log.push(`[${ctx.url}]`);
                        log.push(`[${statusCode}]`);
                        log.push(`${ctx.request.header['user-agent']}\n${err.message}\n${err.stack}\n`);

                        errorLogger.error(log.join(' '));
                    } catch (e) {
                        // do nothing
                        // tslint:disable-next-line:no-console
                        console.log(e);
                    }
                }
            }
            // delete userData.stack;

            // Reset response status
            ctx.status = 200;
            jsonFormatter(ctx, statusCode, userData, prettify, spaces, suppressResponseCode);
        }
    };
};

const jsonFormatter = (ctx: Router.IRouterContext, code: number, data: any, prettify: boolean, spaces: number, suppressResponseCode: boolean = false) => {
    // set response type
    ctx.type = 'application/json';
    // 记录处理结束时间
    ctx.state.end = new Date();

    const wrappedBody = suppressResponseCode ? data : {};

    if (!suppressResponseCode) {
        wrappedBody.code = code;
        wrappedBody.data = data;
        if (process.env.NODE_ENV !== 'production') {
            wrappedBody.__dev = true;
            wrappedBody.__ts = {
                s: ctx.state.start.toUTCString(),
                e: ctx.state.end.toUTCString(),
                ts: ctx.state.end - ctx.state.start
            };
        }
    }

    ctx.body = prettify ? JSON.stringify(wrappedBody, null, spaces) : JSON.stringify(wrappedBody);
};

export {
    initJsonResp
};
