"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Log = require("log");
const fs = require("fs");
const rfs = require("rotating-file-stream");
const morgan = require("koa-morgan");
const getLogger = (name, home, logPath, interval = '1d') => {
    const logRoot = path.resolve(home, logPath);
    const logStream = rfs(name + '.log', {
        interval,
        path: logRoot
    });
    return new Log(name, logStream);
};
exports.getLogger = getLogger;
const initRequestLog = (option) => {
    const logRoot = path.resolve(option.home, option.logPath);
    if (!fs.existsSync(logRoot)) {
        fs.mkdirSync(logRoot);
    }
    const requestLogStream = rfs('request.log', {
        interval: '1d',
        path: logRoot
    });
    return morgan('combined', { stream: requestLogStream });
};
exports.initRequestLog = initRequestLog;
