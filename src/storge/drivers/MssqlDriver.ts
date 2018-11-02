import BasicDriver from '../base/BasicDriver';
import { Connection } from 'typeorm';
import { IColumn } from './IColumn';
import { ITable } from './ITable';

export abstract class MssqlDriver extends BasicDriver {

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
        const result = await this.conn.query(`SELECT TABLE_SCHEMA,TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE' order by TABLE_NAME`);
        const list: ITable[] = [];
        result.map((item: any) => {
            list.push({ tableName: item.TABLE_NAME, tableScheme: item.TABLE_SCHEMA });
        });

        return list;
    }

    // 查询表中所有字段
    public async getColumnsFromTable(tableName: string) {
        const sql = `SELECT TABLE_NAME,COLUMN_NAME,COLUMN_DEFAULT,IS_NULLABLE,
                    DATA_TYPE, (case when CHARACTER_MAXIMUM_LENGTH in ( -1, 1000) then 2000 else CHARACTER_MAXIMUM_LENGTH end) as CHARACTER_MAXIMUM_LENGTH,NUMERIC_PRECISION,NUMERIC_SCALE,
                    COLUMNPROPERTY(object_id(TABLE_NAME), COLUMN_NAME, 'IsIdentity') IsIdentity,
                    (SELECT count(*) FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
                        inner join INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE cu on cu.CONSTRAINT_NAME = tc.CONSTRAINT_NAME
                        where tc.CONSTRAINT_TYPE = 'UNIQUE' and tc.TABLE_NAME = c.TABLE_NAME and cu.COLUMN_NAME = c.COLUMN_NAME and tc.TABLE_SCHEMA=c.TABLE_SCHEMA) IsUnique
                    FROM INFORMATION_SCHEMA.COLUMNS c where TABLE_NAME = '${tableName}'`;
        const result: IColumn[] = await this.conn.query(sql);

        return result;
    }

    // 查询主键
    public async getPrimaryKey(tableName: string) {
        const sql = `select col.name as PrimaryKey FROM sys.indexes ind
                INNER JOIN  sys.index_columns ic ON  ind.object_id = ic.object_id and ind.index_id = ic.index_id
                INNER JOIN  sys.columns col ON ic.object_id = col.object_id and ic.column_id = col.column_id
                where ind.object_id=OBJECT_ID('${tableName}') and ind.is_primary_key = 1`;

        return await this.conn.query(sql);
    }

    public async queryBySql(sql: string) {
        return await this.conn.query(sql);
    }

}
