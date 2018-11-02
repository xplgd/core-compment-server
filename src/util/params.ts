import * as Router from 'koa-router';
import Exception from '../exception/Exception';
import { getMetadataArgsStorage } from 'typeorm';
import ParamException from '../exception/param';
import { ToNodeType } from './column';

export type paramType = 'string' | 'number' | 'boolean' | 'object' | 'array';

/**
 * 从请求中按照实体的字段类型对应解析参数
 * @param ctx 路由上下文
 * @param target 实体对象类
 * @param ignore 是否忽略约束（非空、唯一、主键）
 */
export const resolveEntityParams = (ctx: Router.IRouterContext, target: (Function | string), ignore: boolean = false) => {
    const columns = getMetadataArgsStorage().filterColumns(target);
    const method = ctx.req.method;
    switch (method) {
        case 'GET': return convertEntity(ctx.query, columns, ignore);
        case 'POST': return convertEntity(ctx.request.body, columns, ignore);
        default: return convertEntity(ctx.request.body, columns, ignore);
    }
};

const convertEntity = (params: { [key: string]: any } | null | undefined, columns: any[], ignore: boolean = false) => {
    const object: any = {};
    if (params && params != null) {
        for (const column of columns) {
            const key = column.propertyName;
            const nullable = ignore || column.options.nullable;
            const type = ToNodeType(column.options.type);
            object[key] = convertValue(key, params[key], nullable, type);
        }
    }

    return object;
};

/**
 * 从请求中按照类型对应解析参数
 * @param ctx 路由上下文
 * @param key 参数名
 * @param nullable 能否为空
 * @param type 参数类型，默认string
 * @param convert 是否转换成指定类型，默认转换
 */
export const resolveParams = (ctx: Router.IRouterContext, key: string, type: paramType = 'string', nullable: boolean = false, convert: boolean = true) => {
    if (ctx.params[key]) return convertValue(key, ctx.params[key], nullable, type, convert);
    const method = ctx.req.method;
    switch (method) {
        case 'GET': return convertValue(key, ctx.query[key], nullable, type, convert);
        case 'POST': {
            return convertValue(key, (ctx.request.body as any)[key], nullable, type, convert);
        }
        default: return convertValue(key, (ctx.request.body as any)[key], nullable, type, convert);
    }
};

const convertValue = (key: string, value: any, nullable: boolean, type: paramType, convert: boolean = true) => {
    // 参数参数不存在且不允许为空
    if (typeof value === 'undefined' && !nullable) throw new Exception(ParamException.PARAM_IS_NEED, key);

    // 参数参数不存在且允许为空
    if (typeof value === 'undefined' && nullable) return null;

    // 参数类型正确
    if (typeof value === type || (type === 'array' && value instanceof Array)) return value;

    // 参数类型不正确，但允许类型转换的
    if (convert) {
        switch (type) {
            case 'number': {
                const res = Number(value);
                if (!isNaN(res)) return res;
                break;
            }
            case 'string': {
                if (typeof value !== 'function') return JSON.stringify(value);
                break;
            }
            default: break;
        }
    }

    // 不满足以上条件的
    throw new Exception(ParamException.PARAM_TYPE_ERR, key);
};
