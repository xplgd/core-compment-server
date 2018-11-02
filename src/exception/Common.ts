import IExceptionDefine from './IExceptionDefine';

/**
 * 组件异常
 */
export const COMMON_EXCEPTION: IExceptionDefine = {
    code: 100000,
    name: 'CommonException',
    message: '错误'
};

/**
 * 参数异常
 */
export const ARGUMENT_EXCEPTION: IExceptionDefine = {
    code: 100001,
    name: 'ArgumentException',
    message: '<%=s1%>'
};
