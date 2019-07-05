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
const __1 = require("../");
const config_1 = require("./config");
const demo_1 = require("./demo");
const myResponse = (code, data) => {
    if (code === 0) {
        return { result: true, msg: 'success', data };
    }
    else {
        return { result: false, msg: data.message, data };
    }
};
const start = () => __awaiter(this, void 0, void 0, function* () {
    config_1.default.appOption.response = { response: myResponse };
    const app = new __1.App(config_1.default);
    yield app.loadModule(demo_1.default);
    app.start();
});
start();
