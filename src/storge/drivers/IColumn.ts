export interface IColumn {
    TABLE_NAME: string;
    COLUMN_NAME: string;
    COLUMN_DEFAULT: string;
    IS_NULLABLE: string;
    DATA_TYPE: string;
    CHARACTER_MAXIMUM_LENGTH: number;
    NUMERIC_PRECISION: number;
    NUMERIC_SCALE: number;
    IsIdentity: number;
    IsUnique: number;
    column_key?: string;
}
