"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const index_1 = require("../../index");
let DemoMeta = class DemoMeta extends index_1.Model.BaseEntity {
    constructor(init) {
        super();
        Object.assign(this, init);
    }
};
__decorate([
    typeorm_1.Column('varchar', { nullable: false, name: 'name' }),
    __metadata("design:type", String)
], DemoMeta.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { nullable: false, unique: true, name: 'code' }),
    __metadata("design:type", String)
], DemoMeta.prototype, "code", void 0);
__decorate([
    typeorm_1.Column('int', { nullable: true, name: 'age' }),
    __metadata("design:type", Object)
], DemoMeta.prototype, "age", void 0);
__decorate([
    typeorm_1.Column('tinyint', { nullable: true, default: 0, name: 'is_deleted', comment: '是否已删除' }),
    __metadata("design:type", Number)
], DemoMeta.prototype, "isDeleted", void 0);
DemoMeta = __decorate([
    typeorm_1.Entity('data_source_meta', { schema: 'lgd' }),
    __metadata("design:paramtypes", [Object])
], DemoMeta);
exports.default = DemoMeta;
