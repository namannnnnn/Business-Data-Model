/* eslint-disable */

import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Category } from './category.entity';
import { AttributeGroup } from './attributeGroup.entity';
import { Product } from './product.entity'

@Entity('productGroupAssignment')
export class  ProductGroupAssignment {

    @PrimaryColumn()
    productId: string;

    @PrimaryColumn()
    attributeGroupId: string;

    @ManyToOne(() => AttributeGroup, attributeGroup => attributeGroup.productGroupAssignments)
    attributeGroup : AttributeGroup ;

    @ManyToOne(() => Product, product => product.productAssignments)
    product: Product;
}