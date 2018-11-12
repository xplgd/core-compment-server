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
class MysqlDriver extends BasicDriver_1.default {
    constructor(conn) {
        super();
        this.conn = conn;
    }
    getConnect() {
        return this.conn;
    }
    getAllTablesQuery() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.conn.query(`SELECT TABLE_SCHEMA, TABLE_NAME FROM information_schema.tables WHERE table_type='BASE TABLE' AND table_schema like DATABASE();`);
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
                    DATA_TYPE,CHARACTER_MAXIMUM_LENGTH,NUMERIC_PRECISION,NUMERIC_SCALE,
                    CASE WHEN EXTRA like '%auto_increment%' THEN 1 ELSE 0 END IsIdentity, column_type, column_key
                    FROM INFORMATION_SCHEMA.COLUMNS where TABLE_SCHEMA like DATABASE() and TABLE_NAME = '${tableName}'`;
            const result = yield this.conn.query(sql);
            return result;
        });
    }
    getPrimaryKey(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            return result;
        });
    }
    queryBySql(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.conn.query(sql);
        });
    }
}
exports.MysqlDriver = MysqlDriver;
