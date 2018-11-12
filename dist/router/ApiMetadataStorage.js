"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const router_1 = require("../exception/router");
class ApiMetadataStorage {
    constructor() {
        this.apiMetadatas = [];
        this.apiRouterList = [];
        this.filterByTarget = (target) => {
            return this.apiMetadatas.filter((metadata) => metadata.target === target);
        };
        this.findByName = (moduleName) => {
            return this.apiRouterList.find((item) => item.moduleName === moduleName);
        };
        this.addApiRouter = (moduleName, apiRootPath, target) => {
            const prefix = apiRootPath + '/' + moduleName;
            if (this.apiRouterList.some((item) => item.prefix === prefix))
                throw new __1.Exception(router_1.default.PREFIX_DUPLICATE_REGIST, prefix);
            this.apiRouterList.push({ moduleName, prefix, target });
        };
        this.getApiRouter = () => {
            return this.apiRouterList;
        };
    }
}
ApiMetadataStorage.getInstance = () => {
    if (!ApiMetadataStorage.apiMetadataStorage)
        ApiMetadataStorage.apiMetadataStorage = new ApiMetadataStorage();
    return ApiMetadataStorage.apiMetadataStorage;
};
exports.getApiMetadataStorage = () => {
    return ApiMetadataStorage.getInstance();
};
