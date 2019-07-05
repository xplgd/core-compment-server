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
        this.initServer = () => {
            this.server = new Koa();
            this.server.proxy = this.appOption.proxy;
            this.server.keys = [this.appOption.key];
        };
        this.initMiddleWare = () => __awaiter(this, void 0, void 0, function* () {
            this.use(middleware_1.Logger.initRequestLog(this.appOption));
            this.use(middleware_1.Compress.initCompression(this.appOption));
            this.use(middleware_1.Cors.initCors(this.appOption));
            this.use(middleware_1.JsonResponse.initJsonResp(this.appOption));
            this.use(bodyParserServ());
            if (process.env.NODE_ENV !== 'production') {
                this.use(log());
            }
            for (const middleware of this.middlewareList) {
                this.use(middleware);
            }
        });
        this.initModule = () => __awaiter(this, void 0, void 0, function* () {
            yield this.moduleMgr.initModule(this);
        });
        this.loadModule = (module) => {
            this.moduleMgr.loadModule(module);
        };
        this.modelOptions = config.modelOptions;
        this.appOption = config.appOption;
        this.appOption.port = config.appOption.port || 6789;
        this.appOption.home = path.resolve(process.cwd(), config.appOption.home || '');
        this.appOption.logPath = config.appOption.logPath || 'logs';
        this.appOption.proxy = config.appOption.proxy || false;
        this.appOption.key = config.appOption.key || 'app';
        this.middlewareList = [];
        this.moduleMgr = new ModuleManager_1.default();
        this.debugLog = debug(`server:${this.appOption.key}`);
        App.logger = middleware_1.Logger.getLogger('info', this.appOption.home, this.appOption.logPath);
        this.initServer();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initMiddleWare();
            yield this.initModule();
            this.server.listen(this.appOption.port);
            this.debugLog(`app initializd: Listening on port ${this.appOption.port}`);
        });
    }
    getAppOption() {
        return this.appOption;
    }
    getModelOptions() {
        return this.modelOptions;
    }
    getKoaApp() {
        return this.server;
    }
    use(middleware, innerLoop = false) {
        if (innerLoop) {
            this.middlewareList.push(middleware);
        }
        else {
            this.server.use(middleware);
        }
        return this.server;
    }
}
exports.default = App;
