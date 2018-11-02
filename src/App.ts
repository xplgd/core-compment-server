import * as Koa from 'koa';
import * as debug from 'debug';
import * as path from 'path';
import * as log from 'koa-logger';
import { Cors, Logger, Compress, JsonResponse, IAppOption } from './middleware';
import * as bodyParserServ from 'koa-bodyparser';
import ModuleManager from './ModuleManager';
import { IModelOption } from './storge/models/IModelOption';

class App {

    private server: Koa;
    private option: IAppOption;
    private modelOptions: IModelOption[];
    private debugLog: debug.IDebugger;
    private moduleMgr: ModuleManager;

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
            key: appOption.key || 'app'
        };
        this.debugLog = debug(`server:${this.option.key}`);
        this.server = new Koa();
        this.server.proxy = this.option.proxy;
        this.server.keys = [this.option.key];
        this.moduleMgr = new ModuleManager();
    }

    /**
     * 初始化中间件
     */
    private initMiddleWare = () => {
        this.use(Logger.initRequestLog(this.option));
        this.use(Compress.initCompression(this.option));
        this.use(Cors.initCors(this.option));
        this.use(JsonResponse.initJsonResp(this.option));
        // 设置请求解析中间件
        this.use(bodyParserServ());
        if (process.env.NODE_ENV !== 'production') {
            this.use(log());
        }
    }

    /**
     * 初始化模块
     */
    private initModule = async () => {
        await this.moduleMgr.initModule(this);
    }

    /**
     *  初始化
     */
    private init = async () => {
        await this.initMiddleWare();
        await this.initModule();
    }

    /**
     * 启动App
     */
    public async start(): Promise<void> {
        await this.init();
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
     */
    public use(middleware: Koa.Middleware) {
        return this.server.use(middleware);
    }

    /**
     * 加载模块
     */
    public loadModule = (module: any) => {
        this.moduleMgr.loadModule(module);
    }

}

export default App;
