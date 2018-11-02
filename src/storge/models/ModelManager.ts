import { createConnection, ConnectionOptions, getMetadataArgsStorage } from 'typeorm';

import Exception from '../../exception/Exception';
import { TableMetadataArgs } from 'typeorm/metadata-args/TableMetadataArgs';
import MssqlModel from './MssqlModel';
import MysqlModel from './MysqlModel';
import { Neo4jModel } from './Neo4jModel';
import { createNeoDriver } from '../drivers/Neo4jDriver';
import { IModelOption } from './IModelOption';
import ModelException from '../../exception/model';

export declare type IEntity = Function | string;

export default class ModelManager {
    private tables: { [key: string]: TableMetadataArgs[] } = {};
    private entities: IEntity[] = [];
    private models: { [key: string]: MssqlModel | MysqlModel | Neo4jModel } = {};

    private constructor() { }

    private static modelManager: ModelManager;

    public static getInstance() {
        if (!ModelManager.modelManager) ModelManager.modelManager = new ModelManager();

        return ModelManager.modelManager;
    }

    /**
     * 向base数据库中注册数据库实体， 暂时不考虑创建多数据库实体
     */
    public registEntity = (moduleName: string, entities: IEntity[]) => {
        if (this.tables[moduleName] && this.tables[moduleName] !== null) throw new Exception();

        const tables = getMetadataArgsStorage().filterTables(entities);

        // 判断实体是否重复注册重复
        for (const table of tables) {
            if (this.filterEntity(table)) throw new Exception();
        }

        this.tables[moduleName] = tables;
        this.entities = this.entities.concat(entities);
    }

    private filterEntity = (table: TableMetadataArgs) => {
        let entity = null;
        const keys = Object.keys(this.tables);
        for (const key of keys) {
            entity = this.tables[key].find((item) => item.name === table.name && item.schema === table.schema);
        }

        return entity;
    }

    public init = async (options: IModelOption[]) => {
        for (const option of options) {
            if (this.models[option.name] && this.models[option.name] !== null) throw new Exception();
            if ('base' === option.name) {
                option.entities = this.entities;
            }
            this.models[option.name] = await this.createModel(option);
        }
    }

    public createModel = async (option: IModelOption) => {
        // typeorm中type类型是大小区分的
        option.type = option.type ? option.type.toLowerCase() : option.type;
        switch (option.type) {
            case 'mysql': {
                const conn = await createConnection(option as ConnectionOptions);

                return new MysqlModel(conn);
            }
            case 'mssql': return new MssqlModel(await createConnection(option as ConnectionOptions));
            case 'neo4j': return new Neo4jModel(await createNeoDriver(option));
            default: throw new Exception(ModelException.MODEL_TYPE_NOT_SUPPORT);
        }
    }

    public getConnect = (name?: string) => {
        const model = this.models[name || 'base'];
        if (!model) throw new Exception();
        const conn = model.getConnect();
        if (conn === null) throw new Exception();

        return conn;
    }

    public getModel = (name?: string) => {
        const model = this.models[name || 'base'];
        if (!model) throw new Exception();

        return model;
    }
}

export const getConnect = (name?: string) => {
    return ModelManager.getInstance().getConnect();
};

export const getModel = (name?: string) => {
    return ModelManager.getInstance().getModel();
};

export const createModel = async (option: IModelOption) => {
    return await ModelManager.getInstance().createModel(option);
};
