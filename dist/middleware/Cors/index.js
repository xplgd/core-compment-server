"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("kcors");
const initCors = (option) => {
    const cp = null === option.cors || undefined === option.cors ? {} : option.cors;
    const options = {};
    options.origin = cp.origin || '*';
    options.allowMethods = cp.allowMethods || 'GET,HEAD,PUT,POST,DELETE,PATCH';
    if (undefined !== cp.exposeHeaders) {
        options.exposeHeaders = cp.exposeHeaders;
    }
    if (undefined !== cp.allowHeaders) {
        options.exposeHeaders = cp.allowHeaders;
    }
    if (undefined !== cp.maxAge) {
        options.maxAge = cp.maxAge;
    }
    if (cp.credentials) {
        options.credentials = true;
    }
    if (undefined !== cp.keepHeadersOnError) {
        options.keepHeadersOnError = cp.keepHeadersOnError;
    }
    return cors(options);
};
exports.initCors = initCors;
