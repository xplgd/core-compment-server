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
class BaseEntity {
}
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BaseEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'create_on', comment: '记录生成时间' }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "createOn", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'modify_on', comment: '记录修改时间' }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "modifyOn", void 0);
__decorate([
    typeorm_1.Column('int', { nullable: false, default: 0, name: 'is_deleted' }),
    __metadata("design:type", Number)
], BaseEntity.prototype, "isDeleted", void 0);
exports.default = BaseEntity;
