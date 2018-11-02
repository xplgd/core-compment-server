declare module 'rotating-file-stream';

declare module 'log'; // declare for log

declare module 'koa-is-json';

declare module '*.json' {
    const value: any;
    export default value;
}
