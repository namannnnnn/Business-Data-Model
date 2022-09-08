/* eslint-disable */

import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, JoinColumn} from 'typeorm';
import { Attribute } from './attribute.entity'
import { CategoryAssignment } from './categoryAssignment.entity'
import { ProductCombo } from './productCombo.entity'
import { CategoryGroupAssignment } from './categoryGroupAssignment.entity';

@Entity('categories')
export class Category {

    @PrimaryColumn()
    id : string

    @Column({ nullable: true })
    isCombo: boolean

    @Column({ nullable: true })
    productComboId : string

    @OneToMany(() => CategoryAssignment, categoryAssignment => categoryAssignment.category)
    categoryAssignments : CategoryAssignment[];

    @OneToMany(() => CategoryGroupAssignment, categoryGroupAssignment => categoryGroupAssignment.category)
    categoryGroupAssignments : CategoryGroupAssignment[];

    @OneToOne(() => ProductCombo)
    @JoinColumn()
    productCombo: ProductCombo
}