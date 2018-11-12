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
const typeorm_1 = require("typeorm");
const Exception_1 = require("../../exception/Exception");
const MssqlModel_1 = require("./MssqlModel");
const MysqlModel_1 = require("./MysqlModel");
const Neo4jModel_1 = require("./Neo4jModel");
const Neo4jDriver_1 = require("../drivers/Neo4jDriver");
const model_1 = require("../../exception/model");
class ModelManager {
    constructor() {
        this.tables = {};
        this.entities = [];
        this.models = {};
        this.registEntity = (moduleName, entities) => {
            if (this.tables[moduleName] && this.tables[moduleName] !== null)
                throw new Exception_1.default();
            const tables = typeorm_1.getMetadataArgsStorage().filterTables(entities);
            for (const table of tables) {
                if (this.filterEntity(table))
                    throw new Exception_1.default();
            }
            this.tables[moduleName] = tables;
            this.entities = this.entities.concat(entities);
        };
        this.filterEntity = (table) => {
            let entity = null;
            const keys = Object.keys(this.tables);
            for (const key of keys) {
                entity = this.tables[key].find((item) => item.name === table.name && item.schema === table.schema);
            }
            return entity;
        };
        this.init = (options) => __awaiter(this, void 0, void 0, function* () {
            for (const option of options) {
                if (this.models[option.name] && this.models[option.name] !== null)
                    throw new Exception_1.default();
                if ('base' === option.name) {
                    option.entities = this.entities;
                }
                this.models[option.name] = yield this.createModel(option);
            }
        });
        this.createModel = (option) => __awaiter(this, void 0, void 0, function* () {
            option.type = option.type ? option.type.toLowerCase() : option.type;
            switch (option.type) {
                case 'mysql': {
                    const conn = yield typeorm_1.createConnection(option);
                    return new MysqlModel_1.default(conn);
                }
                case 'mssql': return new MssqlModel_1.default(yield typeorm_1.createConnection(option));
                case 'neo4j': return new Neo4jModel_1.Neo4jModel(yield Neo4jDriver_1.createNeoDriver(option));
                default: throw new Exception_1.default(model_1.default.MODEL_TYPE_NOT_SUPPORT);
            }
        });
        this.getConnect = (name) => {
            const model = this.models[name || 'base'];
            if (!model)
                throw new Exception_1.default();
            const conn = model.getConnect();
            if (conn === null)
                throw new Exception_1.default();
            return conn;
        };
        this.getModel = (name) => {
            const model = this.models[name || 'base'];
            if (!model)
                throw new Exception_1.default();
            return model;
        };
    }
    static getInstance() {
        if (!ModelManager.modelManager)
            ModelManager.modelManager = new ModelManager();
        return ModelManager.modelManager;
    }
}
exports.default = ModelManager;
exports.getConnect = (name) => {
    return ModelManager.getInstance().getConnect();
};
exports.getModel = (name) => {
    return ModelManager.getInstance().getModel();
};
exports.createModel = (option) => __awaiter(this, void 0, void 0, function* () {
    return yield ModelManager.getInstance().createModel(option);
});
