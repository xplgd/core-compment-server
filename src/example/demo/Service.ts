import DemoModel from './Model';
import DemoMeta from './Meta';
import { Exception } from '../..';
import * as DemoException from './Exception';

export default class DemoService {
    private model: DemoModel;

    constructor() {
        this.model = new DemoModel();
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
}
