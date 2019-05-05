"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compress = require("koa-compress");
exports.initCompression = (option) => {
    let compression = option.compress;
    if (null === compression || undefined === compression) {
        compression = {
            filter: (contentType) => /[text|json|javascript]/i.test(contentType),
            threshold: 2048,
            flush: require('zlib').Z_SYNC_FLUSH
        };
    }
    return compress(compression);
};
