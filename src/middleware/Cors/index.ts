import { IAppOption } from '..';
import * as cors from 'kcors';

interface ICrosOption {
    origin?: string;
    allowMethods?: string;
    exposeHeaders?: string;
    allowHeaders?: string;
    maxAge?: number;
    credentials?: boolean;
    keepHeadersOnError?: boolean;
}

/**
 * 设置 cors
 */
const initCors = (option: IAppOption): any => {
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

export  {
    ICrosOption,
    initCors
};
