export interface IApiOptions {
    /**
     * api接口名,若不指定则使用函数名
     */
    apiName?: string;

    /**
     * http协议类型
     */
    protocol?: string;

    /**
     * 接口前缀
     */
    apiPrefix?: string;

    /**
     * 是否需要认证
     */
    auth?: boolean;
}

/**
 * API接口类型
 */
export interface IApiMeta {
    rootPath: string;
    api: Function | string;
}
