import * as Compress from './Compress';
import * as Cors from './Cors';
import * as Logger from './Logger';
import * as JsonResponse from './JsonResponse';
import * as CAToken from './CAToken';

/**
 * App 配置参数的接口
 */
export interface IAppOption {
    /**
     * 应用的监听端口
     */
    port: number;
    /**
     * 应用的根目录
     */
    home: string;
    /**
     * 应用使用的日志相对 'home' 的路径
     */
    logPath: string;
    /**
     * 指定 App 是否在代理之后
     * * proxy pass parameters example:
     *      proxy_set_header Host      $host;
     *      proxy_set_header X-Real-IP $remote_addr;
     *      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     *      proxy_set_header   Referer $http_referer;
     *      proxy_set_header   Cookie $http_cookie;
     * while app is proxy upstream. ctx.ips will be [realip, proxy1, proxy2]
     */
    proxy: boolean;
    /**
     * 指定 App 的 key
     */
    key: string;
    /**
     * Gzip 的压缩参数
     */
    compress?: Compress.ICompressionOption;
    /**
     * Cross origin 参数
     */
    cors?: Cors.ICrosOption;
    /**
     * jsonResponse 的参数
     */
    response?: JsonResponse.IResponseOption;
}

export {
    Cors,
    Logger,
    CAToken,
    Compress,
    JsonResponse
};
