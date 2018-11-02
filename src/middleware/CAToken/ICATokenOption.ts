import ICAIdentity from './ICAIdentity';

export default interface ICATokenOption {
    /**
     * 自行扩展的 Identity 校验，在基础校验完成后
     */
    verify?(identity: ICAIdentity): Promise<void>;
    /**
     * 授权范围
     */
    scope: string;
    /**
     * 忽略的请求路由参数
     */
    ignorePattens?: string[];
    /**
     * CAToken请求的头名称
     */
    header: string;
    /**
     * CAToken请求的前缀
     */
    prefix: string;
    /**
     * CAToken解密秘钥
     */
    publicKey: string;
    /**
     * CAToken解密秘钥大小
     */
    keySize: number;
}
