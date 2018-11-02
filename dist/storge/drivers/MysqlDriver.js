"use strict";var __awaiter=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,o){function E(e){try{s(r.next(e))}catch(e){o(e)}}function a(e){try{s(r.throw(e))}catch(e){o(e)}}function s(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(E,a)}s((r=r.apply(e,t||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const BasicDriver_1=require("../base/BasicDriver");class MysqlDriver extends BasicDriver_1.default{constructor(e){super(),this.conn=e}getConnect(){return this.conn}getAllTablesQuery(){return __awaiter(this,void 0,void 0,function*(){const e=yield this.conn.query("SELECT TABLE_SCHEMA, TABLE_NAME FROM information_schema.tables WHERE table_type='BASE TABLE' AND table_schema like DATABASE();"),t=[];return e.map(e=>{t.push({tableName:e.TABLE_NAME,tableScheme:e.TABLE_SCHEMA})}),t})}getColumnsFromTable(e){return __awaiter(this,void 0,void 0,function*(){const t=`SELECT TABLE_NAME,COLUMN_NAME,COLUMN_DEFAULT,IS_NULLABLE,\n                    DATA_TYPE,CHARACTER_MAXIMUM_LENGTH,NUMERIC_PRECISION,NUMERIC_SCALE,\n                    CASE WHEN EXTRA like '%auto_increment%' THEN 1 ELSE 0 END IsIdentity, column_type, column_key\n                    FROM INFORMATION_SCHEMA.COLUMNS where TABLE_SCHEMA like DATABASE() and TABLE_NAME = '${e}'`;return yield this.conn.query(t)})}getPrimaryKey(e){return __awaiter(this,void 0,void 0,function*(){return[]})}queryBySql(e){return __awaiter(this,void 0,void 0,function*(){return yield this.conn.query(e)})}}exports.MysqlDriver=MysqlDriver;