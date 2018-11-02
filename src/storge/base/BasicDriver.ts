import { WithWidthColumnType, WithPrecisionColumnType, WithLengthColumnType } from 'typeorm/driver/types/ColumnTypes';
import { IColumn } from '../drivers/IColumn';
import { ITable } from '../drivers/ITable';
import { Connection } from 'typeorm';

export default abstract class BasicDriver {
    ColumnTypesWithWidth: WithWidthColumnType[] = [
        'tinyint',
        'smallint',
        'mediumint',
        'int',
        'bigint'
    ];
    ColumnTypesWithPrecision: WithPrecisionColumnType[] = [
        'float',
        'double',
        'dec',
        'decimal',
        'numeric',
        'real',
        'double precision',
        'number',
        'datetime',
        'datetime2',
        'datetimeoffset',
        'time',
        'time with time zone',
        'time without time zone',
        'timestamp',
        'timestamp without time zone',
        'timestamp with time zone',
        'timestamp with local time zone'
    ];
    ColumnTypesWithLength: WithLengthColumnType[] = [
        'character varying',
        'varying character',
        'nvarchar',
        'character',
        'native character',
        'varchar',
        'char',
        'nchar',
        'varchar2',
        'nvarchar2',
        'raw',
        'binary',
        'varbinary'
    ];

    public abstract async getAllTablesQuery(): Promise<ITable[]>;
    public abstract async getColumnsFromTable(tableName: string): Promise<IColumn[]>;
    public abstract async getPrimaryKey(tableName: string): Promise<any[]>;
    public abstract async queryBySql(sql: string): Promise<any>;
    public abstract getConnect(): Connection;
}
