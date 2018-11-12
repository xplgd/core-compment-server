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
const index_1 = require("../../index");
const Meta_1 = require("./Meta");
class DemoModel extends index_1.Model.BaseModel {
    constructor() {
        super(index_1.Model.getConnect(), Meta_1.default);
        this.queryByName = (name) => __awaiter(this, void 0, void 0, function* () {
            return yield this.conn.getRepository(Meta_1.default).createQueryBuilder()
                .where('name=:name and is_deleted = 0', { name }).getOne();
        });
        this.getNames = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.conn.getRepository(Meta_1.default).createQueryBuilder()
                .where('is_deleted = 0').getMany();
        });
    }
}
exports.default = DemoModel;
