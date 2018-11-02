import * as crypto from 'crypto';
/**
 * 默认对称加密使用的默认key
 */
const DEFAULT_SYMMETRIC_KEY = {
    algorithm: 'DES3',
    iv: 's*sWhkAs',
    key: '2a#!((D12sgjlc#$%@)*s!Gs'
};
/**
 * 对称 iv 加密key
 */
export interface ISymmetricKey {
    algorithm?: string;
    key?: string;
    iv?: string;
}

/**
 * 对称加密，返回加密后的 base64
 * @param plain 需要加密的原文
 * @param key
 */
export const symmetricEncrypt = (plain: string, key?: ISymmetricKey): string => {
    if (key === undefined) {
        key = DEFAULT_SYMMETRIC_KEY;
    }
    const buffer = Buffer.from(plain, 'utf8');
    const cipher = crypto.createCipheriv(
        key.algorithm || DEFAULT_SYMMETRIC_KEY.algorithm,
        key.key || DEFAULT_SYMMETRIC_KEY.key,
        key.iv || DEFAULT_SYMMETRIC_KEY.key
    );
    const encContent = cipher.update(buffer);
    const encFinal = cipher.final();
    const enc = Buffer.concat([encContent, encFinal]);

    return enc.toString('base64');
};

/**
 * 对称解密，返回原文
 * @param encryptedBase64
 * @param key
 */
export const symmetricDecrypt = (encryptedBase64: string, key?: ISymmetricKey): string => {
    if (key === undefined) {
        key = DEFAULT_SYMMETRIC_KEY;
    }
    const decipher = crypto.createDecipheriv(
        key.algorithm || DEFAULT_SYMMETRIC_KEY.algorithm,
        key.key || DEFAULT_SYMMETRIC_KEY.key,
        key.iv || DEFAULT_SYMMETRIC_KEY.key
    );
    let des = decipher.update(encryptedBase64, 'base64', 'utf8');
    des += decipher.final('utf8');

    return des;
};
