"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIp = (ctx) => ctx.ips.length === 0 ? ctx.request.ip : ctx.ips[0];
exports.formatter = {
    toWebSafeBase64: (base64Str) => {
        base64Str = base64Str.replace(/\+/ig, '-');
        base64Str = base64Str.replace(/\//ig, '_');
        let last = base64Str.substr(base64Str.length - 1);
        while (last === '=') {
            base64Str = base64Str.substr(0, base64Str.length - 1);
            last = base64Str.substr(base64Str.length - 1);
        }
        return base64Str;
    },
    fromWebSafeBase64: (base64Str) => {
        base64Str = base64Str.replace(/-/ig, '+');
        base64Str = base64Str.replace(/_/ig, '/');
        let missingPaddingCharacters = 0;
        switch (base64Str.length % 4) {
            case 3:
                missingPaddingCharacters = 1;
                break;
            case 2:
                missingPaddingCharacters = 2;
                break;
            case 0:
                missingPaddingCharacters = 0;
                break;
            default:
                throw new Error('invalid web safe base64 format');
        }
        for (let i = 0; i < missingPaddingCharacters; i++) {
            base64Str = base64Str + '=';
        }
        return base64Str;
    }
};
exports.validator = {
    stringIsNullOrEmpty: (str) => {
        return (null === str || undefined === str || 0 === str.length);
    }
};
