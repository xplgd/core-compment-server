"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const debug = require("debug");
const ApiMetadataStorage_1 = require("./ApiMetadataStorage");
class ApiManager {
    constructor() {
        this.registHttpApi = (moduleName, httpApi) => {
            const apiMetas = httpApi instanceof Array ? httpApi : [httpApi];
            for (const apiMeta of apiMetas) {
                const apiRootPath = !apiMeta.rootPath || apiMeta.rootPath === '' ? '/' : apiMeta.rootPath.startsWith('/') ? apiMeta.rootPath : '/' + apiMeta.rootPath;
                moduleName = !module ? '' : moduleName.startsWith('/') ? moduleName.substring(1) : moduleName;
                ApiMetadataStorage_1.getApiMetadataStorage().addApiRouter(moduleName, apiRootPath, apiMeta.api);
            }
        };
        this.buildHttpApi = (moduleName, app) => __awaiter(this, void 0, void 0, function* () {
            const item = ApiMetadataStorage_1.getApiMetadataStorage().findByName(moduleName);
            if (item) {
                const router = new Router();
                const prefix = item.prefix;
                const target = item.target;
                const object = Reflect.construct(target, []);
                const route = new Router({ prefix });
                for (const metadata of ApiMetadataStorage_1.getApiMetadataStorage().filterByTarget(target)) {
                    this.buildRouter(moduleName, prefix, route, metadata, object);
                }
                router.use(route.routes()).use(route.allowedMethods());
                app.use(router.routes()).use(router.allowedMethods());
            }
        });
        this.buildApiRouter = (app) => {
            const router = new Router();
            for (const item of ApiMetadataStorage_1.getApiMetadataStorage().apiRouterList) {
                const moduleName = item.moduleName;
                const prefix = item.prefix;
                const target = item.target;
                const object = Reflect.construct(target, []);
                const route = new Router({ prefix });
                for (const metadata of ApiMetadataStorage_1.getApiMetadataStorage().filterByTarget(target)) {
                    this.buildRouter(moduleName, prefix, route, metadata, object);
                }
                router.use(route.routes()).use(route.allowedMethods());
            }
            app.use(router.routes()).use(router.allowedMethods());
        };
        this.buildRouter = (moduleName, prefix, router, metadata, object) => {
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
        };
    }
    static getInstance() {
        if (!ApiManager.apiManager)
            ApiManager.apiManager = new ApiManager();
        return ApiManager.apiManager;
    }
}
exports.default = ApiManager;
