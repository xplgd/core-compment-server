import IExceptionDefine from '../IExceptionDefine';

export const TOKEN_NEEDED: IExceptionDefine = {
    code: 110100,
    name: 'CA Token Needed',
    message: '必须提供CA票据'
};

export const INVALID_TOKEN: IExceptionDefine = {
    code: 110101,
    name: 'Invalid CA Token',
    message: '无效的CA票据'
};

export const INVALID_TOKEN_FORMAT: IExceptionDefine = {
    code: 110102,
    name: 'Invalid CA Token format',
    message: '无效的CA票据格式'
};

export const RESOVE_TOKEN_FAILED: IExceptionDefine = {
    code: 110103,
    name: 'Resolve CA Token failed',
    message: '解析CA票据失败'
};

export const TOKEN_HAS_EXPIRED: IExceptionDefine = {
    code: 110105,
    name: 'CA Token has expired',
    message: 'CA票据已过期'
};

export const SCOPE_NOT_PERMITTED: IExceptionDefine = {
    code: 110106,
    name: 'CA Scope not permitted',
    message: '未授权的CA请求范围'
};
