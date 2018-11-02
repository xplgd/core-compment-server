"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const __1=require(".."),router_1=require("../exception/router");class ApiMetadataStorage{constructor(){this.apiMetadatas=[],this.apiRouterList=[],this.filterByTarget=(t=>this.apiMetadatas.filter(e=>e.target===t)),this.findByName=(t=>this.apiRouterList.find(e=>e.moduleName===t)),this.addApiRouter=((t,e,a)=>{const i=e+"/"+t;if(this.apiRouterList.some(t=>t.prefix===i))throw new __1.Exception(router_1.default.PREFIX_DUPLICATE_REGIST,i);this.apiRouterList.push({moduleName:t,prefix:i,target:a})}),this.getApiRouter=(()=>this.apiRouterList)}}ApiMetadataStorage.getInstance=(()=>(ApiMetadataStorage.apiMetadataStorage||(ApiMetadataStorage.apiMetadataStorage=new ApiMetadataStorage),ApiMetadataStorage.apiMetadataStorage)),exports.getApiMetadataStorage=(()=>ApiMetadataStorage.getInstance());