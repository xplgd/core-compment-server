import { getApiMetadataStorage } from './ApiMetadataStorage';
import { IApiOptions } from './IApiOptions';
import { IApiMetadata } from './IApiMetadata';

type Protocol = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * API网关装饰器
 * @param protocol http协议类型:'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
 * @param options 装饰器补充参数
 */
const ApiGetway = (protocol: Protocol, options?: IApiOptions) => {
    return (object: object, propertyName: string) => {
        if (!options) options = {} as IApiOptions;
        getApiMetadataStorage().apiMetadatas.push({
            protocol,
            apiPrefix: options.apiPrefix || '/',
            apiName: options.apiName || propertyName,
            methodName: propertyName,
            auth: options.auth || false,
            target: object.constructor
        } as IApiMetadata);
    };
};

export default ApiGetway;
