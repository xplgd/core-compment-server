import { App } from '../';
import config from './config';
import demo from './demo';

const start = async () => {
    const app = new App(config);
    app.useResponse((code: number, data: any) => {
        if (code === 0) {
            return { result: true, msg: 'success', data };
        } else {
            return { result: false, msg: data.message, data };
        }
    });
    await app.loadModule(demo);
    app.start();
};

start();
