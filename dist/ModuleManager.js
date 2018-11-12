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
const _1 = require(".");
const api_1 = require("./exception/api");
const router_1 = require("./router");
const debug = require("debug");
const ModelManager_1 = require("./storge/models/ModelManager");
class ModuleManager {
    constructor() {
        this.loadModule = (module) => {
            this.modules.push(module);
            try {
                if (!module.name)
                    throw new _1.Exception(api_1.default.MODULE_OPTIONS_ERROR, module.name);
                if (module.httpApi)
                    this.apiMgr.registHttpApi(module.name, module.httpApi);
                if (module.entities)
                    this.modelMgr.registEntity(module.name, module.entities);
            }
            catch (e) {
                debug(`module:${module.name}`)(`加载异常${e.message}`);
            }
        };
        this.initModule = (app) => __awaiter(this, void 0, void 0, function* () {
            yield this.modelMgr.init(app.getModelOptions());
            for (const module of this.modules) {
                try {
                    if (module.init)
                        yield module.init();
                }
                catch (e) {
                    debug(`module:${module.name}`)(`加载异常\n${e.stack}`);
                }
                yield this.apiMgr.buildHttpApi(module.name, app);
                debug(`module:${module.name}`)(`加载完成`);
            }
        });
        this.apiMgr = router_1.ApiManager.getInstance();
        this.modelMgr = ModelManager_1.default.getInstance();
        this.modules = [];
    }
}
exports.default = ModuleManager;
