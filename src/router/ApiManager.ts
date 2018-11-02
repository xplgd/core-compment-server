import * as Router from 'koa-router';
import * as debug from 'debug';
import { getApiMetadataStorage } from './ApiMetadataStorage';
import { IApiMeta } from '.';
import { IApiMetadata } from './IApiMetadata';
import App from '../App';

export default class ApiManager {

    private static apiManager: ApiManager;

    private constructor() { }

    public static getInstance() {
        if (!ApiManager.apiManager) ApiManager.apiManager = new ApiManager();

        return ApiManager.apiManager;
    }

    /**
     * 注册httpApi实例
     */
    public registHttpApi = (moduleName: string, httpApi: IApiMeta | IApiMeta[]) => {
        const apiMetas = httpApi instanceof Array ? httpApi : [httpApi];
        for (const apiMeta of apiMetas) {
            const apiRootPath = !apiMeta.rootPath || apiMeta.rootPath === '' ? '/' : apiMeta.rootPath.startsWith('/') ? apiMeta.rootPath : '/' + apiMeta.rootPath;
            moduleName = !module ? '' : moduleName.startsWith('/') ? moduleName.substring(1) : moduleName;
            getApiMetadataStorage().addApiRouter(moduleName, apiRootPath, apiMeta.api as Function);
        }
    }

    /**
     * 生成httpApi路由
     */
    public buildHttpApi = async (moduleName: string, app: App) => {
        const item = getApiMetadataStorage().findByName(moduleName);
        if (item) {
            const router = new Router();
            const prefix = item.prefix;
            const target = item.target;
            // 添加路由
            const object = Reflect.construct(target, []);
            const route = new Router({ prefix });
            for (const metadata of getApiMetadataStorage().filterByTarget(target)) {
                this.buildRouter(moduleName, prefix, route, metadata, object);
            }
            router.use(route.routes()).use(route.allowedMethods());
            app.use(router.routes()).use(router.allowedMethods());
        }
    }

    public buildApiRouter = (app: App) => {
        const router = new Router();
        for (const item of getApiMetadataStorage().apiRouterList) {
            const moduleName = item.moduleName;
            const prefix = item.prefix;
            const target = item.target;
            // 添加路由
            const object = Reflect.construct(target, []);
            const route = new Router({ prefix });
            for (const metadata of getApiMetadataStorage().filterByTarget(target)) {
                this.buildRouter(moduleName, prefix, route, metadata, object);
            }
            router.use(route.routes()).use(route.allowedMethods());
        }
        app.use(router.routes()).use(router.allowedMethods());
    }

    /**
     * 构建路由
     */
    private buildRouter = (moduleName: string, prefix: string, router: Router, metadata: IApiMetadata, object: any) => {
        const apiPrefix = !metadata.apiPrefix || metadata.apiPrefix === '' ? '/' : metadata.apiPrefix.startsWith('/') ? metadata.apiPrefix : '/' + metadata.apiPrefix;
        const apiName = metadata.apiName.startsWith('/') ? metadata.apiName.substring(1) : metadata.apiName;
        const apiPath = apiPrefix.endsWith('/') ? apiPrefix + apiName : apiPrefix + '/' + apiName;
        debug(`module:${moduleName}`)(`router:[${metadata.protocol}]${prefix + apiPath}`);
        switch (metadata.protocol) {
            case 'GET': return router.get(apiPath, object[metadata.methodName].bind(object));
            case 'POST': return router.post(apiPath, object[metadata.methodName].bind(object));
            case 'PUT': return router.put(apiPath, object[metadata.methodName].bind(object));
            case 'PATCH': return router.patch(apiPath, object[metadata.methodName].bind(object));
            case 'DELETE': return router.delete(apiPath, object[metadata.methodName].bind(object));
            default: return router;
        }
    }
}
