"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const DEFAULT_SYMMETRIC_KEY = {
    algorithm: 'DES3',
    iv: 's*sWhkAs',
    key: '2a#!((D12sgjlc#$%@)*s!Gs'
};
exports.symmetricEncrypt = (plain, key) => {
    if (key === undefined) {
        key = DEFAULT_SYMMETRIC_KEY;
    }
    const buffer = Buffer.from(plain, 'utf8');
    const cipher = crypto.createCipheriv(key.algorithm || DEFAULT_SYMMETRIC_KEY.algorithm, key.key || DEFAULT_SYMMETRIC_KEY.key, key.iv || DEFAULT_SYMMETRIC_KEY.key);
    const encContent = cipher.update(buffer);
    const encFinal = cipher.final();
    const enc = Buffer.concat([encContent, encFinal]);
    return enc.toString('base64');
};
exports.symmetricDecrypt = (encryptedBase64, key) => {
    if (key === undefined) {
        key = DEFAULT_SYMMETRIC_KEY;
    }
    const decipher = crypto.createDecipheriv(key.algorithm || DEFAULT_SYMMETRIC_KEY.algorithm, key.key || DEFAULT_SYMMETRIC_KEY.key, key.iv || DEFAULT_SYMMETRIC_KEY.key);
    let des = decipher.update(encryptedBase64, 'base64', 'utf8');
    des += decipher.final('utf8');
    return des;
};
