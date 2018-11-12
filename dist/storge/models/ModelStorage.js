"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelStorage {
    constructor() {
        this.entities = {};
        this.modelList = [];
        this.filterByModule = (moduleName) => {
            return this.modelList.find((model) => model.moduleName === moduleName);
        };
    }
}
ModelStorage.getInstance = () => {
    if (!ModelStorage.modelStorage)
        ModelStorage.modelStorage = new ModelStorage();
    return ModelStorage.modelStorage;
};
exports.getModelStorage = () => {
    return ModelStorage.getInstance();
};
