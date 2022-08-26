/* eslint-disable */

import { Entity, Column, PrimaryColumn, ManyToOne,OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Attribute } from './attribute.entity'

@Entity('attributeGroups')
export class AttributeGroup {

    @PrimaryColumn()
    id: string

    @Column()
    attributeGroupName: string

    @Column()
    status: boolean

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToMany(() => Attribute, attribute => attribute.attributeGroup)
    attributes : Attribute[];

}
