import * as Router from 'koa-router';

/**
 * 从上下文中获取正确的 请求ip 地址
 * proxy 模式下从 ips 中获取首个作为 ip
 * @param  {Router.IRouterContext} ctx
 */
export const requestIp = (ctx: Router.IRouterContext) => ctx.ips.length === 0 ? ctx.request.ip : ctx.ips[0];

export const formatter = {
    /**
     * 将base64处理为query string 安全的base64字符串
     */
    toWebSafeBase64: (base64Str: string): string => {
        // 替换 URL 不安全的 + 到 -, / 到 _
        // 去掉多余的 padding characters
        base64Str = base64Str.replace(/\+/ig, '-');
        base64Str = base64Str.replace(/\//ig, '_');
        // 从末尾去掉 =
        let last = base64Str.substr(base64Str.length - 1);
        while (last === '=') {
            base64Str = base64Str.substr(0, base64Str.length - 1);
            last = base64Str.substr(base64Str.length - 1);
        }

        return base64Str;
    },
    /**
     * 从query string 安全的base64字符串还原成常规base64
     */
    fromWebSafeBase64: (base64Str: string): string => {
        // 将URL 安全的 - 到 +, _ 到 /
        base64Str = base64Str.replace(/-/ig, '+');
        base64Str = base64Str.replace(/_/ig, '/');
        // 补齐 = 号
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

export const validator = {
    stringIsNullOrEmpty: (str?: string): boolean => {
        return (null === str || undefined === str || 0 === str.length);
    }
};
