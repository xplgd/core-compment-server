import * as path from 'path';
import * as Log from 'log';
import * as fs from 'fs';
import * as rfs from 'rotating-file-stream';
import * as morgan from 'koa-morgan';
import { IAppOption } from '..';

/**
 * 创建一个根据时间自动拆分的 Logger 文件流
 * @param name Log文件名
 * @param home 文件绝对路径
 * @param logPath Log文件存放的路径（文件夹）
 * @param interval 时间周期
 */
const getLogger = (name: string, home: string, logPath: string, interval = '1d') => {
    const logRoot = path.resolve(home, logPath);

    const logStream = rfs(name + '.log', {
        interval,
        path: logRoot
    });

    return new Log(name, logStream);
};

/**
 * 访问日志中间件
 * 如果不是生产模式，则在控制台输出访问日志
 */
const initRequestLog = (option: IAppOption): any => {
    const logRoot = path.resolve(option.home, option.logPath);

    if (!fs.existsSync(logRoot)) {
        fs.mkdirSync(logRoot);
    }

    const requestLogStream = rfs('request.log', {
        interval: '1d', // rotate daily
        path: logRoot
    });

    return morgan('combined', { stream: requestLogStream });
};

export {
    getLogger,
    initRequestLog
};
