import DemoApi from './Api';
import DemoMeta from './Meta';

const name = 'demo';

export default {
    name,
    httpApi: { rootPath: '/api/v1', api: DemoApi },
    entities: [DemoMeta],
    init: () => {
        // tslint:disable-next-line:no-console
        console.log(123);
    }
};
