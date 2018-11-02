import * as Router from 'koa-router';
import ICATokenOption from './ICATokenOption';
import * as util from '../../util';
import * as crypto from '../../util/crypto';
import Exception from '../../exception/Exception';
import CAException from '../../exception/ca';
import ICAIdentity from './ICAIdentity';
import * as SCScope from './SCScope';

/**
 * 请求头格式为 [option.header]: [option.prefix] [token]
 */
const CAToken = (option: ICATokenOption) => {
    const ignorePattens = option.ignorePattens || [];

    return async function CATokenMWFn(ctx: Router.IRouterContext, next: () => Promise<any>) {
        try {
            const originalUrl = ctx.originalUrl;
            const pattenMatchIndex = ignorePattens.findIndex((patten: string) => originalUrl.startsWith(patten));

            if (pattenMatchIndex < 0) {
                const authorization = ctx.headers[option.header];

                // Whether request with Authorization header
                if (authorization === undefined || authorization === null) {
                    throw new Exception(CAException.TOKEN_NEEDED);
                }

                const pattern = new RegExp(`^${option.prefix}\\s+(.*?)$`, 'ig');
                const token = pattern.exec(authorization);

                // Whether valid bearer token format or not
                if (token === null) {
                    throw new Exception(CAException.INVALID_TOKEN);
                }

                // 验证 token 是否有效，且未过期
                const identity = verifyConsoleUserIdentity(
                    token[1], option.scope, option.publicKey, option.keySize
                );
                // 调用扩展验证
                if (undefined !== option.verify) {
                    await option.verify(identity);
                }
                ctx.state.user = identity;
            }
            await next();
        } catch (err) {
            throw err;
        }
    };
};

const verifyConsoleUserIdentity = (token: string, scope: string, publicKey: string, keySize: number) => {
    if (util.validator.stringIsNullOrEmpty(token) || util.validator.stringIsNullOrEmpty(token)) {
        throw new Exception(CAException.INVALID_TOKEN_FORMAT);
    }
    // 解密 appSecret
    let identity: ICAIdentity;
    try {
        identity = decryptToken(token, publicKey, keySize);
    } catch (err) {
        throw new Exception(CAException.RESOVE_TOKEN_FAILED);
    }

    // 检查是否已经过期
    if (Date.now() - Math.floor(identity.create_on * 1000) > identity.expire_in * 1000) {
        throw new Exception(CAException.TOKEN_HAS_EXPIRED);
    }
    // 验证是否在指定的授权范围内
    scope = scope || '';
    if (0 !== scope.length && SCScope.SC_SCOPE_FULL_PERMITTED !== identity.scope) {
        if (undefined === identity.scope.split(/,/ig).find((s) => s === scope)) {
            throw new Exception(CAException.SCOPE_NOT_PERMITTED);
        }
    }

    return identity;
};

const decryptToken = (token: string, publicKey: string, keySize: number): ICAIdentity => {
    // 从web安全的base64解析回原始base64
    token = util.formatter.fromWebSafeBase64(token);

    return JSON.parse(
        crypto.rsa.publicDecrypt(token, publicKey, keySize)
    ) as ICAIdentity;
};

export {
    ICAIdentity,
    ICATokenOption,
    CAToken,
};
