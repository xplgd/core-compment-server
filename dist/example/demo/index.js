"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api_1 = require("./Api");
const Meta_1 = require("./Meta");
const name = 'demo';
exports.default = {
    name,
    httpApi: { rootPath: '/api/v1', api: Api_1.default },
    entities: [Meta_1.default],
    init: () => {
        console.log(123);
    }
};
