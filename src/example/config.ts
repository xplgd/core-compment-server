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
            password: 'HellCat@6.2T',
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
            password: 'Porsche911@3.8T',
            database: 'qc',
            timezone: '+08: 00'
        }
    ]
};

export default config;
