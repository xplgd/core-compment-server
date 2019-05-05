import { IAppOption } from '..';
import * as compress from 'koa-compress';

/**
 * Gzip 压缩配置
 */
interface ICompressionOption {
    filter(contentType: string): boolean;
    threshold: number;
    flush: any;
}

/**
 * 内容压缩中间件
 */
const initCompression = (option: IAppOption): any => {
    let compression: ICompressionOption = option.compress as ICompressionOption;
    if (null === compression || undefined === compression) {
        compression = {
            filter: (contentType: string) => /[text|json|javascript]/i.test(contentType),
            threshold: 2048,
            flush: require('zlib').Z_SYNC_FLUSH
        };
    }

    return compress(compression);
};

export {
    ICompressionOption,
    initCompression
};
