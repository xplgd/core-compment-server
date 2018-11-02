import IExceptionDefine from './IExceptionDefine';
import { COMMON_EXCEPTION } from './Common';
import { template } from 'lodash';
import { Map } from 'immutable';

/**
 * Exception: 推荐作为服务开发的异常通用类型
 */
export default class Exception extends Error  {
    public code?: number | undefined;
    public name: string;

    /**
     * 构造一个通用异常
     * @param  {IExceptionDefine=COMMON} def 异常定义
     * @param  {string[]} ...messageArgs 用于填充提示语的消息参数
     */
    constructor(def: IExceptionDefine = COMMON_EXCEPTION, ...messageArgs: string[]) {
        let msg = def.message;
        if (messageArgs.length > 0) {
            const compiled = template(msg);
            let args = Map();
            for (let i = 0; i < messageArgs.length; i++) {
                args = args.set(`s${i + 1}`, messageArgs[i]);
            }
            msg = compiled(args.toObject());
        }

        super(msg);
        this.name = def.name;
        this.code = def.code;
    }
}
