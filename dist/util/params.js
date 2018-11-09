"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const Exception_1=require("../exception/Exception"),typeorm_1=require("typeorm"),param_1=require("../exception/param"),column_1=require("./column");exports.resolveEntityParams=((e,t,r=!1)=>{const o=typeorm_1.getMetadataArgsStorage().filterColumns(t);switch(e.req.method){case"GET":return convertEntity(e.query,o,r);case"POST":default:return convertEntity(e.request.body,o,r)}});const convertEntity=(e,t,r=!1)=>{const o={};if(e&&null!=e)for(const n of t){const t=n.propertyName,a=r||n.options.nullable,u=column_1.ToNodeType(n.options.type);o[t]=convertValue(t,e[t],a,u)}return o};exports.resolveParams=((e,t,r="string",o=!1,n=!0)=>{if(e.params[t])return convertValue(t,e.params[t],o,r,n);switch(e.req.method){case"GET":return convertValue(t,e.query[t],o,r,n);case"POST":default:return convertValue(t,e.request.body[t],o,r,n)}});const convertValue=(e,t,r,o,n=!0)=>{if(void 0===t&&!r)throw new Exception_1.default(param_1.default.PARAM_IS_NEED,e);if(void 0===t&&r)return null;if(typeof t===o||"array"===o&&t instanceof Array)return t;if(n)switch(o){case"number":{const e=Number(t);if(!isNaN(e))return e;break}case"string":if("function"!=typeof t)return JSON.stringify(t)}throw new Exception_1.default(param_1.default.PARAM_TYPE_ERR,e)};