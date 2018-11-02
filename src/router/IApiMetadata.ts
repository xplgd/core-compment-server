export interface IApiMetadata {
    protocol: string;
    apiPrefix: string;
    apiName: string;
    methodName: string;
    auth: boolean;
    target: Function;
}
