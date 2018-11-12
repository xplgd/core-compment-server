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
const neo4j = require("neo4j-driver");
exports.createNeoDriver = (option) => __awaiter(this, void 0, void 0, function* () {
    const url = `bolt://${option.host}:${option.port}`;
    return yield neo4j.v1.driver(url, neo4j.v1.auth.basic(option.username, option.password));
});
class Neo4jDriver {
    constructor(driver) {
        this.destroy = () => {
            if (this.driver)
                this.driver.close();
        };
        this.queryRunner = (state, params) => __awaiter(this, void 0, void 0, function* () {
            const session = this.driver.session();
            try {
                const result = yield session.run(state, params);
                return result.records;
            }
            finally {
                if (session !== null)
                    yield session.close();
            }
        });
        this.runCypher = (state) => __awaiter(this, void 0, void 0, function* () {
            return yield this.queryRunner(state);
        });
        this.driver = driver;
    }
    getConnect() {
        return null;
    }
}
exports.Neo4jDriver = Neo4jDriver;
