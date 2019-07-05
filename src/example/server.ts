import { App, IAppOption } from '../';
import config from './config';
import demo from './demo';

const myResponse = (code: number, data: any) => {
    if (code === 0) {
        return { result: true, msg: 'success', data };
    } else {
        return { result: false, msg: data.message, data };
    }
};

const start = async () => {
    (config.appOption as IAppOption).response = {response: myResponse};

    const app = new App(config);
    await app.loadModule(demo);
    app.start();
};

start();
