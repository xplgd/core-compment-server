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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = require("./Service");
const __1 = require("../../");
const Router = require("koa-router");
const Meta_1 = require("./Meta");
class DemoApi {
    constructor() {
        this.demoService = new Service_1.default();
    }
    create(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = __1.resolveEntityParams(ctx, Meta_1.default);
            const result = yield this.demoService.create(info);
            ctx.body = { result };
        });
    }
    count(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.demoService.countQCTask();
            ctx.body = { result };
        });
    }
}
__decorate([
    __1.ApiGetway('POST', {}),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemoApi.prototype, "create", null);
__decorate([
    __1.ApiGetway('GET', {}),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemoApi.prototype, "count", null);
exports.default = DemoApi;
