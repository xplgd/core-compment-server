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
class BaseModel {
    constructor(conn, target) {
        this.conn = conn;
        this.target = target;
    }
    create(info) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.conn.getRepository(this.target).save(info);
        });
    }
    update(id, info) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.conn.createQueryBuilder().update(this.target)
                .set(info).where('id=:id', { id }).execute();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.conn.createQueryBuilder().update(this.target)
                .set({ isDeleted: 1 }).where('id=:id', { id }).execute();
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.conn.createQueryBuilder().delete().from(this.target)
                .where('id=:id', { id }).execute();
        });
    }
    queryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.conn.getRepository(this.target).createQueryBuilder()
                .where('id=:id', { id }).getOne();
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.conn.getRepository(this.target).count();
        });
    }
}
exports.default = BaseModel;
