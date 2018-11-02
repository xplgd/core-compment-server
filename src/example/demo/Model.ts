import {Model} from '../../index';
import Meta from './Meta';

export default class DemoModel extends Model.BaseModel<Meta> {
    constructor() {
        super(Model.getConnect(), Meta);
    }

    // 更据名称查询数据连接
    public queryByName = async (name: string) => {
        return await this.conn.getRepository(Meta).createQueryBuilder()
            .where('name=:name and is_deleted = 0', { name }).getOne();
    }

    // 查询所有
    public getNames = async () => {
        return await this.conn.getRepository(Meta).createQueryBuilder()
            .where('is_deleted = 0').getMany();
    }

}
