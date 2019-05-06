"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const isJSON = require("koa-is-json");
const stringify = require("streaming-json-stringify");
const util = require("../../util");
const Logger_1 = require("../Logger");
const initJsonResp = (option) => {
    const errorLogger = Logger_1.getLogger('error', option.home, option.logPath);
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        let statusCode = 0;
        let userData = null;
        const spaces = 2;
        const prettify = Object.hasOwnProperty.call(ctx.query, 'pretty');
        const suppressResponseCode = Object.hasOwnProperty.call(ctx.query, 'suppress_response_code');
        try {
            ctx.state.start = new Date();
            yield next();
            if (ctx.response.status === 404 && !ctx.response.body) {
                ctx.throw(404);
            }
            userData = ctx.body;
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
        }
        catch (err) {
            ctx.status = typeof err.status === 'number' ? err.status : 500;
            ctx.app.emit('error', err, ctx);
            statusCode = ctx.status;
            userData = {
                name: err.name,
                message: err.message,
                code: err.code
            };
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
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
            ctx.status = 200;
            jsonFormatter(ctx, statusCode, userData, prettify, spaces, suppressResponseCode);
        }
    });
};
exports.initJsonResp = initJsonResp;
const jsonFormatter = (ctx, code, data, prettify, spaces, suppressResponseCode = false) => {
    ctx.type = 'application/json';
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
