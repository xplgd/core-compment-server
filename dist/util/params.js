"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = require("../exception/Exception");
const typeorm_1 = require("typeorm");
const param_1 = require("../exception/param");
const column_1 = require("./column");
exports.resolveEntityParams = (ctx, target, ignore = false) => {
    const columns = typeorm_1.getMetadataArgsStorage().filterColumns(target);
    const method = ctx.req.method;
    switch (method) {
        case 'GET': return convertEntity(ctx.query, columns, ignore);
        case 'POST': return convertEntity(ctx.request.body, columns, ignore);
        default: return convertEntity(ctx.request.body, columns, ignore);
    }
};
const convertEntity = (params, columns, ignore = false) => {
    const object = {};
    if (params && params != null) {
        for (const column of columns) {
            const key = column.propertyName;
            const nullable = ignore || column.options.nullable;
            const type = column_1.ToNodeType(column.options.type);
            object[key] = convertValue(key, params[key], nullable, type);
        }
    }
    return object;
};
exports.resolveParams = (ctx, key, type = 'string', nullable = false, convert = true) => {
    if (ctx.params[key])
        return convertValue(key, ctx.params[key], nullable, type, convert);
    const method = ctx.req.method;
    switch (method) {
        case 'GET': return convertValue(key, ctx.query[key], nullable, type, convert);
        case 'POST': {
            return convertValue(key, ctx.request.body[key], nullable, type, convert);
        }
        default: return convertValue(key, ctx.request.body[key], nullable, type, convert);
    }
};
const convertValue = (key, value, nullable, type, convert = true) => {
    if (typeof value === 'undefined' && !nullable)
        throw new Exception_1.default(param_1.default.PARAM_IS_NEED, key);
    if (typeof value === 'undefined' && nullable)
        return null;
    if (typeof value === type || (type === 'array' && value instanceof Array))
        return value;
    if (convert) {
        switch (type) {
            case 'number': {
                const res = Number(value);
                if (!isNaN(res))
                    return res;
                break;
            }
            case 'string': {
                if (typeof value !== 'function')
                    return JSON.stringify(value);
                break;
            }
            default: break;
        }
    }
    throw new Exception_1.default(param_1.default.PARAM_TYPE_ERR, key);
};
