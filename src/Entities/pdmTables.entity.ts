/* eslint-disable */

import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';


@Entity('pdmTables')
export class PdmTables {

    @PrimaryColumn()
    id: string;

    @Column()
    categoryId: string;

    @Column({ unique: true })
    tableName: string;

}