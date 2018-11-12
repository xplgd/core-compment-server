"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Neo4jDriver_1 = require("../drivers/Neo4jDriver");
const neo4j = require("neo4j-driver");
class Neo4jModel extends Neo4jDriver_1.Neo4jDriver {
    constructor() {
        super(...arguments);
        this.setUnique = (label, field) => __awaiter(this, void 0, void 0, function* () {
            const state = `create constraint on (a:${label}) assert a.${field} is unique;`;
            yield this.queryRunner(state);
        });
        this.addNode = (label, primaryKey, data) => __awaiter(this, void 0, void 0, function* () {
            if (primaryKey && primaryKey !== '') {
                return yield this.mergeNode(label, primaryKey, data);
            }
            else {
                return yield this.createNode(label, primaryKey, data);
            }
        });
        this.mergeNode = (label, primaryKey, data) => __awaiter(this, void 0, void 0, function* () {
            let sets = '';
            Object.keys(data).filter((key) => key !== primaryKey).map((key) => {
                if (data[key])
                    sets += `set n.${key} = $${key} `;
            });
            const state = `merge (n:${label}{${primaryKey}: $${primaryKey}}) ${sets} return n`;
            yield this.queryRunner(state, this.dataConver(JSON.parse(JSON.stringify(data))));
        });
        this.createNode = (label, primaryKey, data) => __awaiter(this, void 0, void 0, function* () {
            let sets = '';
            Object.keys(data).filter((key) => key !== primaryKey).map((key) => {
                if (data[key])
                    sets += `set n.${key} = $${key} `;
            });
            const state = `merge (n:${label}{${primaryKey}: $${primaryKey}}) ${sets} return n`;
            yield this.queryRunner(state, this.dataConver(JSON.parse(JSON.stringify(data))));
        });
        this.dataConver = (props) => {
            Object.keys(props).map((key) => {
                if (typeof props[key] === 'number') {
                    props[key] = /^[0-9]+([.]{1}[0-9]{1,2})?$/.test(props[key]) ? neo4j.v1.int(props[key]) : props[key];
                }
            });
            return props;
        };
        this.createRelation = (rel) => __awaiter(this, void 0, void 0, function* () {
            const params = {};
            let condition = '';
            Object.keys(rel.startNode.condition).map((key) => {
                condition += `and a.${key}=$${key + 'a'} `;
                params[`${key + 'a'}`] = rel.startNode.condition[key];
            });
            Object.keys(rel.endNode.condition).map((key) => {
                condition += `and b.${key}=$${key + 'b'} `;
                params[`${key + 'b'}`] = rel.endNode.condition[key];
            });
            condition = condition.substring(3);
            const state = `optional match (a:${rel.startNode.name}),(b:${rel.endNode.name}) where ${condition}
            merge (a)-[r:${rel.name}]->(b) return r`;
            yield this.queryRunner(state, params);
        });
    }
}
exports.Neo4jModel = Neo4jModel;
