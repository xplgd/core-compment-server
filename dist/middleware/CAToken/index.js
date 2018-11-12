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
const util = require("../../util");
const crypto = require("../../util/crypto");
const Exception_1 = require("../../exception/Exception");
const ca_1 = require("../../exception/ca");
const SCScope = require("./SCScope");
const CAToken = (option) => {
    const ignorePattens = option.ignorePattens || [];
    return function CATokenMWFn(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const originalUrl = ctx.originalUrl;
                const pattenMatchIndex = ignorePattens.findIndex((patten) => originalUrl.startsWith(patten));
                if (pattenMatchIndex < 0) {
                    const authorization = ctx.headers[option.header];
                    if (authorization === undefined || authorization === null) {
                        throw new Exception_1.default(ca_1.default.TOKEN_NEEDED);
                    }
                    const pattern = new RegExp(`^${option.prefix}\\s+(.*?)$`, 'ig');
                    const token = pattern.exec(authorization);
                    if (token === null) {
                        throw new Exception_1.default(ca_1.default.INVALID_TOKEN);
                    }
                    const identity = verifyConsoleUserIdentity(token[1], option.scope, option.publicKey, option.keySize);
                    if (undefined !== option.verify) {
                        yield option.verify(identity);
                    }
                    ctx.state.user = identity;
                }
                yield next();
            }
            catch (err) {
                throw err;
            }
        });
    };
};
exports.CAToken = CAToken;
const verifyConsoleUserIdentity = (token, scope, publicKey, keySize) => {
    if (util.validator.stringIsNullOrEmpty(token) || util.validator.stringIsNullOrEmpty(token)) {
        throw new Exception_1.default(ca_1.default.INVALID_TOKEN_FORMAT);
    }
    let identity;
    try {
        identity = decryptToken(token, publicKey, keySize);
    }
    catch (err) {
        throw new Exception_1.default(ca_1.default.RESOVE_TOKEN_FAILED);
    }
    if (Date.now() - Math.floor(identity.create_on * 1000) > identity.expire_in * 1000) {
        throw new Exception_1.default(ca_1.default.TOKEN_HAS_EXPIRED);
    }
    scope = scope || '';
    if (0 !== scope.length && SCScope.SC_SCOPE_FULL_PERMITTED !== identity.scope) {
        if (undefined === identity.scope.split(/,/ig).find((s) => s === scope)) {
            throw new Exception_1.default(ca_1.default.SCOPE_NOT_PERMITTED);
        }
    }
    return identity;
};
const decryptToken = (token, publicKey, keySize) => {
    token = util.formatter.fromWebSafeBase64(token);
    return JSON.parse(crypto.rsa.publicDecrypt(token, publicKey, keySize));
};
