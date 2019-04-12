import DemoModel from './Model';
import DemoMeta from './Meta';
import { Exception } from '../..';
import * as DemoException from './Exception';
import DemoModel2 from './Model2';

export default class DemoService {
    private model: DemoModel;
    private model2: DemoModel2;

    constructor() {
        this.model = new DemoModel();
        this.model2 = new DemoModel2();
    }
    public create = async (info: DemoMeta) => {
        return this.model.create(info);
    }

    public update = async (id: number, info: DemoMeta) => {
        const meta = await this.model.queryById(id);
        if (!meta) {
            return await this.model.update(id, info);
        } else {
            throw new Exception(DemoException.NAME_IS_ALREADY_EXIST);
        }
    }

    public countQCTask = async () => {
        return await this.model2.countQCTask();
    }
}
