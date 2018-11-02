import { Neo4jDriver } from '../drivers/Neo4jDriver';
import * as neo4j from 'neo4j-driver';
import { IRelationship } from '../drivers/IRelationship';

export class Neo4jModel extends Neo4jDriver {
    // 设置节点的唯一字段的约束
    public setUnique = async (label: string, field: string) => {
        const state = `create constraint on (a:${label}) assert a.${field} is unique;`;
        await this.queryRunner(state);
    }

    // 添加节点
    public addNode = async (label: string, primaryKey: string, data: { [key: string]: any }) => {
        if (primaryKey && primaryKey !== '') {
            return await this.mergeNode(label, primaryKey, data);
        } else {
            return await this.createNode(label, primaryKey, data);
        }
    }

    // merge节点
    private mergeNode = async (label: string, primaryKey: string, data: { [key: string]: any }) => {
        let sets = '';
        Object.keys(data).filter((key: string) => key !== primaryKey).map((key: string) => {
            if (data[key]) sets += `set n.${key} = $${key} `;
        });
        const state = `merge (n:${label}{${primaryKey}: $${primaryKey}}) ${sets} return n`;
        await this.queryRunner(state, this.dataConver(JSON.parse(JSON.stringify(data))));
    }

    // create节点
    private createNode = async (label: string, primaryKey: string, data: { [key: string]: any }) => {
        let sets = '';
        Object.keys(data).filter((key: string) => key !== primaryKey).map((key: string) => {
            if (data[key]) sets += `set n.${key} = $${key} `;
        });
        const state = `merge (n:${label}{${primaryKey}: $${primaryKey}}) ${sets} return n`;
        await this.queryRunner(state, this.dataConver(JSON.parse(JSON.stringify(data))));
    }

    private dataConver = (props: any) => {
        Object.keys(props).map((key) => {
            if (typeof props[key] === 'number') {
                props[key] = /^[0-9]+([.]{1}[0-9]{1,2})?$/.test(props[key]) ? neo4j.v1.int(props[key]) : props[key];
            }
        });

        return props;
    }

    // 创建关系
    public createRelation = async (rel: IRelationship) => {
        const params: { [key: string]: any } = {};
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
        await this.queryRunner(state, params);
    }
}
