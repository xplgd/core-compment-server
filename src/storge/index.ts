import MssqlModel from './models/MssqlModel';
import MysqlModel from './models/MysqlModel';
import {getConnect, getModel, createModel} from './models/ModelManager';
import BaseEntity from './base/BaseEntity';
import BaseModel from './base/BaseModel';

// 导出能在模块内被引用的方法和类
export {
    MssqlModel,
    MysqlModel,
    BaseEntity,
    BaseModel,
    getConnect,
    getModel,
    createModel
};
