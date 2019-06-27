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
const Koa = require("koa");
const debug = require("debug");
const path = require("path");
const log = require("koa-logger");
const middleware_1 = require("./middleware");
const bodyParserServ = require("koa-bodyparser");
const ModuleManager_1 = require("./ModuleManager");
class App {
    constructor(config) {
        this.initMiddleWare = () => {
            this.use(middleware_1.Logger.initRequestLog(this.option));
            this.use(middleware_1.Compress.initCompression(this.option));
            this.use(middleware_1.Cors.initCors(this.option));
            if (this.option.customResp)
                this.use(middleware_1.JsonResponse.initJsonResp(this.option));
            this.use(bodyParserServ());
            if (process.env.NODE_ENV !== 'production') {
                this.use(log());
            }
        };
        this.initModule = () => __awaiter(this, void 0, void 0, function* () {
            yield this.moduleMgr.initModule(this);
        });
        this.loadModule = (module) => {
            this.moduleMgr.loadModule(module);
        };
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
        this.debugLog = debug(`server:${this.option.key}`);
        this.server = new Koa();
        this.server.proxy = this.option.proxy;
        this.server.keys = [this.option.key];
        this.moduleMgr = new ModuleManager_1.default();
        this.initMiddleWare();
        App.logger = middleware_1.Logger.getLogger('info', this.option.home, this.option.logPath);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initModule();
            this.server.listen(this.option.port);
            this.debugLog(`app initializd: Listening on port ${this.option.port}`);
        });
    }
    getOption() {
        return this.option;
    }
    getModelOptions() {
        return this.modelOptions;
    }
    getKoaApp() {
        return this.server;
    }
    use(middleware) {
        return this.server.use(middleware);
    }
    useResponse(response) {
        return this.server.use(middleware_1.JsonResponse.initJsonResp(this.option, this.option.customResp, response));
    }
}
exports.default = App;
