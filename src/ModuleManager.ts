import { IApiMeta } from './router';
import { IService } from './service';
import { Exception } from '.';
import ApiException from './exception/api';
import { ApiManager } from './router';
import App from './App';
import * as debug from 'debug';
import ModelManager from './storge/models/ModelManager';

/**
 * 模块类型接口
 */
interface IModule {
    /**
     * 模块名字
     */
    name: string;

    /**
     * 注册的httpapi接口，会被koa服务注册，并向外提供使用
     */
    httpApi?: IApiMeta | IApiMeta[];

    /**
     * grpc服务，实现httpapi的业务逻辑
     */
    service?: IService;

    /**
     * 实体模型，会被typeorm注册并使用
     */
    entities: Array<Function | string>;

    /**
     * 模块加载后回调函数, 该函数最后执行（服务启动前，数据库初始化后）
     */
    init?: Function;
}

export default class ModuleManager {
    private apiMgr: ApiManager;
    private modelMgr: ModelManager;
    private modules: IModule[];

    constructor() {
        this.apiMgr = ApiManager.getInstance();
        this.modelMgr = ModelManager.getInstance();
        this.modules = [];
    }

    /**
     * 加载模块
     */
    public loadModule = (module: any) => {
        this.modules.push(module);
        try {
            if (!module.name) throw new Exception(ApiException.MODULE_OPTIONS_ERROR, module.name);
            if (module.httpApi) this.apiMgr.registHttpApi(module.name, module.httpApi);
            if (module.entities) this.modelMgr.registEntity(module.name, module.entities);
        } catch (e) {
            debug(`module:${module.name}`)(`加载异常${e.message}`);
        }
    }

    public initModule = async (app: App) => {
        // 初始化数据库连接
        await this.modelMgr.init(app.getModelOptions());
        // 初始化模块
        for (const module of this.modules) {
            try {
                if (module.init) await module.init();
            } catch (e) {
                debug(`module:${module.name}`)(`加载异常\n${e.stack}`);
            }
            await this.apiMgr.buildHttpApi(module.name, app);
            debug(`module:${module.name}`)(`加载完成`);
        }
    }

}
