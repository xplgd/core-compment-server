import * as neo4j from 'neo4j-driver';
import { IModelOption } from '../models/IModelOption';

export const createNeoDriver = async (option: IModelOption) => {
    const url = `bolt://${option.host}:${option.port}`;

    return await neo4j.v1.driver(url, neo4j.v1.auth.basic(option.username, option.password));
};

export abstract class Neo4jDriver {
    private driver: neo4j.v1.Driver;

    public constructor(driver: neo4j.v1.Driver) {
        this.driver = driver;
    }

    public destroy = () => {
        if (this.driver) this.driver.close();
    }

    public getConnect() {
        return null;
    }

    // Executes raw CQL query and returns raw database results.
    protected queryRunner = async (state: string, params?: any): Promise<any> => {
        const session: neo4j.v1.Session = this.driver.session();
        try {
            const result: neo4j.v1.StatementResult = await session.run(state, params);

            return result.records;
        } finally {
            if (session !== null) await session.close();
        }
    }

    public runCypher = async (state: string) => {
        return await this.queryRunner(state);
    }

}
