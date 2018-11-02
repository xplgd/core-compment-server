import { Connection, ObjectType, EntitySchema, ObjectLiteral, DeepPartial } from 'typeorm';

export default abstract class BaseModel<Entity extends ObjectLiteral> {
    protected conn: Connection;
    protected target: ObjectType<Entity> | EntitySchema<Entity> | string;

    constructor(conn: Connection, target: ObjectType<Entity> | EntitySchema<Entity> | string) {
        this.conn = conn;
        this.target = target;
    }

    // 标准新增
    public async create<T extends DeepPartial<Entity>>(info: T) {
        return await this.conn.getRepository(this.target).save(info);
    }

    // 标准修改
    public async update<T extends DeepPartial<Entity>>(id: number, info: T) {
        return await this.conn.createQueryBuilder().update(this.target)
            .set(info).where('id=:id', { id }).execute();
    }

    // 标准删除(打删除标记)
    public async delete(id: number) {
        return await this.conn.createQueryBuilder().update(this.target)
            .set({ isDeleted: 1 }).where('id=:id', { id }).execute();
    }

    // 标准删除(彻底删除)
    public async remove(id: number) {
        return await this.conn.createQueryBuilder().delete().from(this.target)
            .where('id=:id', { id }).execute();
    }

    // 标准查询
    public async queryById(id: number) {
        return await this.conn.getRepository(this.target).createQueryBuilder()
            .where('id=:id', { id }).getOne();
    }

    // 标准统计
    public async count() {
        return await this.conn.getRepository(this.target).count();
    }
}
