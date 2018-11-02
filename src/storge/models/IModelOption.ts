export interface IModelOption {
    [Key: string]: any;
    name: string;
    type: 'mysql' | 'mssql' | 'neo4j' | string;
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
}
