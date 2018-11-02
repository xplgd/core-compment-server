"use strict";var __awaiter=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(r,o){function s(e){try{d(i.next(e))}catch(e){o(e)}}function a(e){try{d(i.throw(e))}catch(e){o(e)}}function d(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(s,a)}d((i=i.apply(e,t||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const Neo4jDriver_1=require("../drivers/Neo4jDriver"),neo4j=require("neo4j-driver");class Neo4jModel extends Neo4jDriver_1.Neo4jDriver{constructor(){super(...arguments),this.setUnique=((e,t)=>__awaiter(this,void 0,void 0,function*(){const n=`create constraint on (a:${e}) assert a.${t} is unique;`;yield this.queryRunner(n)})),this.addNode=((e,t,n)=>__awaiter(this,void 0,void 0,function*(){return t&&""!==t?yield this.mergeNode(e,t,n):yield this.createNode(e,t,n)})),this.mergeNode=((e,t,n)=>__awaiter(this,void 0,void 0,function*(){let i="";Object.keys(n).filter(e=>e!==t).map(e=>{n[e]&&(i+=`set n.${e} = $${e} `)});const r=`merge (n:${e}{${t}: $${t}}) ${i} return n`;yield this.queryRunner(r,this.dataConver(JSON.parse(JSON.stringify(n))))})),this.createNode=((e,t,n)=>__awaiter(this,void 0,void 0,function*(){let i="";Object.keys(n).filter(e=>e!==t).map(e=>{n[e]&&(i+=`set n.${e} = $${e} `)});const r=`merge (n:${e}{${t}: $${t}}) ${i} return n`;yield this.queryRunner(r,this.dataConver(JSON.parse(JSON.stringify(n))))})),this.dataConver=(e=>(Object.keys(e).map(t=>{"number"==typeof e[t]&&(e[t]=/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(e[t])?neo4j.v1.int(e[t]):e[t])}),e)),this.createRelation=(e=>__awaiter(this,void 0,void 0,function*(){const t={};let n="";Object.keys(e.startNode.condition).map(i=>{n+=`and a.${i}=$${i+"a"} `,t[`${i+"a"}`]=e.startNode.condition[i]}),Object.keys(e.endNode.condition).map(i=>{n+=`and b.${i}=$${i+"b"} `,t[`${i+"b"}`]=e.endNode.condition[i]}),n=n.substring(3);const i=`optional match (a:${e.startNode.name}),(b:${e.endNode.name}) where ${n}\n            merge (a)-[r:${e.name}]->(b) return r`;yield this.queryRunner(i,t)}))}}exports.Neo4jModel=Neo4jModel;