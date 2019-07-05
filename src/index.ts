import App from './App';
import { ApiGetway } from './router';
import IExceptionDefine from './exception/IExceptionDefine';
import Exception from './exception/Exception';
import { resolveParams, resolveEntityParams } from './util/params';
import * as Model from './storge';
import { IRouterContext } from 'koa-router';
import { IAppOption } from './middleware';

/**
 * 导出时慎重,仅导出在模块内能被应用，且不会影响底层框架的函数
 */
export {
    App,
    IAppOption,
    ApiGetway,
    Model,
    Exception,
    IExceptionDefine,
    IRouterContext,
    resolveParams,
    resolveEntityParams
};
