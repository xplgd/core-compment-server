import { Connection } from 'typeorm';
import { Model } from '../..';

export default class DemoModel2 {
    private conn: Connection;

    constructor() {
        this.conn = Model.getConnect('qc');
    }

    // 查询所有测试任务数
    public countQCTask = async () => {
        return await this.conn.query(`select count(taskCode) from qc_task`);
    }

}
