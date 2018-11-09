"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const MssqlModel_1=require("./models/MssqlModel");exports.MssqlModel=MssqlModel_1.default;const MysqlModel_1=require("./models/MysqlModel");exports.MysqlModel=MysqlModel_1.default;const ModelManager_1=require("./models/ModelManager");exports.getConnect=ModelManager_1.getConnect,exports.getModel=ModelManager_1.getModel,exports.createModel=ModelManager_1.createModel;const BaseEntity_1=require("./base/BaseEntity");exports.BaseEntity=BaseEntity_1.default;const BaseModel_1=require("./base/BaseModel");exports.BaseModel=BaseModel_1.default;