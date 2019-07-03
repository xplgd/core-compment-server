import * as Koa from 'koa';
import * as debug from 'debug';
import * as path from 'path';
import * as log from 'koa-logger';
import { Cors, Logger, Compress, JsonResponse, IAppOption } from './middleware';
import * as bodyParserServ from 'koa-bodyparser';
import ModuleManager from './ModuleManager';
import { IModelOption } from './storge/models/IModelOption';

export default class App {

    private server: Koa;
    private option: IAppOption;                 // server应用配置参数
    private modelOptions: IModelOption[];       // 数据配置参数
    private middlewareList: Koa.Middleware[];   // 自定义中间件集合
    private moduleMgr: ModuleManager;           // 模块管理器
    private debugLog: debug.IDebugger;
    public static logger: any;

    /**
     * 构建一个 App 实例
     */
    public constructor(config: any) {
        const appOption = config.appOption;
        this.modelOptions = config.modelOptions;
        this.option = {
            port: appOption.port || 6789,
            home: path.resolve(process.cwd(), appOption.home || ''),
            logPath: appOption.logPath || 'logs',
            proxy: appOption.proxy || false,
            key: appOption.key || 'app',
            customResp: appOption.customResp || false
        };
        this.server = new Koa();
        this.server.proxy = this.option.proxy;
        this.server.keys = [this.option.key];
        this.middlewareList = [];
        this.moduleMgr = new ModuleManager();
        this.debugLog = debug(`server:${this.option.key}`);
        App.logger = Logger.getLogger('info', this.option.home, this.option.logPath);
    }

    /**
     * 初始化中间件
     */
    private initMiddleWare = async () => {
        this.use(Logger.initRequestLog(this.option));
        this.use(Compress.initCompression(this.option));
        this.use(Cors.initCors(this.option));
        if (this.option.customResp) this.use(JsonResponse.initJsonResp(this.option));
        // 设置请求解析中间件
        this.use(bodyParserServ());
        if (process.env.NODE_ENV !== 'production') {
            this.use(log());
        }
        // 内环
        for (const middleware of this.middlewareList) {
            this.use(middleware);
        }
    }

    /**
     * 初始化模块
     */
    private initModule = async () => {
        await this.moduleMgr.initModule(this);
    }

    /**
     * 启动App
     */
    public async start(): Promise<void> {
        await this.initMiddleWare();
        await this.initModule();
        this.server.listen(this.option.port);
        this.debugLog(`app initializd: Listening on port ${this.option.port}`);
    }

    /* -------------------------------扩展方法-------------------------------- */
    /**
     * 获取 App 使用的配置参数
     */
    public getOption(): IAppOption {
        return this.option;
    }

    public getModelOptions() {
        return this.modelOptions;
    }

    /**
     * 获取 App 关联使用的 Koa app
     */
    public getKoaApp(): Koa {
        return this.server;
    }

    /**
     * 设置Koa2中间件
     * @param middleware
     * @param innerLoop 洋葱圈内部环
     */
    public use(middleware: Koa.Middleware, innerLoop: boolean = false) {
        if (innerLoop) {
            this.middlewareList.push(middleware);
        } else {
            this.server.use(middleware);
        }

        return this.server;
    }

    /**
     * 自定义设置返回参数格式(当config.appOption配置参数customResp为true时生效)：
     * code = 0时，表示正常返回结果，data为接口返回值
     * code = 其他时，表示内部错误，data为err错误信息值
     * response函数返回的对象已被JOSN序列化
     * @param response 返回结果函数
     */
    public useResponse(response: (code: number, data: any) => any) {
        return this.server.use(JsonResponse.initJsonResp(this.option, this.option.customResp, response));
    }

    /**
     * 加载模块
     */
    public loadModule = (module: any) => {
        this.moduleMgr.loadModule(module);
    }

}
