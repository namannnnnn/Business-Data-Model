/* eslint-disable */

import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Master, ReferenceMaster } from './master.entity';
import { AttributeGroup } from './attributeGroup.entity';
import { Rule } from './rules.entity'
import { Category } from './category.entity'
import { CategoryAssignment } from './categoryAssignment.entity'
import { ProductAssignment } from './productAssignment.entity'

@Entity('attributes')
export class Attribute {

    @PrimaryColumn()
    id: string;

    @Column()
    attributeName: string;

    @Column()
    labelDescription: string;

    @Column()
    displayName: string;

    @Column()
    attributeType: string;

    @Column()
    constraint: boolean;

    @Column({nullable: true})
    masterId: string;

    @Column({nullable: true})
    rulesId: string;

    @Column({nullable: true})
    attributeGroupId: string;

    @Column({nullable: true})
    referenceMasterId: string;

    @Column()
    status: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToMany(() => Rule, rule => rule.attribute)
    rules : Rule[];

    @OneToMany(() => CategoryAssignment, categoryAssignment => categoryAssignment.attribute)
    categoryAssignments : CategoryAssignment[];

    @OneToMany(() => ProductAssignment, productAssignment => productAssignment.attribute)
    productAssignments : ProductAssignment[];

    @ManyToOne(() => Master, master => master.attributes)
    master: Master;

    @ManyToOne(() => ReferenceMaster, referenceMaster => referenceMaster.attributes)
    referenceMaster: ReferenceMaster;

    @ManyToOne(() => AttributeGroup, attributeGroup => attributeGroup.attributes)
    attributeGroup: AttributeGroup;
}

@Entity('referenceAttributes')
export class ReferenceAttributes {
    @PrimaryColumn()
    id: string;

    @Column()
    attributeName: string;

    @Column()
    labelDescription: string;

    @Column()
    displayName: string;

    @Column()
    attributeType: string;

    @Column({nullable: true})
    referenceMasterId: string;

    @Column()
    status: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToMany(() => Rule, rule => rule.attribute)
    rules : Rule[];

    @ManyToOne(() => ReferenceMaster, referenceMaster => referenceMaster.referenceAttributes)
    referenceMaster: ReferenceMaster;

}