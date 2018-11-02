/**
 * TODO: 用grpc提供微服务的远程调用
 * 预计用法: 让模块间相互调用时，先注册微服务，再调用，被grpc注册，并想内提供使用
 */
export interface IService {
    [key: string]: any;
}
