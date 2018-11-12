"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToMysqlType = (columnType) => {
    switch (columnType) {
        case 'bigint': return 'bigint';
        case 'bit': return 'tinyint';
        case 'decimal': return 'decimal';
        case 'int': return 'int';
        case 'money': return 'float';
        case 'numeric': return 'decimal';
        case 'smallint': return 'smallint';
        case 'smallmoney': return 'float';
        case 'tinyint': return 'tinyint';
        case 'float': return 'float';
        case 'real': return 'float';
        case 'date': return 'date';
        case 'datetime2': return 'datetime';
        case 'datetime': return 'datetime';
        case 'datetimeoffset': return 'datetime';
        case 'smalldatetime': return 'datetime';
        case 'time': return 'time';
        case 'char': return 'char';
        case 'text': return 'text';
        case 'varchar': return 'varchar';
        case 'nchar': return 'char';
        case 'ntext': return 'text';
        case 'nvarchar': return 'varchar';
        case 'binary': return 'binary';
        case 'image': return 'image';
        case 'varbinary': return 'varbinary';
        case 'hierarchyid': return 'varchar';
        case 'sql_variant': return 'varchar';
        case 'timestamp': return 'timestamp';
        case 'uniqueidentifier': return 'varchar';
        case 'xml': return 'text';
        case 'geometry': return 'varchar';
        case 'geography': return 'varchar';
        default:
            throw new Error(`Unknown column type:${columnType}`);
    }
};
exports.ToNodeType = (columnType) => {
    switch (columnType) {
        case 'bigint': return 'string';
        case 'bit': return 'number';
        case 'decimal': return 'string';
        case 'int': return 'number';
        case 'money': return 'string';
        case 'numeric': return 'string';
        case 'smallint': return 'number';
        case 'smallmoney': return 'string';
        case 'tinyint': return 'number';
        case 'float': return 'string';
        case 'real': return 'string';
        case 'date': return 'string';
        case 'datetime2': return 'string';
        case 'datetime': return 'string';
        case 'datetimeoffset': return 'string';
        case 'smalldatetime': return 'string';
        case 'time': return 'string';
        case 'char': return 'string';
        case 'text': return 'string';
        case 'varchar': return 'string';
        case 'nchar': return 'string';
        case 'ntext': return 'string';
        case 'nvarchar': return 'string';
        case 'binary': return 'string';
        case 'image': return 'string';
        case 'varbinary': return 'string';
        case 'hierarchyid': return 'string';
        case 'sql_variant': return 'string';
        case 'timestamp': return 'string';
        case 'uniqueidentifier': return 'string';
        case 'xml': return 'string';
        case 'geometry': return 'string';
        case 'geography': return 'string';
        default:
            throw new Error(`Unknown column type:${columnType}`);
    }
};
exports.ToNeoType = (columnType) => {
    switch (columnType) {
        case 'bigint': return 'string';
        case 'bit': return 'int';
        case 'decimal': return 'string';
        case 'int': return 'int';
        case 'money': return 'string';
        case 'numeric': return 'string';
        case 'smallint': return 'int';
        case 'smallmoney': return 'string';
        case 'tinyint': return 'int';
        case 'float': return 'string';
        case 'real': return 'string';
        case 'date': return 'string';
        case 'datetime2': return 'string';
        case 'datetime': return 'string';
        case 'datetimeoffset': return 'string';
        case 'smalldatetime': return 'string';
        case 'time': return 'string';
        case 'char': return 'string';
        case 'text': return 'string';
        case 'varchar': return 'string';
        case 'nchar': return 'string';
        case 'ntext': return 'string';
        case 'nvarchar': return 'string';
        case 'binary': return 'string';
        case 'image': return 'string';
        case 'varbinary': return 'string';
        case 'hierarchyid': return 'string';
        case 'sql_variant': return 'string';
        case 'timestamp': return 'string';
        case 'uniqueidentifier': return 'string';
        case 'xml': return 'string';
        case 'geometry': return 'string';
        case 'geography': return 'string';
        default:
            throw new Error(`Unknown column type:${columnType}`);
    }
};
