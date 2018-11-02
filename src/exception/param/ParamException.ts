import IExceptionDefine from '../IExceptionDefine';

export const PARAM_NOT_FOUND: IExceptionDefine = {
    code: 110100,
    name: 'param not fount',
    message: '参数<%=s1%>未找到'
};

export const PARAM_IS_NEED: IExceptionDefine = {
    code: 110101,
    name: 'param is must not be null',
    message: '参数<%=s1%>必须传'
};

export const PARAM_TYPE_ERR: IExceptionDefine = {
    code: 110102,
    name: 'param type error',
    message: '参数<%=s1%>的类型错误'
};
