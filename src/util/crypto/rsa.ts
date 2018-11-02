import * as crypto from 'crypto';
import * as constants from 'constants';
/**
 * 默认使用的 RSA 加密私钥
 */
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

/**
 * 默认使用的 RSA 加密公钥
 */
const DEFAULT_RSA_PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----\n' +
'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/5t52QdPIpQ8glqQhxRYCiLwQ\n' +
'Vl3iZy7EFi2SwMZKpUFwfB3/NSm9sWI36MepgOOpW1Iu4JAbPdyU8w0Z2l6vQ5zU\n' +
'a1PhT0LACfC4v8TUj9OYiLr4zAE0Y+qcUv7fCEC79ouXljPJKdZhviQ7k7hyDkol\n' +
'LR7rNZVWgw2QW0Id6wIDAQAB\n' +
'-----END PUBLIC KEY-----';

const DEFAULT_RSA_KEY_SIZE = 1024;

const splitBuffer = (buffer: Buffer, length: number): Buffer[] => {
    let remainLength = buffer.length;
    let index = 0;
    const bufferArr: Buffer[] = [];

    while (remainLength > 0) {
        const targetLength = remainLength > length ? length : remainLength;
        const sourceStart = index * length;

        bufferArr.push(
            buffer.slice(sourceStart, sourceStart + targetLength)
        );

        remainLength -= length;
        index++;
    }

    return bufferArr;
};

/**
 * 使用RSA私钥加密字符串到base64
 * @param plain
 * @param privateKey
 * @param keySize
 */
export const privateEncrypt = (plain: string, privateKey?: string, keySize?: number): string => {
    return encrypt(
        plain,
        true,
        privateKey || DEFAULT_RSA_PRIVATE_KEY,
        keySize || DEFAULT_RSA_KEY_SIZE
    );
};

/**
 * 使用RSA公钥解密
 * @param encryptedBase64
 * @param publicKey
 * @param keySize
 */
export const publicDecrypt = (encryptedBase64: string, publicKey?: string, keySize?: number): string => {
    return decrypt(
        encryptedBase64,
        false,
        publicKey || DEFAULT_RSA_PUBLIC_KEY,
        keySize || DEFAULT_RSA_KEY_SIZE
    );
};

/**
 * 使用RSA公钥加密字符串到base64
 * @param plain
 * @param publicKey
 * @param keySize
 */
export const publicEncrypt = (plain: string, publicKey?: string, keySize?: number): string => {
    return encrypt(
        plain,
        false,
        publicKey || DEFAULT_RSA_PRIVATE_KEY,
        keySize || DEFAULT_RSA_KEY_SIZE
    );
};

/**
 * 使用RSA私钥解密
 * @param encryptedBase64
 * @param privateKey
 * @param keySize
 */
export const privateDecrypt = (encryptedBase64: string, privateKey?: string, keySize?: number): string => {
    return decrypt(
        encryptedBase64,
        true,
        privateKey || DEFAULT_RSA_PRIVATE_KEY,
        keySize || DEFAULT_RSA_KEY_SIZE
    );
};

const encrypt = (plain: string, privateKey: boolean, key: string, keySize: number): string => {
    const buffer = Buffer.from(plain, 'utf8');
    const chunkSize = keySize / 8 - 11;
    const bufferArr = splitBuffer(buffer, chunkSize);
    const encArr: Buffer[] = [];

    bufferArr.forEach((buf: Buffer) => {
        encArr.push(
            privateKey ?
            crypto.privateEncrypt({
                key,
                padding: constants.RSA_PKCS1_PADDING
            }, buf) :
            crypto.publicEncrypt({
                key,
                padding: constants.RSA_PKCS1_PADDING
            }, buf)
        );
    });

    return Buffer.concat(encArr).toString('base64');
};

const decrypt = (encryptedBase64: string, privateKey: boolean, key: string, keySize: number): string => {
    const buffer = Buffer.from(encryptedBase64, 'base64');
    const chunkSize = keySize / 8;
    const bufferArr = splitBuffer(buffer, chunkSize);
    const desArr: Buffer[] = [];

    bufferArr.forEach((buf: Buffer) => {
        desArr.push(
            privateKey ?
            crypto.privateDecrypt({
                key,
                padding: constants.RSA_PKCS1_PADDING
            }, buf) :
            crypto.publicDecrypt({
                key,
                padding: constants.RSA_PKCS1_PADDING
            }, buf)
        );
    });

    return Buffer.concat(desArr).toString('utf8');
};
