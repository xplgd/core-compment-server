"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiMetadataStorage_1 = require("./ApiMetadataStorage");
const ApiGetway = (protocol, options) => {
    return (object, propertyName) => {
        if (!options)
            options = {};
        ApiMetadataStorage_1.getApiMetadataStorage().apiMetadatas.push({
            protocol,
            apiPrefix: options.apiPrefix || '/',
            apiName: options.apiName || propertyName,
            methodName: propertyName,
            auth: options.auth || false,
            target: object.constructor
        });
    };
};
exports.default = ApiGetway;
