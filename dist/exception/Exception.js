"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("./Common");
const lodash_1 = require("lodash");
const immutable_1 = require("immutable");
class Exception extends Error {
    constructor(def = Common_1.COMMON_EXCEPTION, ...messageArgs) {
        let msg = def.message;
        if (messageArgs.length > 0) {
            const compiled = lodash_1.template(msg);
            let args = immutable_1.Map();
            for (let i = 0; i < messageArgs.length; i++) {
                args = args.set(`s${i + 1}`, messageArgs[i]);
            }
            msg = compiled(args.toObject());
        }
        super(msg);
        this.name = def.name;
        this.code = def.code;
    }
}
exports.default = Exception;
