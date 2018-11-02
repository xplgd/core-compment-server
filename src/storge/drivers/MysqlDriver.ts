import BasicDriver from '../base/BasicDriver';
import { Connection } from 'typeorm';
import { IColumn } from './IColumn';
import { ITable } from './ITable';

export abstract class MysqlDriver extends BasicDriver {

    public conn: Connection;

    public constructor(conn: Connection) {
        super();
        this.conn = conn;
    }

    public getConnect() {
        return this.conn;
    }

    // 查询本库的所有表
    public async getAllTablesQuery() {
        const result = await this.conn.query(`SELECT TABLE_SCHEMA, TABLE_NAME FROM information_schema.tables WHERE table_type='BASE TABLE' AND table_schema like DATABASE();`);
        const list: ITable[] = [];
        result.map((item: any) => {
            list.push({ tableName: item.TABLE_NAME, tableScheme: item.TABLE_SCHEMA });
        });

        return list;
    }

    // 查询表中所有字段
    public async getColumnsFromTable(tableName: string) {
        const sql = `SELECT TABLE_NAME,COLUMN_NAME,COLUMN_DEFAULT,IS_NULLABLE,
                    DATA_TYPE,CHARACTER_MAXIMUM_LENGTH,NUMERIC_PRECISION,NUMERIC_SCALE,
                    CASE WHEN EXTRA like '%auto_increment%' THEN 1 ELSE 0 END IsIdentity, column_type, column_key
                    FROM INFORMATION_SCHEMA.COLUMNS where TABLE_SCHEMA like DATABASE() and TABLE_NAME = '${tableName}'`;
        const result: IColumn[] = await this.conn.query(sql);

        return result;
    }

    // 查询主键
    public async getPrimaryKey(tableName: string) {
        // TODO: 暂未实现
        const result: any[] = [];

        return result;
    }

    public async queryBySql(sql: string) {
        return await this.conn.query(sql);
    }

}
