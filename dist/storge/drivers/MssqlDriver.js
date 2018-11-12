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
const BasicDriver_1 = require("../base/BasicDriver");
class MssqlDriver extends BasicDriver_1.default {
    constructor(conn) {
        super();
        this.conn = conn;
    }
    getConnect() {
        return this.conn;
    }
    getAllTablesQuery() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.conn.query(`SELECT TABLE_SCHEMA,TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE' order by TABLE_NAME`);
            const list = [];
            result.map((item) => {
                list.push({ tableName: item.TABLE_NAME, tableScheme: item.TABLE_SCHEMA });
            });
            return list;
        });
    }
    getColumnsFromTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT TABLE_NAME,COLUMN_NAME,COLUMN_DEFAULT,IS_NULLABLE,
                    DATA_TYPE, (case when CHARACTER_MAXIMUM_LENGTH in ( -1, 1000) then 2000 else CHARACTER_MAXIMUM_LENGTH end) as CHARACTER_MAXIMUM_LENGTH,NUMERIC_PRECISION,NUMERIC_SCALE,
                    COLUMNPROPERTY(object_id(TABLE_NAME), COLUMN_NAME, 'IsIdentity') IsIdentity,
                    (SELECT count(*) FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
                        inner join INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE cu on cu.CONSTRAINT_NAME = tc.CONSTRAINT_NAME
                        where tc.CONSTRAINT_TYPE = 'UNIQUE' and tc.TABLE_NAME = c.TABLE_NAME and cu.COLUMN_NAME = c.COLUMN_NAME and tc.TABLE_SCHEMA=c.TABLE_SCHEMA) IsUnique
                    FROM INFORMATION_SCHEMA.COLUMNS c where TABLE_NAME = '${tableName}'`;
            const result = yield this.conn.query(sql);
            return result;
        });
    }
    getPrimaryKey(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select col.name as PrimaryKey FROM sys.indexes ind
                INNER JOIN  sys.index_columns ic ON  ind.object_id = ic.object_id and ind.index_id = ic.index_id
                INNER JOIN  sys.columns col ON ic.object_id = col.object_id and ic.column_id = col.column_id
                where ind.object_id=OBJECT_ID('${tableName}') and ind.is_primary_key = 1`;
            return yield this.conn.query(sql);
        });
    }
    queryBySql(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.conn.query(sql);
        });
    }
}
exports.MssqlDriver = MssqlDriver;
