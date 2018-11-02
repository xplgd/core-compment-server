/**
 * IExceptionDefine
 * 异常定义：每个业务子系统应该拥有一个异常定义集合，参看 /src/constants/exception/common
 *  code:       异常code（建议唯一）
 *  name:       异常的定义名称
 *  message:    异常的消息文本，请参看 /src/constants/exception/common 的模板文本定义
 *  eg:
 *      export const ARGUMENT: IExceptionDefine = {
 *           code: 100001,
 *           name: 'ArgumentException',
 *           message: '<%=s1%>'
 *      };
 *      模板文本中的替换标记请从 s1 开始 s1、s2、s3... 匹配对应到 Exception 构造中对应的填充参数
 */
export default interface IExceptionDefine {
    code: number;
    name: string;
    message: string;
}
