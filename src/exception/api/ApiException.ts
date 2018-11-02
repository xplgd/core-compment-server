import IExceptionDefine from '../IExceptionDefine';

export const API_IS_NOT_FUNCTION: IExceptionDefine = {
    code: 120100,
    name: 'Api is must be function',
    message: '注册的API接口[<%=s1%>]必须是函数'
};

export const MODULE_OPTIONS_ERROR: IExceptionDefine = {
    code: 120100,
    name: 'Module options need info',
    message: '模块[<%=s1%>]导出的参数不正确'
};
