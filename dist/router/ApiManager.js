"use strict";var __awaiter=this&&this.__awaiter||function(t,e,a,r){return new(a||(a=Promise))(function(o,i){function s(t){try{u(r.next(t))}catch(t){i(t)}}function n(t){try{u(r.throw(t))}catch(t){i(t)}}function u(t){t.done?o(t.value):new a(function(e){e(t.value)}).then(s,n)}u((r=r.apply(t,e||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const Router=require("koa-router"),debug=require("debug"),ApiMetadataStorage_1=require("./ApiMetadataStorage");class ApiManager{constructor(){this.registHttpApi=((t,e)=>{const a=e instanceof Array?e:[e];for(const e of a){const a=e.rootPath&&""!==e.rootPath?e.rootPath.startsWith("/")?e.rootPath:"/"+e.rootPath:"/";t=module?t.startsWith("/")?t.substring(1):t:"",ApiMetadataStorage_1.getApiMetadataStorage().addApiRouter(t,a,e.api)}}),this.buildHttpApi=((t,e)=>__awaiter(this,void 0,void 0,function*(){const a=ApiMetadataStorage_1.getApiMetadataStorage().findByName(t);if(a){const r=new Router,o=a.prefix,i=a.target,s=Reflect.construct(i,[]),n=new Router({prefix:o});for(const e of ApiMetadataStorage_1.getApiMetadataStorage().filterByTarget(i))this.buildRouter(t,o,n,e,s);r.use(n.routes()).use(n.allowedMethods()),e.use(r.routes()).use(r.allowedMethods())}})),this.buildApiRouter=(t=>{const e=new Router;for(const t of ApiMetadataStorage_1.getApiMetadataStorage().apiRouterList){const a=t.moduleName,r=t.prefix,o=t.target,i=Reflect.construct(o,[]),s=new Router({prefix:r});for(const t of ApiMetadataStorage_1.getApiMetadataStorage().filterByTarget(o))this.buildRouter(a,r,s,t,i);e.use(s.routes()).use(s.allowedMethods())}t.use(e.routes()).use(e.allowedMethods())}),this.buildRouter=((t,e,a,r,o)=>{const i=r.apiPrefix&&""!==r.apiPrefix?r.apiPrefix.startsWith("/")?r.apiPrefix:"/"+r.apiPrefix:"/",s=r.apiName.startsWith("/")?r.apiName.substring(1):r.apiName,n=i.endsWith("/")?i+s:i+"/"+s;switch(debug(`module:${t}`)(`router:[${r.protocol}]${e+n}`),r.protocol){case"GET":return a.get(n,o[r.methodName].bind(o));case"POST":return a.post(n,o[r.methodName].bind(o));case"PUT":return a.put(n,o[r.methodName].bind(o));case"PATCH":return a.patch(n,o[r.methodName].bind(o));case"DELETE":return a.delete(n,o[r.methodName].bind(o));default:return a}})}static getInstance(){return ApiManager.apiManager||(ApiManager.apiManager=new ApiManager),ApiManager.apiManager}}exports.default=ApiManager;