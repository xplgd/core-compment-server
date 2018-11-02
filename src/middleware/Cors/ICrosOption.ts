export default interface ICrosOption {
    origin?: string;
    allowMethods?: string;
    exposeHeaders?: string;
    allowHeaders?: string;
    maxAge?: number;
    credentials?: boolean;
    keepHeadersOnError?: boolean;
}
