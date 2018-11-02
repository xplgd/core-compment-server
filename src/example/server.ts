import { App } from '../';
import config from './config';
import demo from './demo';

const start = async () => {
    const app = new App(config);
    await app.loadModule(demo);
    app.start();
};

start();
