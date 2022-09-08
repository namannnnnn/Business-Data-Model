/* eslint-disable */

import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany, ManyToOne, OneToMany} from 'typeorm';
import { Attribute } from './attribute.entity'
import { Product } from './product.entity'

@Entity('productAssignment')
export class  ProductAssignment {

    @PrimaryColumn()
    productId: string;

    @PrimaryColumn()
    attributeId: string;
    
    @Column()
    grouping : boolean;

    @ManyToOne(() => Attribute, attribute => attribute.productAssignments)
    attribute: Attribute;

    @ManyToOne(() => Product, product => product.productAssignments)
    product: Product;
}