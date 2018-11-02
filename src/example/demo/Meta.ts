import { Entity, Column } from 'typeorm';
import { Model } from '../../index';

@Entity('data_source_meta', { schema: 'lgd' })
export default class DemoMeta extends Model.BaseEntity {

    @Column('varchar', { nullable: false, name: 'name' })
    name: string;

    @Column('varchar', { nullable: false, unique: true, name: 'code' })
    code: string;

    @Column('int', { nullable: true, name: 'age' })
    age: number | null;

    @Column('tinyint', { nullable: true, default: 0, name: 'is_deleted', comment: '是否已删除' })
    isDeleted?: number;

    constructor(init?: Partial<DemoMeta>) {
        super();
        Object.assign(this, init);
    }
}
