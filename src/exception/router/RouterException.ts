import IExceptionDefine from '../IExceptionDefine';

export const PREFIX_DUPLICATE_REGIST: IExceptionDefine = {
    code: 110200,
    name: 'Duplicate api url prefix',
    message: '[<%=s1%>]API接口前缀重复'
};
