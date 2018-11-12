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
const Model_1 = require("./Model");
const __1 = require("../..");
const DemoException = require("./Exception");
class DemoService {
    constructor() {
        this.create = (info) => __awaiter(this, void 0, void 0, function* () {
            return this.model.create(info);
        });
        this.update = (id, info) => __awaiter(this, void 0, void 0, function* () {
            const meta = yield this.model.queryById(id);
            if (!meta) {
                return yield this.model.update(id, info);
            }
            else {
                throw new __1.Exception(DemoException.NAME_IS_ALREADY_EXIST);
            }
        });
        this.model = new Model_1.default();
    }
}
exports.default = DemoService;
