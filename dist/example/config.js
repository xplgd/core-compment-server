"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    appOption: {
        port: 6789,
        home: '',
        logPath: 'logs',
        proxy: false,
        key: 'app'
    },
    modelOptions: [
        {
            name: 'base',
            type: 'mysql',
            host: '10.5.11.18',
            port: 3307,
            username: 'root',
            password: '123456',
            database: 'lgd',
            timezone: '+08: 00',
            synchronize: true
        },
        {
            name: 'qc',
            type: 'mysql',
            host: '10.5.10.18',
            port: 3306,
            username: 'root',
            password: '95938',
            database: 'qc',
            timezone: '+08: 00'
        },
        {
            name: 'neo',
            type: 'neo4j',
            host: '10.5.11.18',
            port: 7687,
            username: 'neo4j',
            password: '95938'
        }
    ]
};
exports.default = config;
