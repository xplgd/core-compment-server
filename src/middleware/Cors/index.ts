import { IAppOption } from '..';
import ICrosOption from './ICrosOption';
import * as cors from 'kcors';

/**
 * 设置 cors
 */
const initCors = (option: IAppOption) => {
    const cp = null === option.cors || undefined === option.cors ? {} : option.cors;
    const options: any = {};
    options.origin = cp.origin || '*';
    options.allowMethods = cp.allowMethods || 'GET,HEAD,PUT,POST,DELETE,PATCH';
    if (undefined !== cp.exposeHeaders) {
        options.exposeHeaders = cp.exposeHeaders;
    }
    if (undefined !== cp.allowHeaders) {
        options.exposeHeaders = cp.allowHeaders;
    }
    if (undefined !== cp.maxAge) {
        options.maxAge = cp.maxAge;
    }
    if (cp.credentials) {
        options.credentials = true;
    }
    if (undefined !== cp.keepHeadersOnError) {
        options.keepHeadersOnError = cp.keepHeadersOnError;
    }

    return cors(options);
};

export {
    ICrosOption,
    initCors
};
