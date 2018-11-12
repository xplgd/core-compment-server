"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const constants = require("constants");
const DEFAULT_RSA_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\n' +
    'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAL/m3nZB08ilDyCW\n' +
    'pCHFFgKIvBBWXeJnLsQWLZLAxkqlQXB8Hf81Kb2xYjfox6mA46lbUi7gkBs93JTz\n' +
    'DRnaXq9DnNRrU+FPQsAJ8Li/xNSP05iIuvjMATRj6pxS/t8IQLv2i5eWM8kp1mG+\n' +
    'JDuTuHIOSiUtHus1lVaDDZBbQh3rAgMBAAECgYBn4D2dP8a2/nnwxvozeW6PkppS\n' +
    'MZ4CVp4e8G5c2NK9RzTkAZtvMMTWdLVY1D13yFfzrYYP7+ixhkvnqKT30JedT+zH\n' +
    'FxVQJ4kK4aZnS9Gh1YFihrC5GMT5Ij+3+iExh4eP8l83tSS3uPwvJpGqpbF1M4Wq\n' +
    'rZWFxeGcJhikNv8wcQJBAPiwHenVQUIX5YzuGuVfhMnDoOSWwz97qtN4OPhaD3w/\n' +
    'JgNkgcBCqB9CQYe5qyJMkKMEX+QoFPiLdbdCNnwrCvMCQQDFi1Ip2zscOCLBS+Ym\n' +
    '8KltubehsXw1NeQmRDsPH5tJwJH5XWFqyl0iToBi+oHXfvRA/FXrpeyxWy1io6Mi\n' +
    'am8pAkEAjFQs/QbWJSqA4K53RNlKf+PBBVxBXrA069FaLGH9fPnRRHbRdKDoZ4Mm\n' +
    'oSTW+arErwhH5+HqO3nOehOF1TkgmwJAIM0LbYvLetoPW01BAAJB/8gwp5aS6zrx\n' +
    'kTEPJWm4HTzugBtzS4oigMnMI6M44BFieU/s7F32uVRMau6E7fgCUQJATn6r8eWZ\n' +
    'l3WDJWd+jC1bIDIy2f/VBc0ABxvhUgxX1TvhzzfCgPX9DPNOmrmmkgpW5rENeaxN\n' +
    'tc8jY8jiIeWKlA==\n' +
    '-----END PRIVATE KEY-----';
const DEFAULT_RSA_PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/5t52QdPIpQ8glqQhxRYCiLwQ\n' +
    'Vl3iZy7EFi2SwMZKpUFwfB3/NSm9sWI36MepgOOpW1Iu4JAbPdyU8w0Z2l6vQ5zU\n' +
    'a1PhT0LACfC4v8TUj9OYiLr4zAE0Y+qcUv7fCEC79ouXljPJKdZhviQ7k7hyDkol\n' +
    'LR7rNZVWgw2QW0Id6wIDAQAB\n' +
    '-----END PUBLIC KEY-----';
const DEFAULT_RSA_KEY_SIZE = 1024;
const splitBuffer = (buffer, length) => {
    let remainLength = buffer.length;
    let index = 0;
    const bufferArr = [];
    while (remainLength > 0) {
        const targetLength = remainLength > length ? length : remainLength;
        const sourceStart = index * length;
        bufferArr.push(buffer.slice(sourceStart, sourceStart + targetLength));
        remainLength -= length;
        index++;
    }
    return bufferArr;
};
exports.privateEncrypt = (plain, privateKey, keySize) => {
    return encrypt(plain, true, privateKey || DEFAULT_RSA_PRIVATE_KEY, keySize || DEFAULT_RSA_KEY_SIZE);
};
exports.publicDecrypt = (encryptedBase64, publicKey, keySize) => {
    return decrypt(encryptedBase64, false, publicKey || DEFAULT_RSA_PUBLIC_KEY, keySize || DEFAULT_RSA_KEY_SIZE);
};
exports.publicEncrypt = (plain, publicKey, keySize) => {
    return encrypt(plain, false, publicKey || DEFAULT_RSA_PRIVATE_KEY, keySize || DEFAULT_RSA_KEY_SIZE);
};
exports.privateDecrypt = (encryptedBase64, privateKey, keySize) => {
    return decrypt(encryptedBase64, true, privateKey || DEFAULT_RSA_PRIVATE_KEY, keySize || DEFAULT_RSA_KEY_SIZE);
};
const encrypt = (plain, privateKey, key, keySize) => {
    const buffer = Buffer.from(plain, 'utf8');
    const chunkSize = keySize / 8 - 11;
    const bufferArr = splitBuffer(buffer, chunkSize);
    const encArr = [];
    bufferArr.forEach((buf) => {
        encArr.push(privateKey ?
            crypto.privateEncrypt({
                key,
                padding: constants.RSA_PKCS1_PADDING
            }, buf) :
            crypto.publicEncrypt({
                key,
                padding: constants.RSA_PKCS1_PADDING
            }, buf));
    });
    return Buffer.concat(encArr).toString('base64');
};
const decrypt = (encryptedBase64, privateKey, key, keySize) => {
    const buffer = Buffer.from(encryptedBase64, 'base64');
    const chunkSize = keySize / 8;
    const bufferArr = splitBuffer(buffer, chunkSize);
    const desArr = [];
    bufferArr.forEach((buf) => {
        desArr.push(privateKey ?
            crypto.privateDecrypt({
                key,
                padding: constants.RSA_PKCS1_PADDING
            }, buf) :
            crypto.publicDecrypt({
                key,
                padding: constants.RSA_PKCS1_PADDING
            }, buf));
    });
    return Buffer.concat(desArr).toString('utf8');
};
