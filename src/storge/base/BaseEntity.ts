import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({ name: 'create_on', comment: '记录生成时间' })
    createOn?: Date;

    @UpdateDateColumn({ name: 'modify_on', comment: '记录修改时间' })
    modifyOn?: Date;

    @Column('int', { nullable: false, default: 0, name: 'is_deleted' })
    isDeleted?: number;
}
