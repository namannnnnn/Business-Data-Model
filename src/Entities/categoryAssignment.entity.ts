/* eslint-disable */

import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Category } from './category.entity';
import { Attribute } from './attribute.entity';

@Entity('categoryAssignment')
export class  CategoryAssignment {

    @PrimaryColumn()
    categoryId: string;

    @PrimaryColumn()
    attributeId: string;

    @Column()
    grouping : boolean;

    @ManyToOne(() => Attribute, attribute => attribute.categoryAssignments)
    attribute: Attribute;

    @ManyToOne(() => Category, category => category.categoryAssignments)
    category: Category;
}