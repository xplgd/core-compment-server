/**
 * ConsoleUser 授权身份
 */
export default interface ICAIdentity {
    /**
     * OpenId
     */
    openId: string;
    /**
     * 身份生成的时间戳(ms)
     */
    create_on: number;
    /**
     * 身份过期的时间间隔(s)
     */
    expire_in: number;
    /**
     * 授权范围： ,分隔的字符串
     */
    scope: string;
}
