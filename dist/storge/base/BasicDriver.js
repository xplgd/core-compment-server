"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasicDriver {
    constructor() {
        this.ColumnTypesWithWidth = [
            'tinyint',
            'smallint',
            'mediumint',
            'int',
            'bigint'
        ];
        this.ColumnTypesWithPrecision = [
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
        this.ColumnTypesWithLength = [
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
    }
}
exports.default = BasicDriver;
