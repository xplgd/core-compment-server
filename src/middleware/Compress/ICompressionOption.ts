/**
 * Gzip 压缩配置
 */
export default interface ICompressionOption {
    filter(contentType: string): boolean;
    threshold: number;
    flush: any;
}
