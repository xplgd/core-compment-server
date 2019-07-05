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
    private appOption: IAppOption;              // server应用配置参数
    private modelOptions: IModelOption[];       // 数据配置参数
    private middlewareList: Koa.Middleware[];   // 自定义中间件集合
    private moduleMgr: ModuleManager;           // 模块管理器
    private debugLog: debug.IDebugger;          // debug输出日志
    public static logger: any;                  // 全局记录日志

    /**
     * 构建一个 App 实例
     */
    public constructor(config: any) {
        this.modelOptions = config.modelOptions;
        this.appOption = config.appOption;
        this.appOption.port = config.appOption.port || 6789;
        this.appOption.home = path.resolve(process.cwd(), config.appOption.home || '');
        this.appOption.logPath = config.appOption.logPath || 'logs';
        this.appOption.proxy = config.appOption.proxy || false;
        this.appOption.key = config.appOption.key || 'app';
        this.middlewareList = [];
        this.moduleMgr = new ModuleManager();
        this.debugLog = debug(`server:${this.appOption.key}`);
        App.logger = Logger.getLogger('info', this.appOption.home, this.appOption.logPath);
    }

    /**
     * 初始化server
     */
    private initServer = async () => {
        this.server = new Koa();
        this.server.proxy = this.appOption.proxy;
        this.server.keys = [this.appOption.key];
    }

    /**
     * 初始化中间件
     */
    private initMiddleWare = async () => {
        this.use(Logger.initRequestLog(this.appOption));
        this.use(Compress.initCompression(this.appOption));
        this.use(Cors.initCors(this.appOption));
        this.use(JsonResponse.initJsonResp(this.appOption));
        // 设置请求解析中间件
        this.use(bodyParserServ());
        if (process.env.NODE_ENV !== 'production') {
            this.use(log());
        }
        // 内环中间件
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
        await this.initServer();
        await this.initMiddleWare();
        await this.initModule();
        this.server.listen(this.appOption.port);
        this.debugLog(`app initializd: Listening on port ${this.appOption.port}`);
    }

    /* -------------------------------扩展方法-------------------------------- */
    /**
     * 获取 App 使用的配置参数
     */
    public getAppOption(): IAppOption {
        return this.appOption;
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
     * 加载模块
     */
    public loadModule = (module: any) => {
        this.moduleMgr.loadModule(module);
    }

}
